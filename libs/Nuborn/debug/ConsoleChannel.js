( function ( window, $, nu, LogLevel, undefined ) {

    'use strict';

    /**
     * Common behaviors for all loggers.
     * @class nu.debug.ConsoleChannel
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

        init: function ( settings ) {
            this._super( settings );
        },

        /**
         * Log the value parameter with the level specified.
         * @param  {nu.debug.LogItem} item to log
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