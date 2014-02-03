define "nu.core.Context", ( require, exports, module ) ->

    'use strict'



    ###*
    Defaults settings
    ###
    defaults =
        localStorageKey: "nuborn.context",
        synchronizeInLocalStorage: false



    $ = jQuery
    localStorage = require( "nu.cache.LocalStorage" ).instance
    log = require "#log"
    Base = require "nu.core.Base"
    Utils = require "nu.Utils"


    ###*
    @class nu.core.Context
    @extends nu.core.Class
    Simple context class to store temporary data.
    ###
    class Context extends Base

        ###*
        @constructor
        ###
        constructor: ( settings ) ->

            # Computing runtime settings
            super defaults, settings

            # Loading data from local storage if need be
            if @settings.synchronizeInLocalStorage && Modernizr.localstorage
                $.extend true, @data, localStorage.get( @settings.localStorageKey )

            # Deactivating local storage synchronization if unavailable
            else if @settings.synchronizeInLocalStorage && !Modernizr.localstorage
                log.e "[CONTEXT] No local storage available for synchronization."
                @settings.synchronizeInLocalStorage = false

        ###*
        Set a new value in context for the given key.
        If synchronizeInLocalStorage was setted to true, the whole context will be synchronized with the local storage.
        ###
        set: ( key, value ) ->
            if key
                @data[ key ] = value
                DEBUG && log.i "Setted #{key} to #{typeof(value) is 'string' ? value : Utils.toJSON value} in context"

            if @settings.synchronizeInLocalStorage
                localStorage.set( @settings.localStorageKey, @data )
                DEBUG && log.i "Context backuped in local storage"

        ###*
        Get the current value of the given key.
        ###
        get: ( key ) ->
            return @data[ key ] if key

        list: () ->
            return @data

        ###*
        Reset context. Reset also synchronized data in local storage if activated.
        ###
        clear: () ->
            @data = {}
            DEBUG && log.i "Context cleared"
            if @settings.synchronizeInLocalStora
                localStorage.remove( @settings.localStorageKey )
                DEBUG && log.i "Context's backup in local storage cleared"


    module.exports = Context
