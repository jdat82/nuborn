define "pages.AppPageHandler", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    PageHandler = require "pages.PageHandler"
    menu = require "#menu"

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
            @html.menuButton = @html.header.find "#menu-button"
            @html.backButton = @html.header.find "#back-button"

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
            @html.menuButton?.click (event) =>
                @menuButton()
                # Prevent bubbling
                return false

        ###
        @override
        @inheritdoc
        ###
        backButton: ( event ) ->
            super event
            history.back();

        ###*
        Handle click on page back button.
        ###
        handleBackButton: () ->
            # When tap on back button, go back in history
            @html.backButton?.click (event) =>
                @backButton()
                # Prevent bubbling
                return false

        ###
        @override
        @inheritdoc
        Going back on a swipe right.
        ###
        swipeRight: ( event ) ->
            super event
            @backButton()


    module.exports = AppPageHandler

