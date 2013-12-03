/*
 * @provide nu.debug.Log
 * @require nu.debug.LogLevel
 * @require nu.debug.LogItem
 * @require nu.debug.ConsoleChannel
 * @require nu.debug.LocalStorageChannel
 * @require nu.debug.MemoryChannel
 */
define( "nu.debug.Log", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;
    var LogLevel = require( "nu.debug.LogLevel" );
    var LogItem = require( "nu.debug.LogItem" );
    var LocalStorageChannel = require( "nu.debug.LocalStorageChannel" );
    var MemoryChannel = require( "nu.debug.MemoryChannel" );
    var ConsoleChannel = require( "nu.debug.ConsoleChannel" );

    /*
     * Default settings
     */
    var defaults = {
        /**
         * Defines if the logs should be sent to console.
         * @type {Boolean}
         */
        console: true,
        /**
         * Defines if the logs should be saved in the local storage.
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
     * As a default, console is enabled but neither memory nor local storage logs.     *
     */
    var Log = {

        /**
         * Constant to be used when defining defaults or requesting a channel.
         */
        CHANNEL_MEMORY: "memory",
        /**
         * Constant to be used when defining defaults or requesting a channel.
         */
        CHANNEL_STORAGE: "storage",
        /**
         * Constant to be used when defining defaults or requesting a channel.
         */
        CHANNEL_CONSOLE: "console",

        /**
         * @constructor
         */
        init: function ( settings ) {

            // computing final settings
            this.settings = $.extend( true, defaults, settings );

            if ( this.settings.level === LogLevel.NOLOG ) {
                console.log( "Logs deactivated" );
            }

            if ( !Modernizr.localstorage ) {
                this.settings[ this.CHANNEL_STORAGE ] = false;
            }

            // creating channels based on settings
            this.channels = {};
            this.channel( this.CHANNEL_CONSOLE, this.settings[ this.CHANNEL_CONSOLE ] );
            this.channel( this.CHANNEL_MEMORY, this.settings[ this.CHANNEL_MEMORY ] );
            this.channel( this.CHANNEL_STORAGE, this.settings[ this.CHANNEL_STORAGE ] );
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
         * @param {String} channelName Name of an existing channel. One of CHANNEL_MEMORY, CHANNEL_STORAGE, CHANNEL_CONSOLE.
         * @param {Boolean} enabled a boolean to enable or disable the channel represented by channelName.
         * @returns {nu.debug.AbstractChannel} An abstract channel implementation if only channelName is provided. Nothing else.
         */
        channel: function ( channelName, enabled ) {

            if ( enabled === undefined )
                return this.channels[ channelName ];

            // console channel
            if ( channelName === this.CHANNEL_CONSOLE ) {
                if ( enabled )
                    this.channels[ this.CHANNEL_CONSOLE ] = new ConsoleChannel();
                else
                    delete this.channels[ this.CHANNEL_CONSOLE ];

                this.settings[ this.CHANNEL_CONSOLE ] = enabled;
            }

            // local storage channel
            else if ( channelName === this.CHANNEL_STORAGE ) {
                if ( enabled )
                    this.channels[ this.CHANNEL_STORAGE ] = new LocalStorageChannel( {
                        storageKey: this.settings.storageKey
                    } );
                else
                    delete this.channels[ this.CHANNEL_STORAGE ];

                this.settings[ this.CHANNEL_STORAGE ] = enabled;
            }

            // memory channel
            else if ( channelName === this.CHANNEL_MEMORY ) {
                if ( enabled )
                    this.channels[ this.CHANNEL_MEMORY ] = new MemoryChannel();
                else
                    delete this.channels[ this.CHANNEL_MEMORY ];

                this.settings[ this.CHANNEL_MEMORY ] = enabled;
            }
        }

    };

    /*
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
        var val = value.toString();

        // declaring date of the current log action
        var date = new Date();

        var settings = Log.settings;
        var channels = Log.channels;

        // check if level is activated
        if ( !isLoggable( settings, level ) ) {
            return;
        }

        var logItem = new LogItem( level, val, date );

        // if logging in console
        if ( settings.console ) {
            channels[ Log.CHANNEL_CONSOLE ].log( logItem );
        }

        // if logging in memory
        if ( settings.memory ) {
            channels[ Log.CHANNEL_MEMORY ].log( logItem );
        }

        // if logging in storage
        if ( settings.storage ) {
            channels[ Log.CHANNEL_STORAGE ].log( logItem );
        }
    }

    /*
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

    /*
     * Initializing with defaults settings in case the developer starts to log without initializing anything.
     * We don't want to force him to initialize if not needed.
     */
    Log.init();

    module.exports = Log;

} );