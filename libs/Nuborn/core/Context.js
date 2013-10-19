( function ( $, nu, Log, LocalStorage, undefined ) {

    'use strict';

    var defaults = {
        localStorageKey: "nuborn.context",
        synchronizeInLocalStorage: false
    };

    /**
     * @class nu.core.Context
     *
     * Simple context class to store temporary data.
     *
     * @provide nu.core.Context
     *
     * @require nu
     */
    nu.core.Context = Object.subClass( {

        /**
         * @constructor
         */
        init: function ( settings ) {
            // computing runtime settings
            this.settings = $.extend( true, defaults, settings );

            // loading data from local storage if need be
            if ( this.settings.synchronizeInLocalStorage && Modernizr.localstorage ) {
                this.data = $.extend( true, {}, LocalStorage.get( this.settings.localStorageKey ) );
            }
            // deactivating local storage synchronization if unavailable
            else if ( this.settings.synchronizeInLocalStorage && !Modernizr.localstorage ) {
                Log.e( "[CONTEXT] No local storage available for synchronization." );
                this.settings.synchronizeInLocalStorage = false;
            }
            // default
            else {
                this.data = {};
            }
        },

        /**
         * Set a new value in context for the given key.
         * If synchronizeInLocalStorage was setted to true, the whole context will be synchronized with the local storage.
         */
        set: function ( key, value ) {
            if ( key )
                this.data[ key ] = value;

            if ( this.settings.synchronizeInLocalStorage )
                LocalStorage.set( this.settings.localStorageKey, this.data );
        },

        /**
         * Get the current value of the given key.
         */
        get: function ( key ) {
            if ( key )
                return this.data[ key ];
        },

        /**
         * Reset context. Reset also synchronized data in local storage if activated.
         */
        clear: function ( ) {
            this.data = {};
            if ( this.settings.synchronizeInLocalStorage )
                LocalStorage.remove( this.settings.localStorageKey );
        },
    } );

} )( jQuery, nu, nu.debug.Log, nu.cache.LocalStorage );