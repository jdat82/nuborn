define "app.widgets.Menu", ( require, exports, module ) ->

    'use strict'


    $ = jQuery
    Log = require "nu.debug.Log"
    BaseMenu = require "nu.widgets.Menu"



    ###*
    @class app.widgets.Menu
    @extends nu.widgets.Menu
    Nuborn general menu.
    ###
    class Menu extends BaseMenu

        ###*
        @constructor
        @param  {Object} settings
        ###
        constructor: ( settings ) ->
            super settings

            # clicking the overlay close the menu
            @html.menuOverlay = @html.menu.find "div.overlay"
            @html.menuOverlay.on "click", $.proxy @, "toggleMenu"

            # registering actions for click events
            @html.menu.find("#home-menu-item").on("click", $.proxy @, "goToHome")
            @html.menu.find("#profile-menu-item").on("click", $.proxy @, "goToProfile")
            @html.menu.find("#settings-menu-item").on("click", $.proxy @, "goToSettings")
            @html.menu.find("#help-menu-item").on("click", $.proxy @, "goToHelp")
            @html.menu.find("#legal-notices-menu-item").on("click", $.proxy @, "goToLegalNotices")

        goToHome: () ->
            homePage = require "#home"
            @toggleMenu()
            if not homePage.isVisible() then navigate @html.menu, homePage

        goToProfile: () ->
            Log.w "not implemented yet"

        goToSettings: () ->
            settingsPage = require "#settings"
            @toggleMenu()
            if not settingsPage.isVisible() then navigate @html.menu, settingsPage

        goToHelp: () ->
            helpPage = require "#help"
            @toggleMenu()
            if not helpPage.isVisible() then navigate @html.menu, helpPage

        goToLegalNotices: () ->
            legalNoticesPage = require "#legalNotices"
            @toggleMenu()
            if not legalNoticesPage.isVisible() then navigate @html.menu, legalNoticesPage




    navigate = ( menu, pageHandler ) ->
        SettingsManager = require "app.manager.SettingsManager"
        if SettingsManager.animationFriendly()
            menu.one 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd', () ->
                pageHandler.navigate()
        else
            pageHandler.navigate()



    module.exports = Menu

