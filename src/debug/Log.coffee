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
        Defines the level of the logs : can be a combination of different levels separated by | (pipe).
        @type {String}
        ###
        level: LogLevel.TRACE
        ###*
        Defines if the logs should be sent to console.
        @type {Boolean}
        ###
        console: true
        ###
        For the console channel to add colors
        ###
        colors: true
        ###*
        Defines if the logs should be saved in the local storage.
        @type {Boolean}
        ###
        storage: false
        ###*
        Defines if the logs should be saved in memory.
        @type {Boolean}
        ###
        memory: false




    ###*
    @class debug.Log
    @singleton
    Entry point for logs.
    As a default, console is enabled but neither memory nor local storage logs.
    TODO: change static declaration. It should be possible to add channels dynamically :
    Log.addChannel(id, ChannelClass)
    id will serve as a key to enable the channel in settings and to store it in the list of channels
    TODO: change settings ; replace memory,storage,console by channels: ["memory", "storage", "console"]
    All others settings should be given to the channel
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
        t: ( value ) ->
            log this, value, LogLevel.TRACE

        ###*
        Logs at information level.
        @param  {String} value The information to log
        ###
        d: ( value ) ->
            log this, value, LogLevel.DEBUG

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

        test: ->
            @t "ceci est une trace"
            @d "ceci est un debug"
            @i "ceci est une info"
            @w "ceci est un warning"
            @e "ceci est une erreur"

        ###*
        Returns a channel
        @param {String} channelName Name of an existing channel. One of CHANNEL_MEMORY, CHANNEL_STORAGE, CHANNEL_CONSOLE.
        @param {Boolean} enabled a boolean to enable or disable the channel represented by channelName.
        @returns {debug.AbstractChannel} An abstract channel implementation if only channelName is provided. Nothing else.
        ###
        channel: ( channelName, enabled ) ->

            # Getter
            return @channels[ channelName ] if not enabled?

            # Setter

            # Console channel
            if channelName is @CHANNEL_CONSOLE
                if enabled
                    delete @channels[ @CHANNEL_CONSOLE ]
                    @channels[ @CHANNEL_CONSOLE ] = new ConsoleChannel @settings
                else
                    delete @channels[ @CHANNEL_CONSOLE ]

                @settings[ @CHANNEL_CONSOLE ] = enabled

            # Local Storage channel
            else if channelName is @CHANNEL_STORAGE
                if enabled
                    delete @channels[ @CHANNEL_STORAGE ]
                    @channels[ @CHANNEL_STORAGE ] = new LocalStorageChannel @settings
                else
                    delete @channels[ @CHANNEL_STORAGE ]

                @settings[ @CHANNEL_STORAGE ] = enabled

            # Memory channel
            else if channelName is @CHANNEL_MEMORY
                if enabled
                    delete @channels[ @CHANNEL_MEMORY ]
                    @channels[ @CHANNEL_MEMORY ] = new MemoryChannel @settings
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

            # Updating channels based on settings
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
        return if not isLoggable settings, level

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
        switch current
            when LogLevel.TRACE
                return level in [ LogLevel.TRACE, LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR ]
            when LogLevel.DEBUG
                return level in [ LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR ]
            when LogLevel.INFO
                return level in [ LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR ]
            when LogLevel.WARN
                return level in [ LogLevel.WARN, LogLevel.ERROR ]
            when LogLevel.ERROR
                return level is LogLevel.ERROR
            else
                return false



    module.exports = Log

