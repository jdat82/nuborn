( function ( window, $, nu, LogLevel, undefined ) {

    'use strict';

    /**
     * @class nu.debug.ConsoleChannel
     * @extends nu.debug.AbstractChannel
     *
     * Use the native console to log items.
     *
     * @provide nu.debug.ConsoleChannel
     *
     * @require nu.debug.LogLevel
     *
     * @require nu.debug.LogItem
     *
     * @require nu.debug.AbstractChannel
     */
    nu.debug.ConsoleChannel = nu.debug.AbstractChannel.subClass( {

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
                console.log( logItem.toString( ) );
                break;
            case LogLevel.WARN:
                console.warn( logItem.toString( ) );
                break;
            case LogLevel.ERROR:
                console.error( logItem.toString( ) );
                break;
            }
        }

    } );

} )( this, jQuery, nu, nu.debug.LogLevel );