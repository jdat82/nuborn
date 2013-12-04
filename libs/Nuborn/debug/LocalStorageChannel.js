/*
 * @provide nu.debug.LocalStorageChannel
 * @require nu.debug.LogLevel
 * @require nu.debug.LogItem
 * @require nu.cache.LocalStorage
 * @require nu.debug.AbstractChannel
 */
define( "nu.debug.LocalStorageChannel", function ( require, exports, module ) {

    'use strict';

    var AbstractChannel = require( "nu.debug.AbstractChannel" );
    var LocalStorage = require( "nu.cache.LocalStorage" );
    var LogLevel = require( "nu.debug.LogLevel" );

    /**
     * @class nu.debug.LocalStorageChannel
     * @extends nu.debug.AbstractChannel
     *
     * Keep logs in local storage.
     */
    var LocalStorageChannel = AbstractChannel.subClass( {

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
            var logs = LocalStorage.get( this.settings.storageKey );
            if ( !logs )
                logs = [];
            logs.push( logItem.toString( "%d    %l    %m" ) );
            LocalStorage.set( this.settings.storageKey, logs );
        },

        /**
         * @inheritdoc
         */
        list: function ( level ) {
            var stack = LocalStorage.get( this.settings.storageKey );

            // no level, retun all
            if ( !level )
                return stack || [];

            // invalid level, noop.
            if ( !LogLevel.hasOwnProperty( level ) )
                return [];

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
            if ( level && !LogLevel.hasOwnProperty( level ) )
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
                LocalStorage.remove( this.settings.storageKey );
                return;
            }

            // invalid level, noop.
            if ( !LogLevel.hasOwnProperty( level ) )
                return;

            // specific level, keeping other levels
            var stack = this.list().filter( function ( string, index, stack ) {
                return !string.contains( level );
            } );

            // saving
            LocalStorage.set( this.settings.storageKey, stack );
        }

    } );

    module.exports = LocalStorageChannel;

} );