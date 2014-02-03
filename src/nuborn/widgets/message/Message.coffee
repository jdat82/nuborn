define "nu.widgets.Message", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Base = require "nu.core.Base"



    defaults =
        id: "message-widget"
        templateId: "message"
        message: null
        backgroundColor: null



    ###
    @class nu.widgets.Message
    A fullscreen widget which add an overlay above the current page with a Message message.
    ###
    class Message extends Base

        init: () ->
            super defaults

        show: ( settings ) ->

            # Testing if this widget is already in the DOM
            widget = document.getElementById @settings.id

            # In that case, nothing to do
            if widget
                # Searching for the widget in DOM, then removing
                $( "#" + @settings.id ).remove()

            # Else, showing it
            # Computing temporary settings
            settings = $.extend true, {}, @settings, settings
            # Create an HTML element
            widget = templates[ settings.templateId ].render( settings )
            # Adding to the DOM
            DEBUG && log.i "Showing the message widget with template: #{settings.templateId}"
            $( document.body ).append widget

            # Little effect for modern devices
            $.mobile.activePage and $.mobile.activePage.addClass "blur-grayscale"

        message: ( message ) ->
            @show
                message: message

        error: ( message ) ->
            @show
                templateId: "error-message"
                message: message

        offline: () ->
            @show
                templateId: "offline-message"

        loading: () ->
            @show
                templateId: "loading-message"

        hide: () ->

            log.i "Hiding the message widget if any"

            # Little effect for modern devices
            $.mobile.activePage and $.mobile.activePage.removeClass "blur-grayscale"

            # Searching for the widget in DOM, then removing
            $( "#" + @settings.id ).remove()



    # Singleton
    Message.instance = new Message()

    module.exports = Message

