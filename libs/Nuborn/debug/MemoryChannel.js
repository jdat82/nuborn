( function ( window, $, nu, undefined ) {

    'use strict';

    /**
     * @class nu.debug.MemoryChannel
     * @extends nu.debug.AbstractChannel
     *
     * Keep logs in memory.
     *
     * @provide nu.debug.MemoryChannel
     *
     * @require nu.debug.LogLevel
     *
     * @require nu.debug.LogItem
     *
     * @require nu.debug.AbstractChannel
     */
    nu.debug.MemoryChannel = nu.debug.AbstractChannel.subClass( {

        init: function ( settings ) {
            this._super( settings );
        },

        /**
         * Log the value parameter with the level specified.
         * @param  {nu.debug.LogItem} item to log
         */
        log: function ( logItem ) {
            this._super( logItem );

            // // get the logs from the memory stack
            // var log = nu.debug.Log.stack;
            // // if log is null, initialize it
            // if ( !log ) {
            //     log = {};
            //     for ( var level in LogLevel )
            //         log[ level ] = [ ]
            //     nu.debug.Log.stack = log;
            // }
            // // unshifting the log into the stack memory with the date
            // log[ level ].unshift( logItem );
            // log[ LogLevel.ALL ].unshift( logItem );
        },

        /**
         * List log of type from the stack memory.
         * @param  {String} type The type of log to list
         */
        list: function ( type ) {
            // // if teh stack is null, no log has been stacked
            // if ( !nu.debug.Log.stack ) {
            //     console.log( "There is no logs in the stack memory" );
            //     return;
            // }
            // type = type || LogLevel.ALL;
            // var log = nu.debug.Log.stack;
            // var array = log[ type ];

            // if ( array.length === 0 ) {
            //     console.log( "There is no logs with type" + type );
            //     return;
            // }

            // type !== LogLevel.ALL && console.log( "List of logs with type " + type + " :" );
            // for ( var i = 0, len = array.length; i < len; i++ ) {
            //     console.log( " >> " + array[ i ] );
            // }
            // type !== LogLevel.ALL && console.log( "End of logs with type " + type );
        },

        /**
         * Clear logs of type from stack memory.
         * @param  {String} type The type of log to clear
         */
        clear: function ( type ) {
            // // getting the log object
            // var log = nu.debug.Log.stack;
            // // check if the type is specified and correct
            // if ( type === LogLevel.INFO || type === LogLevel.ERROR || type === LogLevel.WARN ) {
            //     log[ type ] = [ ];
            // }
            // // if no type is specified or is incorrect, clear all
            // else if ( type === LogLevel.ALL ) {
            //     for ( var level in LogLevel )
            //         log[ level ] = [ ];
            // }
        }

    } );

} )( this, jQuery, nu );