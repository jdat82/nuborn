define "pages.AppPageHandler", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    PageHandler = require "pages.PageHandler"
    menu = require "widgets#menu"
    message = require "widgets#message"

    ###*
    @class pages.AppPageHandler
    @extends pages.PageHandler
    Factorize common behavior between all page handlers.
    ###
    class AppPageHandler extends PageHandler

        ###*
        @override
        @inheritdoc
        ###
        createHtmlElements: () ->
            super()
            @html.menuButton = @html.header?.querySelector "#menu-button"
            @html.backButton = @html.header?.querySelector "#back-button"

        ###*
        @override
        @inheritdoc
        ###
        pageCreate: ( event ) ->
            super event
            @handleMenuButton()
            @handleBackButton()

        ###
        @override
        @inheritdoc
        ###
        menuButton: ( event ) ->
            super event
            menu.toggleMenu()

        ###*
        Handle click on page menu button.
        ###
        handleMenuButton: () ->
            # When tap on menu button, open menu panel
            @html.menuButton?.addEventListener "click", (event) =>
                @menuButton()
                # Prevent bubbling
                return false
            , false

        ###
        @override
        @inheritdoc
        ###
        backButton: ( event ) ->
            super event
            if @settings.exitOnBack
                log.i "Exiting app" if INFO
                navigator.app?.exitApp()
            else
                history.back();

        ###*
        Handle click on page back button.
        ###
        handleBackButton: () ->
            # When tap on back button, go back in history
            @html.backButton?.addEventListener "click", (event) =>
                @backButton()
                # Prevent bubbling
                return false
            , false

        ###
        @override
        @inheritdoc
        Going back on a swipe right.
        ###
        swipeRight: ( event ) ->
            super event
            @backButton()

        ###
        @override
        @inheritdoc
        ###
        pageShow: (event, data) ->
            super event, data
            message.hide()

    module.exports = AppPageHandler

