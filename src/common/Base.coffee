define "common.Base", ( require, exports, module ) ->

    'use strict'

    $ = jQuery

    ###*
    @class core.Class
    Base class which should be inherited by all other classes.
    ###
    class Base

        ###*
        @constructor
        Shorcut for calling init, defaults and settings.
        @param {Object} defaults Defaults settings
        @param {Object} settings Runtime settings
        ###
        constructor: ( defaults = {}, settings = {} ) ->

            # Initiliazing settings
            @settings = $.extend true, {}, defaults, settings

            # Used to store DOM references
            @html = {}

            # Used to store runtime data
            @data = {}

        ###
        Update current settings.
        ###
        tune: ( newSettings, extend = true) ->
            return if !newSettings
            if !extend then @settings = newSettings else $.extend true, @settings, newSettings

        ###
        Remove all references to objects in html and data attributes.
        ###
        destroy: ->
            @deleteHtmlElements()
            @deleteDataElements()
            @deleteSettingsElements()
            delete @html
            delete @data
            delete @settings

        ###*
        Delete all references to HTML objects.
        ###
        deleteHtmlElements: ->
            if @html
                for key of @html
                    delete @html[ key ]
                    return # Important: tells coffee to not return a result array

        ###*
        Delete all references to data objects.
        ###
        deleteDataElements: () ->
            if @data
                for key of @data
                    delete @data[ key ]
                    return # Important: tells coffee to not return a result array

        ###*
        Delete all references to settings objects.
        ###
        deleteSettingsElements: () ->
            if @settings
                for key of @settings
                    delete @settings[ key ]
                    return # Important: tells coffee to not return a result array


    module.exports = Base