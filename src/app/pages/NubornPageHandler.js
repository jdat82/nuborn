define( "app.pages.NubornPageHandler", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;
    var log = require( "#log" );
    var PageHandler = require( "nu.pages.PageHandler" );

    /**
     * @class app.pages.NubornPageHandler
     * @extends nu.pages.PageHandler
     *
     * Override nu.pages.PageHandler to add some custom behavior to the default page handler.
     */
    var NubornPageHandler = module.exports = PageHandler.subClass( {

        pageShow: function ( event, data ) {
            this._super( event, data );

            // Very important : you need to place the waypoints registration at the end of the event loop
            // to let JQM terminate the page life cycle properly.
            // For some reason, there is a conflict between JQM and jQuery Waypoint
            // window.setTimeout( $.proxy( this, "resizeOnScroll" ), 10 );
        },

        menuButton: function ( event ) {
            this._super( event );
            var menu = require( "#menu" );
            menu.toggleMenu();
        },

        resizeOnScroll: function () {
            var $page = this.html.page;
            var $header = $page.find( "[data-role=header]" );
            var $content = $page.find( "[data-role=content]" );
            var $waypoints = this.data.$waypoints = $page.find( ".waypoint" );
            $waypoints.each( function () {
                var $el = $( this );
                $el.waypoint( "destroy" );
                $el.waypoint( function ( direction ) {
                    DEBUG && log.i( "scrolling " + direction );
                    ( direction === "down" ? $header.addClass( "mini" ) : $header.removeClass( "mini" ) );
                    ( direction === "down" ? $content.addClass( "mini" ) : $content.removeClass( "mini" ) );
                }, {
                    offset: -1,
                    context: $content
                } );
            } );
        }
    } );

} );