/*
 * @provide app.pages.DefaultPageHandler
 */
define( "app.pages.DefaultPageHandler", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;
    var Utils = require( "nu.Utils" );
    var Log = require( "nu.debug.Log" );
    var PageHandler = require( "nu.pages.PageHandler" );

    /**
     * @class app.pages.DefaultPageHandler
     * @extends nu.pages.PageHandler
     *
     * The default Page Handler when no other page handler was found.
     */
    var DefaultPageHandler = PageHandler.subClass( {

        init: function () {
            this._super( {
                id: "default",
                "default": true
            } );
        },

        /**
         * Override default behavior.
         */
        load: function ( pageParams ) {

            debug && log.i( "Using default page handler" );

            var hash = utils.deserializeHash();

            // If the default page handler is invoke, it means nuborn hasn't found any page handler for the current hash name.
            var ph; // = <find the right page handler>;

            // transferring first page properties to the right page handler
            ph.data.isFirst = this.data.isFirst;
            ph.load( pageParams );
        },

        /**
         * Override default behavior.
         */
        navigate: function ( options ) {
            // app dependant
        }

    } );

    module.exports = new DefaultPageHandler();

} );