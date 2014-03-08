define "widgets.Message", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Base = require "common.Base"


    defaults =
        id: "message-widget" # HTML id in DOM
        templateId: "message" # Template name
        message: null # Text to insert
        backgroundColor: null # Overriding background color in template
        renderingDelay: 0 # Minimum delay from which it is interesting to show the widget. 0 deactivate the delay
        autoHideDelay: 0 # Auto hide the widget after some time. 0 deactivate this delay.


    ###
    @class widgets.Message
    A fullscreen widget which add an overlay above the current page with a Message message.
    ###
    class Message extends Base

        init: () ->
            super defaults
            @html.body = $(document.body)

        show: ( settings ) ->

            # If there is some timeouts running, we don't need them anymore
            clearTimeout @renderingTimeout
            clearTimeout @autoHideTimeout

            # In that case, nothing to do
            if @html.widget
                # Removing from the DOM
                @html.widget.remove()
                delete @html.widget

            # Else, showing it
            # Computing temporary settings
            settings = $.extend true, {}, @settings, settings
            # Create an HTML element
            @html.widget = $(templates[ settings.templateId ].render settings)

            # Function that will impact UI
            render = () =>

                # Adding to the DOM
                log.i "Showing the message widget with template: #{settings.templateId}" if DEBUG

                # Adding to the DOM
                @html.body.append @html.widget

                # if the template root element contains a "data-closable=true" attribute...
                if @html.widget.data "closable"
                    @html.widget.click ( event ) =>
                        @hide()
                        return false

                # Little effect for modern devices
                $.mobile.activePage?.addClass "blur-grayscale"

            # We may wait N ms before showing really the widget to avoid a blink effect.
            if settings.renderingDelay then @renderingTimeout = setTimeout render, settings.renderingDelay else render()

            # We may hide automatically the widget after some time
            if settings.autoHideDelay then @autoHideTimeout = setTimeout @hide.bind( @ ), settings.autoHideDelay

        ###*
        Show a message.
        Accepts either a string message or a settings object.
        ###
        message: ->
            @show settings arguments

        ###*
        Show an error message.
        Accepts either a string message or a settings object.
        ###
        error: ->
            @show settings arguments,
                templateId: "error-message"

        ###*
        Show an offline message.
        Accepts a settings object but the message is not customizable.
        ###
        offline: ->
            @show settings arguments,
                templateId: "offline-message"

        ###*
        Show a loading message.
        Accepts a settings object but the message is not customizable.
        ###
        loading: ->
            @show settings arguments,
                templateId: "loading-message"

        ###*
        Hide the widget.
        ###
        hide: ->

            # If there is some timeouts running, we don't need them anymore
            clearTimeout @renderingTimeout
            clearTimeout @autoHideTimeout

            log.i "Hiding the message widget if any"

            # Little effect for modern devices
            $.mobile.activePage?.removeClass "blur-grayscale"

            # Searching for the widget in DOM, then removing
            @html.widget?.remove()



    settings = ( runtimeArgs, minArgs ) ->

        arg = runtimeArgs?[ 0 ] or null

        # If user provides only a string message
        if typeof ( arg ) is "string"
            return $.extend true, {}, minArgs, {
                message: arg
            }

        # If user provides a settings object
        else
            return $.extend true, {}, minArgs, arg


    module.exports = Message


###
Shared instance.
###
define "#message", ( require, exports, module ) ->

    'use strict'

    Message = require "widgets.Message"
    module.exports = new Message
