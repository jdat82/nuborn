define "common.Context", ( require, exports, module ) ->

    'use strict'



    ###*
    Defaults settings
    ###
    defaults =
        localStorageKey: "context", # Prefix used when storing in local storage
        synchronizeInLocalStorage: false # If <saved> attribute is not provided when modifying a key, this is the default



    $ = jQuery
    localStorage = require "#localStorage"
    log = require "#log"
    Base = require "common.Base"
    Utils = require "utils.Utils"
    eventsBroker = require "#eventsBroker"
    Constants = require "common.Constants"

    ###*
    @class common.Context
    @extends core.Class
    Simple context class to store temporary data.
    ###
    class Context extends Base

        ###
        @event
        @static
        Invoked before clearing the whole context.
        ###
        @EVENT_CLEARING: "context/clearing"

        ###
        @event
        @static
        Invoked after the whole context has been cleared.
        ###
        @EVENT_CLEARED: "context/cleared"

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
        @param {String} key
        @param {Object} value
        @param {Boolean} save if true, the value will be backuped in local storage. If omitted, the setting synchronizeInLocalStorage will be used.
        ###
        set: ( key, value, save ) ->
            if key
                @data[ key ] = value
                log.i "Setted #{key} in context" if not TRACE and DEBUG
                log.i "Setted #{key} to #{typeof(value) is 'string' ? value : Utils.toJSON value} in context" if TRACE

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
        clear: (key) ->
            if key
                delete @data[key]
                log.i "Key '#{key}' cleared in context" if DEBUG
                localStorage.remove this.settings.localStorageKey + "." + key
            else
                eventsBroker.dispatch Context.EVENT_CLEARING
                @data = {}
                log.i "Context cleared" if DEBUG
                localStorage.removeFromPattern this.settings.localStorageKey
                eventsBroker.dispatch Context.EVENT_CLEARED


    module.exports = Context

