define "widgets.InAppWebView", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Utils = require "utils.Utils"
    Base = require "common.Base"

    defaults =
        use: true

    ###*
    @class widgets.InAppWebView
    @extends core.Base
    Open external link in a new web view.
    Require cordova plugin org.apache.cordova.inappbrowser.
    ###
    class InAppWebView extends Base

        ###*
        @constructor.
        ###
        constructor: ( settings ) ->
            super defaults, settings

        ###
        Open an external link inside the inappbrowser.
        ###
        openExternalLink: ( link ) ->
            href = link.href
            target = link.target
            log.i "Opening #{href} in a new web view" if DEBUG
            if ANDROID
                window.open href, target, "location=yes,closebuttoncaption=Fermer"
            else
                window.open href, target, "location=no,transitionstyle=fliphorizontal,closebuttoncaption=Fermer"
            return false

        ###
        When an anchor is clicked, if it is external, it will be handled by the inappbrowser.
        ###
        listenForExternalLinks: ->
            $( document ).on "click", "a", ( event ) =>
                link = event.currentTarget
                return if not link.dataset.newwebview
                return @openExternalLink link


    module.exports = InAppWebView

