define "nu.debug.MemoryChannel", ( require, exports, module ) ->

    'use strict'

    AbstractChannel = require "nu.debug.AbstractChannel"
    LogLevel = require "nu.debug.LogLevel"
    LogItem = require "nu.debug.LogItem"

    ###*
    @class nu.debug.MemoryChannel
    @extends nu.debug.AbstractChannel
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

