define "app.pages.NubornPageHandler", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    PageHandler = require "nu.pages.PageHandler"

    ###*
    @class app.pages.NubornPageHandler
    @extends nu.pages.PageHandler
    Override nu.pages.PageHandler to add some custom behavior to the default page handler.
    ###
    class NubornPageHandler extends PageHandler

        pageShow: ( event, data ) ->
            super event, data

            # Very important : you need to place the waypoints registration at the end of the event loop
            # to let JQM terminate the page life cycle properly.
            # For some reason, there is a conflict between JQM and jQuery Waypoint
            # window.setTimeout( $.proxy( this, "resizeOnScroll" ), 10 )

        menuButton: ( event ) ->
            super event
            menu = require "#menu"
            menu.toggleMenu()

        resizeOnScroll: () ->
            $page = @html.page
            $header = $page.find "[data-role=header]"
            $content = $page.find "[data-role=content]"
            $waypoints = @data.$waypoints = $page.find ".waypoint"

            $waypoints.each () ->
                $el = $( this )
                $el.waypoint "destroy"

                onWaypoint = ( direction ) ->
                    log.i "scrolling #{direction}" if DEBUG
                    if direction is "down"
                        $header.addClass "mini"
                        $content.addClass "mini"
                    else
                        $header.removeClass "mini"
                        $content.removeClass "mini"

                $el.waypoint onWaypoint,
                    offset: -1
                    context: $content


    module.exports = NubornPageHandler

