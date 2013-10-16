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

        /**
         * @constructor
         */
        init: function ( settings ) {
            this._super( settings );
            this.stack = [ ];
        },

        /**
         * @inheritdoc
         */
        log: function ( logItem ) {
            this._super( logItem );
            this.stack.push( logItem );
        },

        /**
         * @inheritdoc
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
         * @inheritdoc
         */
        print: function ( level ) {
            var print = "";

            if ( level && !nu.debug.LogLevel.hasOwnProperty( level ) )
                return print;

            this.list( level ).forEach( function ( logItem, index, stack ) {
                print += logItem.toString( "%d    %l    %m" ) + "\n";
            } );

            return print;
        },


        /**
         * @inheritdoc
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