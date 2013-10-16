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
            this.stack = [ ];
        },

        /**
         * Log the value parameter with the level specified.
         * @param  {nu.debug.LogItem} item to log
         */
        log: function ( logItem ) {
            this._super( logItem );
            this.stack.push( logItem );
        },

        /**
         * List logs eventually for a given level from the stack memory.
         * @param  {String} a {@link nu.debug.LogLevel nu.debug.LogLevel} element.
         * @returns {Array} Array of {@link nu.debug.LogItem nu.debug.LogItem} elements.
         */
        list: function ( level ) {

            if ( !level )
                return this.stack;

            if ( !nu.debug.LogLevel.hasOwnProperty( level ) )
                return [ ];

            return this.stack.filter( function ( logItem, index, stack ) {
                return logItem.level === level;
            } );
        },

        /**
         * Print logs eventually for a given level from the stack memory.
         * @param  {String} a {@link nu.debug.LogLevel nu.debug.LogLevel} element.
         * @returns {String} Log.
         */
        print: function ( level ) {
            var print = "";

            if ( level && !nu.debug.LogLevel.hasOwnProperty( level ) )
                return print;

            this.stack.forEach( function ( logItem, index, stack ) {
                if ( logItem.level === level || !level )
                    print += logItem.toString( "%d    %l    %m" ) + "\n";
            } );

            return print;
        },


        /**
         * Clear logs eventually for a given level from the stack memory.
         * @param  {String} a {@link nu.debug.LogLevel nu.debug.LogLevel} element.
         */
        clear: function ( level ) {

            if ( !level || !nu.debug.LogLevel.hasOwnProperty( level ) ) {
                this.stack = [ ];
            }
            else {
                this.stack = this.stack.filter( function ( logItem, index, stack ) {
                    return logItem.level !== level;
                } );
            }
        }

    } );

} )( this, jQuery, nu );