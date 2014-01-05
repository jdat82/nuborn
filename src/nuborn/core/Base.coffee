define "nu.core.Base", ( require, exports, module ) ->

    'use strict';

    $ = jQuery;

    ###*
    @class nu.core.Class
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
            @html = {};

            # Used to store runtime data
            @data = {};

        tune: ( newSettings, extend = true) ->
            return if !newSettings
            if !extend then @settings = newSettings else $.extend true, @settings, newSettings



    module.exports = Base