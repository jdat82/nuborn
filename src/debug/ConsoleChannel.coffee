define "debug.ConsoleChannel", ( require, exports, module ) ->

    'use strict'

    AbstractChannel = require "debug.AbstractChannel"
    LogLevel = require "debug.LogLevel"

    defaults =
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
    @class debug.ConsoleChannel
    @extends debug.AbstractChannel
    Use the native console to log items.
    ###
    class ConsoleChannel extends AbstractChannel

        ###*
        @constructor
        ###
        constructor: ( settings ) ->
            super defaults, settings
            console.log ?= () ->
            console.trace ?= console.log
            console.debug ?= console.log
            console.info ?= console.log
            console.warn ?= console.log
            console.error ?= console.log

        ###*
        TODO: when console.log "string with format", args will be supported on mobile,
        we will be able to remove completely the if LEVEL in code because there will be no more string concatenation in code.
        Just log.i "string", args
        @inheritdoc
        ###
        log: ( logItem ) ->
            super logItem
            string = logItem.toString()
            if @settings.colors
                switch logItem.level
                    when LogLevel.TRACE then pattern = "color: #996666"
                    when LogLevel.DEBUG then pattern = "color: #0074D9"
                    when LogLevel.INFO then pattern = "color: #29c14e"
                    when LogLevel.WARN then pattern = "color: #ff8000"
            switch logItem.level
                when LogLevel.TRACE, LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN
                    if pattern then console.log "%c" + string, pattern else console.log string
                when LogLevel.ERROR
                    console.error string


    module.exports = ConsoleChannel

