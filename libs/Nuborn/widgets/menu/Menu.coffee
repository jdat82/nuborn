define "nu.widgets.Menu", ( require, exports, module ) ->

    'use strict';

    $ = jQuery;
    Utils = require "nu.Utils"
    Base = require "nu.core.Base"


    ###
    Default settings.
    ###
    defaults =
        id: "menu",
        templateId: "menu"



    ###*
    @class nu.widgets.Menu
    @extends nu.core.Base
    Default behavior of a menu.
    ###
    class Menu extends Base

        ###*
        @constructor
        @param  {Object} settings
        Defaults: {
        - id: widget id in DOM
        - templateId: template identifier
        }
        ###
        constructor: ( settings ) ->

            # Initializing defaults & settings
            super defaults, settings

            templateId = @settings.templateId

            # Inflates the menu
            @html.menu = $ templates[ templateId ].render this.settings
            $("body").append @html.menu

            # Storing menu state
            @data.isMenuShown = false

        toggleMenu:  () ->
            if @data.isMenuShown then @hide() else @show()
            @data.isMenuShown = not @data.isMenuShown;

        ###
        Shows the menu.
        ###
        show: () ->
            # deactivating scroll capacity during splashscreen
            Utils.disableScroll()
            @html.menu.addClass "menu-show"

        ###
        Hides the menu.
        ###
        hide: () ->
            # reactivating scroll capacity
            Utils.enableScroll()
            @html.menu.removeClass "menu-show"



    module.exports = Menu
