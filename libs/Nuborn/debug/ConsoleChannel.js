define( "nu.debug.ConsoleChannel", function ( require, exports, module ) {

    'use strict';

    var AbstractChannel = require( "nu.debug.AbstractChannel" );
    var LogLevel = require( "nu.debug.LogLevel" );

    /**
     * @class nu.debug.ConsoleChannel
     * @extends nu.debug.AbstractChannel
     *
     * Use the native console to log items.
     */
    var ConsoleChannel = AbstractChannel.subClass( {

        /**
         * @constructor
         */
        init: function ( settings ) {
            this._super( settings );
        },

        /**
         * @inheritdoc
         */
        log: function ( logItem ) {
            this._super( logItem );

            switch ( logItem.level ) {
            case LogLevel.INFO:
                console.log( logItem.toString() );
                break;
            case LogLevel.WARN:
                console.warn( logItem.toString() );
                break;
            case LogLevel.ERROR:
                console.error( logItem.toString() );
                break;
            }
        }

    } );

    module.exports = ConsoleChannel;

} );