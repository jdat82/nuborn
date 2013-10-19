( function ( $, nu, app, log, undefined ) {

    'use strict';

    /**
     * @class app.pages.NubornPageHandler
     * @extends nu.pages.PageHandler
     *
     * Override nu.pages.PageHandler to add some custom behavior to the default page handler.
     *
     * @provide app.pages.NubornPageHandler
     *
     * @require nu.pages.PageHandler
     *
     * @require nu.debug.Log
     *
     * @require app.pages
     */
    app.pages.NubornPageHandler = nu.pages.PageHandler.subClass( {

        pageShow: function ( event, data ) {
            this._super( event, data );

            // Very important : you need to place the waypoints registration at the end of the event loop
            // to let JQM terminate the page life cycle properly.
            // For some reason, there is a conflict between JQM and jQuery Waypoint
            // window.setTimeout( $.proxy( this, "resizeOnScroll" ), 10 );
        },

        resizeOnScroll: function ( ) {
            var $page = this.html.page;
            var $header = $page.find( "[data-role=header]" );
            var $content = $page.find( "[data-role=content]" );
            var $waypoints = this.data.$waypoints = $page.find( ".waypoint" );
            $waypoints.each( function ( ) {
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

} )( jQuery, nu, app, nu.debug.Log );