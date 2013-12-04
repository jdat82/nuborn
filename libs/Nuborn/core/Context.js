/*
 * @provide nu.core.Context
 * @require nu.debug.Log
 * @require nu.cache.LocalStorage
 */
define( "nu.core.Context", function ( require, exports, module ) {

    'use strict';

    // defaults settings
    var defaults = {
        localStorageKey: "nuborn.context",
        synchronizeInLocalStorage: false
    };

    // private property
    var data;

    var $ = jQuery;
    var LocalStorage = require( "nu.cache.LocalStorage" );
    var Log = require( "nu.debug.Log" );

    /**
     * @class nu.core.Context
     *
     * Simple context class to store temporary data.
     */
    var Context = Object.subClass( {

        /**
         * @constructor
         */
        init: function ( settings ) {
            // computing runtime settings
            this.settings = $.extend( true, defaults, settings );

            // loading data from local storage if need be
            if ( this.settings.synchronizeInLocalStorage && Modernizr.localstorage ) {
                data = $.extend( true, {}, LocalStorage.get( this.settings.localStorageKey ) );
            }
            // deactivating local storage synchronization if unavailable
            else if ( this.settings.synchronizeInLocalStorage && !Modernizr.localstorage ) {
                Log.e( "[CONTEXT] No local storage available for synchronization." );
                this.settings.synchronizeInLocalStorage = false;
            }
            // default
            else {
                data = {};
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
        },
    } );

    module.exports = Context;

} );