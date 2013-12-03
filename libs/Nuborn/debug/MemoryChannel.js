/*
 * @provide nu.debug.MemoryChannel
 * @require nu.debug.LogLevel
 * @require nu.debug.LogItem
 * @require nu.debug.AbstractChannel
 */
define( "nu.debug.MemoryChannel", function ( require, exports, module ) {

    'use strict';

    var AbstractChannel = require( "nu.debug.AbstractChannel" );
    var LogLevel = require( "nu.debug.LogLevel" );
    var LogItem = require( "nu.debug.LogItem" );

    /**
     * @class nu.debug.MemoryChannel
     * @extends nu.debug.AbstractChannel
     *
     * Keep logs in memory.
     */
    var MemoryChannel = AbstractChannel.subClass( {

        /**
         * @constructor
         */
        init: function ( settings ) {
            this._super( settings );
            this.stack = [];
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

            if ( !LogLevel.hasOwnProperty( level ) )
                return [];

            return this.stack.filter( function ( logItem, index, stack ) {
                return logItem.level === level;
            } );
        },

        /**
         * @inheritdoc
         */
        print: function ( level ) {
            var print = "";

            if ( level && !LogLevel.hasOwnProperty( level ) )
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

            if ( !level || !LogLevel.hasOwnProperty( level ) ) {
                this.stack = [];
            }
            else {
                this.stack = this.stack.filter( function ( logItem, index, stack ) {
                    return logItem.level !== level;
                } );
            }
        }

    } );

    module.exports = MemoryChannel;

} );