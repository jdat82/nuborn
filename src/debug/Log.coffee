define "debug.Log", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    LogLevel = require "debug.LogLevel"
    LogItem = require "debug.LogItem"
    LocalStorageChannel = require "debug.LocalStorageChannel"
    MemoryChannel = require "debug.MemoryChannel"
    ConsoleChannel = require "debug.ConsoleChannel"
    Base = require "common.Base"
    Utils = require "utils.Utils"



    ###
    Default settings
    ###
    defaults =
        ###*
        Defines if the logs should be sent to console.
        @type {Boolean}
        ###
        console: true,
        ###*
        Defines if the logs should be saved in the local storage.
        @type {Boolean}
        ###
        storage: false,
        ###*
        Storage key.
        ###
        storageKey: "logs",
        ###*
        Defines if the logs should be saved in memory.
        @type {Boolean}
        ###
        memory: false,
        ###*
        Defines the level of the logs : can be a combination of different levels separated by | (pipe).
        @type {String}
        ###
        level: LogLevel.INFO



    ###*
    @class debug.Log
    @singleton
    Entry point for logs.
    As a default, console is enabled but neither memory nor local storage logs.
    ###
    class Log extends Base

        ###*
        Constant to be used when defining defaults or requesting a channel.
        ###
        CHANNEL_MEMORY: "memory",
        ###*
        Constant to be used when defining defaults or requesting a channel.
        ###
        CHANNEL_STORAGE: "storage",
        ###*
        Constant to be used when defining defaults or requesting a channel.
        ###
        CHANNEL_CONSOLE: "console",

        ###*
        @constructor
        ###
        constructor: ( settings ) ->
            super defaults, settings
            @channels = {}
            @tune settings

        ###*
        Logs at information level.
        @param  {String} value The information to log
        ###
        i: ( value ) ->
            log this, value, LogLevel.INFO

        ###*
        Logs at warn level.
        @param  {String} value The warning to log
        ###
        w: ( value ) ->
            log this, value, LogLevel.WARN

        ###*
        Logs at error level.
        @param  {String} value The error to log
        ###
        e: ( value, error ) ->
            if error
                if typeof(error) is "string"
                    value += error
                else
                    value += Utils.toJSON error
            log this, value, LogLevel.ERROR

        ###*
        Returns a channel
        @param {String} channelName Name of an existing channel. One of CHANNEL_MEMORY, CHANNEL_STORAGE, CHANNEL_CONSOLE.
        @param {Boolean} enabled a boolean to enable or disable the channel represented by channelName.
        @returns {debug.AbstractChannel} An abstract channel implementation if only channelName is provided. Nothing else.
        ###
        channel: ( channelName, enabled ) ->

            return @channels[ channelName ] if not enabled?

            # Console channel
            if channelName is @CHANNEL_CONSOLE
                if enabled
                    @channels[ @CHANNEL_CONSOLE ] = new ConsoleChannel()
                else
                    delete @channels[ @CHANNEL_CONSOLE ]

                @settings[ @CHANNEL_CONSOLE ] = enabled

            # Local Storage channel
            else if channelName is @CHANNEL_STORAGE
                if enabled
                    @channels[ @CHANNEL_STORAGE ] = new LocalStorageChannel
                        storageKey: @settings.storageKey
                else
                    delete @channels[ @CHANNEL_STORAGE ]

                @settings[ @CHANNEL_STORAGE ] = enabled

            # Memory channel
            else if channelName is @CHANNEL_MEMORY
                if enabled
                    @channels[ @CHANNEL_MEMORY ] = new MemoryChannel()
                else
                    delete @channels[ @CHANNEL_MEMORY ]

                @settings[ @CHANNEL_MEMORY ] = enabled

        ###*
        Update log configuration dynamically
        ###
        tune: ( settings ) ->
            super settings

            if @settings.level is LogLevel.NOLOG
                console.log "Logs deactivated"

            if not Modernizr.localstorage
                @settings[ @CHANNEL_STORAGE ] = false

            # Creating channels based on settings
            @channel @CHANNEL_CONSOLE, @settings[ @CHANNEL_CONSOLE ]
            @channel @CHANNEL_MEMORY, @settings[ @CHANNEL_MEMORY ]
            @channel @CHANNEL_STORAGE, @settings[ @CHANNEL_STORAGE ]


    ###
    Log the value parameter with the level specified.
    @param  {debug.Log} log Entry point containing settings and loggers instances
    @param  {String} value The value to log
    @param  {String} level The level of the log
    ###
    log = ( log, value, level ) ->

        return if !log || !value || !level

        # Getting the value as a string
        val = value.toString()

        # Declaring date of the current log action
        date = new Date()

        settings = log.settings
        channels = log.channels

        # Check if level is activated
        return if !isLoggable settings, level

        logItem = new LogItem( level, val, date )

        # If logging in console
        if settings.console
            channels[ log.CHANNEL_CONSOLE ].log logItem

        # If logging in memory
        if settings.memory
            channels[ log.CHANNEL_MEMORY ].log logItem

        # If logging in storage
        if settings.storage
            channels[ log.CHANNEL_STORAGE ].log logItem



    ###
    Whether or not we shoud log based on the current log level.
    @param {debug.LogLevel} level
    ###
    isLoggable = ( settings, level ) ->

        current = settings.level
        switch level
            when LogLevel.INFO
                return current is LogLevel.INFO
            when LogLevel.WARN
                return current in [ LogLevel.INFO, LogLevel.WARN ]
            when LogLevel.ERROR
                return current in [ LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR ]
            else
                return false



    module.exports = Log

