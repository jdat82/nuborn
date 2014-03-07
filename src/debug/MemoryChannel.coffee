define "debug.MemoryChannel", ( require, exports, module ) ->

    'use strict'

    AbstractChannel = require "debug.AbstractChannel"
    LogLevel = require "debug.LogLevel"
    LogItem = require "debug.LogItem"

    ###*
    @class debug.MemoryChannel
    @extends debug.AbstractChannel
    Keep logs in memory.
    ###
    class MemoryChannel extends AbstractChannel

        ###*
        @constructor
        ###
        constructor: ( settings ) ->
            super settings
            @stack = []

        ###*
        @inheritdoc
        ###
        log: ( logItem ) ->
            super logItem
            @stack.push logItem

        ###*
        @inheritdoc
        ###
        list: ( level ) ->
            return @stack if not level or not LogLevel.hasOwnProperty level
            return @stack.filter ( logItem, index, stack ) ->
                logItem.level is level

        ###*
        @inheritdoc
        ###
        print: ( level ) ->
            print = ""
            for logItem in @list( level )
                print += logItem.toString( "%d    %l    %m" ) + "\n"
            return print


        ###*
        @inheritdoc
        ###
        clear: ( level ) ->
            return @stack = [] if !LogLevel.hasOwnProperty level
            @stack = @stack.filter ( logItem, index, stack ) ->
                logItem.level isnt level


    module.exports = MemoryChannel

