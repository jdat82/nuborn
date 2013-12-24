define( "nu.core.Class", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;

    /**
     * @class nu.core.Class
     * Base class for every other class.
     */
    module.exports = Object.subClass( {

        /**
         * @constructor
         * Shorcut for calling init, defaults and settings.
         * @param {Object} defaults Defaults settings
         * @param {Object} settings Runtime settings
         */
        init: function ( defaults, settings ) {

            // Initiliazing settings
            defaults = defaults || {};
            settings = settings || {};
            this.settings = $.extend( true, defaults, settings );

            // Used to store DOM references
            this.html = {};

            // Used to store runtime data
            this.data = {};
        }

    } );

} );