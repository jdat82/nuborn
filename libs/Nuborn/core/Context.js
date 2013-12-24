define( "nu.core.Context", function ( require, exports, module ) {

    'use strict';

    /**
     * Defaults settings
     */
    var defaults = {
        localStorageKey: "nuborn.context",
        synchronizeInLocalStorage: false
    };

    // Private property
    var data = {};

    var $ = jQuery;
    var LocalStorage = require( "nu.cache.LocalStorage" );
    var Log = require( "nu.debug.Log" );
    var Class = require( "nu.core.Class" );

    /**
     * @class nu.core.Context
     * @extends nu.core.Class
     *
     * Simple context class to store temporary data.
     */
    var Context = Class.subClass( {

        /**
         * @constructor
         */
        init: function ( settings ) {

            // computing runtime settings
            this._super( defaults, settings );

            // loading data from local storage if need be
            if ( this.settings.synchronizeInLocalStorage && Modernizr.localstorage ) {
                data = $.extend( true, {}, LocalStorage.get( this.settings.localStorageKey ) );
            }
            // deactivating local storage synchronization if unavailable
            else if ( this.settings.synchronizeInLocalStorage && !Modernizr.localstorage ) {
                Log.e( "[CONTEXT] No local storage available for synchronization." );
                this.settings.synchronizeInLocalStorage = false;
            }
        },

        /**
         * Set a new value in context for the given key.
         * If synchronizeInLocalStorage was setted to true, the whole context will be synchronized with the local storage.
         */
        set: function ( key, value ) {
            if ( key )
                data[ key ] = value;

            if ( this.settings.synchronizeInLocalStorage )
                LocalStorage.set( this.settings.localStorageKey, data );
        },

        /**
         * Get the current value of the given key.
         */
        get: function ( key ) {
            if ( key )
                return data[ key ];
        },

        list: function () {
            return data;
        },

        /**
         * Reset context. Reset also synchronized data in local storage if activated.
         */
        clear: function () {
            data = {};
            if ( this.settings.synchronizeInLocalStorage )
                LocalStorage.remove( this.settings.localStorageKey );
        }

    } );

    module.exports = Context;

} );