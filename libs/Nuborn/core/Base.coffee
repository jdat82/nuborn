define "nu.core.Base", ( require, exports, module ) ->

    'use strict';

    $ = jQuery;

    ###*
    @class nu.core.Class
    Base class for every other class.
    ###
    class Base

        ###*
        @constructor
        Shorcut for calling init, defaults and settings.
        @param {Object} defaults Defaults settings
        @param {Object} settings Runtime settings
        ###
        constructor: ( @defaults = {}, @settings = {} ) ->

            # Initiliazing settings
            @settings = $.extend true, defaults, settings

            # Used to store DOM references
            @html = {};

            # Used to store runtime data
            @data = {};

    module.exports = Base