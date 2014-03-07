define "common.Context", ( require, exports, module ) ->

    'use strict'



    ###*
    Defaults settings
    ###
    defaults =
        localStorageKey: "context", # Prefix used when storing in local storage
        synchronizeInLocalStorage: false # If <saved> attribute is not provided when modifying a key, this is the default



    $ = jQuery
    localStorage = require( "cache.LocalStorage" ).instance
    log = require "#log"
    Base = require "common.Base"
    Utils = require "utils.Utils"
    EventsBroker = require "events.EventsBroker"
    Constants = require "common.Constants"

    ###*
    @class common.Context
    @extends core.Class
    Simple context class to store temporary data.
    ###
    class Context extends Base

        ###*
        @constructor
        ###
        constructor: ( settings ) ->

            # Computing runtime settings
            super defaults, settings

            # Loading data from local storage
            if Modernizr.localstorage
                items = localStorage.getFromPattern @settings.localStorageKey
                for key, value of items
                    newKey = key.replace @settings.localStorageKey + ".", ""
                    delete items[ key ]
                    items[ newKey ] = value
                $.extend true, @data, items

            # Deactivating local storage synchronization if unavailable
            else
                log.w "No local storage available for context synchronization."
                @settings.synchronizeInLocalStorage = false

        ###*
        Set a new value in context for the given key.
        If synchronizeInLocalStorage was setted to true, the whole context will be synchronized with the local storage.
        ###
        set: ( key, value ) ->
            if key
                @data[ key ] = value
                log.i "Setted #{key} in context" if not TRACE and DEBUG
                log.i "Setted #{key} to #{typeof(value) is 'string' ? value : Utils.toJSON value} in context" if TRACE

            save = null
            save ?= this.settings.synchronizeInLocalStorage;

            if save then localStorage.set @settings.localStorageKey + "." + key, value

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
            if key
                delete @data[key]
                log.i "Key '#{key}' cleared in context" if DEBUG
                localStorage.remove this.settings.localStorageKey + "." + key
            else
                EventsBroker.dispatch Constants.Events.Context.CLEAR
                @data = {}
                log.i "Context cleared" if DEBUG
                localStorage.removeFromPattern this.settings.localStorageKey


    module.exports = Context

