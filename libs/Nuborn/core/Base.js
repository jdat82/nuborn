define( "nu.core.Base", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;

    /**
     * @private
     * Defaults settings.
     */
    var defaults = {

    };

    /*
     * @private
     * Current settings.
     */
    var settings = {

    };

    /**
     * @class nu.core.Base
     * Base class for every other class.
     */
    module.exports = Object.subClass( {

        /**
         * @constructor
         * Shorcut for calling init, defaults and settings.
         * @param {Object} defaults Initialize object with a group of default properties.
         * @param {Object} settings Initialize object with a group of properties.
         */
        init: function ( defaults, settings ) {
            // Initiliazing defaults
            this.defaults( defaults );
            // Initiliazing settings
            this.settings( settings );
            // Used to store DOM references
            this.html = {};
            // Used to store runtime data
            this.data = {};
        },

        /**
         * Set or get component's defaults settings.
         */
        defaults: function ( data ) {
            if ( !data ) return defaults;
            defaults = data;
        },

        /**
         * Set or get component's settings.
         */
        settings: function ( data ) {
            if ( !data ) return settings;
            settings = $.extend( true, defaults, data );
        }
    } );

} );