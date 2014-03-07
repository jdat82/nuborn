define "debug.ConsoleChannel", ( require, exports, module ) ->

    'use strict'

    AbstractChannel = require "debug.AbstractChannel"
    LogLevel = require "debug.LogLevel"

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
            super {}, settings

        ###*
        @inheritdoc
        ###
        log: ( logItem ) ->
            super logItem
            switch logItem.level
                when LogLevel.INFO then console.log logItem.toString()
                when LogLevel.WARN then console.warn logItem.toString()
                when LogLevel.ERROR then console.error logItem.toString()


    module.exports = ConsoleChannel

