( function ( window, $, nu, LogLevel, LogItem, undefined ) {

    'use strict';

    /**
     * Default settings
     */
    var defaults = {
        /**
         * Defines if the logs should be sent to console.
         * @type {Boolean}
         */
        console: true,
        /**
         * Defines if the logs should be saved to storage.
         * @type {Boolean}
         */
        storage: false,
        /**
         * Storage key.
         */
        storageKey: "logs",
        /**
         * Defines if the logs should be saved in memory.
         * @type {Boolean}
         */
        memory: false,
        /**
         * Defines the level of the logs : can be a combination of different levels separated by | (pipe).
         * @type {String}
         */
        level: LogLevel.INFO

    };

    /**
     * @class nu.debug.Log
     * @singleton
     *
     * Entry point for logs.
     * As a default, console is enabled but neither memory nor local storage logs.
     *
     * @provide nu.debug.Log
     *
     * @require nu.debug
     *
     * @require nu.debug.LogLevel
     *
     * @require nu.debug.LogItem
     *
     * @require nu.debug.ConsoleChannel
     *
     * @require nu.debug.StorageChannel
     *
     * @require nu.debug.MemoryChannel
     */
    nu.debug.Log = {

        /**
         * @constructor
         */
        init: function ( settings ) {

            // computing final settings
            this.settings = $.extend( true, defaults, settings );

            if ( this.settings.level === LogLevel.NOLOG ) {
                console.log( "Logs deactivated" );
            }

            // creating channels based on settings
            this.channels = {};
            if ( this.settings.console ) this.channels.console = new nu.debug.ConsoleChannel( );
            if ( this.settings.storage ) this.channels.storage = new nu.debug.StorageChannel( this.settings.storageKey );
            if ( this.settings.memory ) this.channels.memory = new nu.debug.MemoryChannel( );
        },

        /**
         * Logs at information level.
         * @param  {String} value The information to log
         */
        i: function ( value ) {
            log( this, value, LogLevel.INFO );
        },

        /**
         * Logs at warn level.
         * @param  {String} value The warning to log
         */
        w: function ( value ) {
            log( this, value, LogLevel.WARN );
        },

        /**
         * Logs at error level.
         * @param  {String} value The error to log
         */
        e: function ( value ) {
            log( this, value, LogLevel.ERROR );
        },

        /**
         * Returns a channel
         * @param {String} channelName Name of an existing channel
         * @returns {nu.debug.AbstractChannel} An abstract channel implementation
         */
        getChannel: function ( channelName ) {

        }

    };

    /**
     * Log the value parameter with the level specified.
     * @param  {nu.debug.Log} log Entry point containing settings and loggers instances
     * @param  {String} value The value to log
     * @param  {String} level The level of the log
     */

    function log( Log, value, level ) {

        if ( !Log || !value || !level ) {
            return;
        }

        // getting the value as a string
        var val = value.toString( );

        // declaring date of the current log action
        var date = new Date( );

        var settings = Log.settings;
        var channels = Log.channels;

        // check if level is activated
        if ( !isLoggable( settings, level ) ) {
            return;
        }

        var logItem = new LogItem( level, val, date );

        // if logging in console
        if ( settings.console ) {
            channels.console.log( logItem );
        }

        // if logging in memory
        if ( settings.memory ) {
            channels.memory.log( logItem );
        }

        // if logging in storage
        if ( settings.storage ) {
            channels.storage.log( logItem );
        }
    }

    /**
     * Whether or not we shoud log based on the current log level.
     * @param {nu.debug.LogLevel} level
     */

    function isLoggable( settings, level ) {

        var current = settings.level;
        switch ( level ) {
        case LogLevel.INFO:
            return current === LogLevel.INFO;
        case LogLevel.WARN:
            return current === LogLevel.INFO || current === LogLevel.WARN;
        case LogLevel.ERROR:
            return current === LogLevel.INFO || current === LogLevel.WARN || current === LogLevel.ERROR;
        default:
            return false;
        }
    }

    /**
     * Initializing with defaults settings in case the developer starts to log without initializing anything.
     * We don't want to force him to initialize if not needed.
     */
    nu.debug.Log.init( );

    /**
     * Deactivated for now cause doesn't work as expected.
     */
    // window.onerror = function (message, url, line) {
    //  nu.debug.Log.error(message);
    // }

} )( this, jQuery, nu, nu.debug.LogLevel, nu.debug.LogItem );