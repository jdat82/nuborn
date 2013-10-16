( function ( window, $, nu, Storage, undefined ) {

    'use strict';

    /**
     * @class nu.debug.StorageChannel
     * @extends nu.debug.AbstractChannel
     *
     * Keep logs in local storage.
     *
     * @provide nu.debug.StorageChannel
     *
     * @require nu.debug.LogLevel
     *
     * @require nu.debug.LogItem
     *
     * @require nu.cache.Storage
     *
     * @require nu.debug.AbstractChannel
     */
    nu.debug.StorageChannel = nu.debug.AbstractChannel.subClass( {

        /**
         * @constructor
         */
        init: function ( settings ) {
            this._super( settings );
        },

        /**
         * @inheritdoc
         * WARNING : completely ineficient. Serialize and deserialize an array with all the log items every time.
         * Use with caution or implement something more friendly if this is a problem.
         */
        log: function ( logItem ) {
            this._super( logItem );
            var logs = Storage.get( this.settings.storageKey );
            if ( !logs )
                logs = [ ];
            logs.push( logItem.toString( "%d    %l    %m" ) );
            Storage.set( this.settings.storageKey, logs );
        },

        /**
         * @inheritdoc
         */
        list: function ( level ) {
            var stack = Storage.get( this.settings.storageKey );

            // no level, retun all
            if ( !level )
                return stack || [ ];

            // invalid level, noop.
            if ( !nu.debug.LogLevel.hasOwnProperty( level ) )
                return [ ];

            // specific level
            return stack.filter( function ( string, index, stack ) {
                return string.contains( level );
            } );
        },

        /**
         * @inheritdoc
         * No level filtering. Level paramter will be ignored.
         */
        print: function ( level ) {
            var print = "";

            // invalid level, noop.
            if ( level && !nu.debug.LogLevel.hasOwnProperty( level ) )
                return print;

            // filtering then concatenating a big string
            this.list( level ).forEach( function ( string, index, stack ) {
                print += string + "\n";
            } );

            return print;
        },


        /**
         * @inheritdoc
         */
        clear: function ( level ) {

            // no specific level, clear all
            if ( !level ) {
                Storage.clear( this.settings.storageKey );
                return;
            }

            // invalid level, noop.
            if ( !nu.debug.LogLevel.hasOwnProperty( level ) )
                return;

            // specific level, keeping other levels
            var stack = this.list( ).filter( function ( string, index, stack ) {
                return !string.contains( level );
            } );

            // saving
            Storage.set( this.settings.storageKey, stack );
        }

    } );

} )( this, jQuery, nu, nu.cache.Storage );