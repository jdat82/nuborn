( function ( window, $, nu, undefined ) {

    'use strict';

    /**
     * Common behaviors for all loggers.
     * @class nu.debug.StorageChannel
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

        init: function ( storageKey ) {
            this._super( );
            this.settings = {
                storageKey: storageKey
            };
        },

        /**
         * Log the value parameter with the level specified.
         * @param  {nu.debug.LogItem} item to log
         */
        log: function ( logItem ) {
            this._super( logItem );

            // getting the log object
            var log = nu.debug.Log.getStoraged( );
            // unshifting the correct value into the correct array member with the date
            log[ level ].unshift( logItem );
            log[ LogLevel.ALL ].unshift( logItem );
            // saving log object into the storage
            nu.debug.Log.setStoraged( log );
        }


    } );

    // /**
    //  * Gets the saved logs object or a new one.
    //  * @return {Object} The saved object containing infos, errors and warnings logs, or a new one
    //  */
    // nu.debug.Log.getStoraged = function ( ) {
    //     // getting logs from object storage
    //     var log = nu.cache.Storage.get( nu.debug.Log.STORAGE_KEY );
    //     // if log is null, create a new one and save it
    //     if ( !log ) {
    //         // creating the new log object
    //         log = {};
    //         for ( var level in LogLevel )
    //             log[ level ] = [ ]
    //             // saving the object to the object storage
    //         nu.debug.Log.setStoraged( log );
    //     }
    //     // return the log object
    //     return log;
    // };

    // /**
    //  * Saves the log parameter into storage.
    //  * @param {Object} log The log object to save
    //  */
    // nu.debug.Log.setStoraged = function ( log ) {
    //     nu.cache.Storage.set( nu.debug.Log.STORAGE_KEY, log );
    // };

    // /**
    //  * List log of type from the storage.
    //  * @param  {String} type The type of log to list
    //  */
    // nu.debug.Log.listStoraged = function ( type ) {
    //     var log = nu.debug.Log.getStoraged( );
    //     var array = log[ type ];

    //     if ( !array ) {
    //         console.log( "The type " + type + "is incorrect" );
    //         return;
    //     }

    //     if ( array.length === 0 ) {
    //         console.log( "There is no logs with type" + type );
    //         return;
    //     }

    //     type !== LogLevel.ALL && console.log( "List of logs with type " + type + " :" );
    //     for ( var i = 0, len = array.length; i < len; i++ ) {
    //         console.log( "    * " + array[ i ] );
    //     }
    //     type !== LogLevel.ALL && console.log( "End of logs with type " + type );
    // };

    // /**
    //  * Clear logs of type from storaged.
    //  * @param  {String} type The type of log to clear
    //  */
    // nu.debug.Log.clearStoraged = function ( type ) {
    //     // getting the log object
    //     var log = nu.debug.Log.getStoraged( );
    //     // check if the type is specified and correct
    //     if ( type === LogLevel.INFO || type === LogLevel.ERROR || type === LogLevel.WARN ) {
    //         log[ type ] = [ ];
    //     }
    //     // if no type is specified or is incorrect, clear all
    //     else if ( type === LogLevel.ALL ) {
    //         for ( var level in LogLevel )
    //             log[ level ] = [ ]
    //     }
    //     nu.debug.Log.setStoraged( log );
    // };

} )( this, jQuery, nu );