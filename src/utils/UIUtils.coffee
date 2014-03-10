define "utils.UIUtils", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    BrowserUtils = require "utils.BrowserUtils"

    ###*
    @class utils.UIUtils
    @singleton
    UI related utilities method.
    ###
    class UIUtils

        ###
        Parse a string containing HTML code and return an array of HTML elements.
        76% faster than using jQuery parseHTML: http://jsperf.com/j2an-parsehtml
        Replace jQuery#parseHTML(<html>) or jQuery(<html>)
        ###
        @parse: (string) ->
            # string = string.trim()
            div = document.createElement 'div'
            div.innerHTML = string
            return div.childNodes

        ###
        Append one or several children to a parent element from an HTML string
        Replace jQuery#append
        ###
        @append: (parent, string) ->
            return if not string or not parent
            children = @parse string
            for child in children
                parent.appendChild child if child? and child?.nodeType isnt 3
            return children

        ###
        Remove element from the DOM
        Replace jQuery#remove
        ###
        @remove: (element) ->
            element?.parentNode?.removeChild element

        ###
        Add an event listener to <element> for the event type <type> with <capture> mode once.
        Replace jQuery#one
        ###
        @one: (element, type, capture = false, callback) ->
            return if not element or not type or not callback
            fn = ->
                callback()
                element.removeEventListener type, fn, capture
            element.addEventListener type, fn, capture

        @blockEvent = ( event ) ->
            return false

        @disableScroll = ( element ) ->
            el = element || document
            $( el ).on "touchmove", @blockEvent

        @enableScroll = ( element ) ->
            el = element || document
            $( el ).off "touchmove", @blockEvent

        ###*
        [Warning] Doesn't work if page handler is in prototype mode.
        Refresh a JQM page. If no page id provided, use the current active page.
        @param {String} pageId page ID.
        Don't provide the character "#" in pageId.
        ###
        @refreshPage = ( pageId ) ->
            pageId = pageId || $.mobile.activePage.attr "id"
            DEBUG && log.i "Refreshing page: #{pageId}"
            $.mobile.changePage "##{pageId}",
                allowSamePageTransition: true
                transition: 'none'
                showLoadMsg: false
                changeHash: false

        ###
        If in a phonegap iOS app, show the native splashscreen.
        Else, show the web splashscreen.
        ###
        @showSplashScreen = () ->

            # If the splashscreen is handled natively
            if BrowserUtils.isCordova() and navigator.splashscreen
                navigator.splashscreen.show()
            else
                splashscreen = require "#splashscreen"
                splashscreen?.show()

        ###*
        If in a phonegap iOS app, hide native splashscreen.
        Else, hide web splashscreen.
        ###
        @hideSplashScreen = () ->
            # If the splashscreen is handled natively with iOS
            if BrowserUtils.isCordova() && navigator.splashscreen
                navigator.splashscreen.hide()
            else
                splashscreen = require "#splashscreen"
                splashscreen?.hide()

        ###*
        Enable button's press mode.
        {@link #onvmousedown See onvmousedown}
        ###
        @enableUniversalPressMode = ( element ) ->
            return if not element
            # Getting a jQuery reference
            element = $( element )
            # Enabling press mode
            element.on "vmousedown", onvmousedown

        ###*
        Disable button's press mode.
        {@link #onvmousedown See onvmousedown}
        ###
        @disableUniversalPressMode = ( element ) ->
            return if not element
            # Getting a jQuery reference
            element = $( element )
            # Disabling press mode
            element.off "vmousedown", onvmousedown


    ###*
    Handle active state on button the portable way.
    i.e compatible with Android 2.3 and browsers without :active pseudo class support.
    ###
    onvmousedown = () ->
        element = $( this )
        # Making the element active
        element.addClass "pressed"
        # When touch end, go to normal state
        element.one "vmouseup vmousemove", ->
            # Making the element normal
            element.removeClass "pressed"


    module.exports = UIUtils