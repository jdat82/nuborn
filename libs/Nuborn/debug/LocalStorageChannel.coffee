define "nu.debug.LocalStorageChannel", ( require, exports, module ) ->

    'use strict'

    AbstractChannel = require "nu.debug.AbstractChannel"
    localStorage = require( "nu.cache.LocalStorage" ).instance
    LogLevel = require "nu.debug.LogLevel"


    ###*
    @class nu.debug.LocalStorageChannel
    @extends nu.debug.AbstractChannel
    Keep logs in local storage.
    ###
    class LocalStorageChannel extends AbstractChannel

        ###*
        @constructor
        ###
        constructor: ( settings ) ->
            super settings

        ###*
        @inheritdoc
        WARNING : completely ineficient. Serialize and deserialize an array with all the log items every time.
        Use with caution or implement something more friendly if this is a problem.
        ###
        log: ( logItem ) ->
            super logItem
            logs = localStorage.get @settings.storageKey
            logs = [] if not logs
            logs.push logItem.toString( "%d    %l    %m" )
            localStorage.set @settings.storageKey, logs

        ###*
        @inheritdoc
        ###
        list: ( level ) ->
            stack = localStorage.get @settings.storageKey
            # No level, retun all
            return stack || [] if !level or !LogLevel.hasOwnProperty level
            # Specific level
            return stack.filter ( string, index, stack ) ->
                string.contains level

        ###*
        @inheritdoc
        No level filtering. Level paramter will be ignored.
        ###
        print: ( level ) ->
            print = ""
            # Filtering then concatenating a big string
            for string in @list( level )
                print += string + "\n"
            return print


        ###*
        @inheritdoc
        ###
        clear: ( level ) ->
            # No specific level, clear all
            return localStorage.remove( @settings.storageKey ) if !level
            # Invalid level, noop.
            return if !LogLevel.hasOwnProperty level
            # Specific level, keeping other levels
            stack = @list().filter ( string, index, stack ) ->
                !string.contains level
            # Saving
            localStorage.set @settings.storageKey, stack


    module.exports = LocalStorageChannel

