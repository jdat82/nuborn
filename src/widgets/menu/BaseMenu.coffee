define "widgets.BaseMenu", ( require, exports, module ) ->

    'use strict';

    $ = jQuery;
    Utils = require "utils.Utils"
    UIUtils = require "utils.UIUtils"
    Base = require "common.Base"


    ###
    Default settings.
    ###
    defaults =
        id: "menu",
        templateId: "menu"



    ###*
    @class widgets.BaseMenu
    @extends common.Base
    Base class to implement a global menu
    ###
    class BaseMenu extends Base

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
            UIUtils.append document.body, templates[ templateId ].render this.settings
            @html.menu = document.body.querySelector "##{@settings.id}"

            # Storing menu state
            @data.isMenuShown = false

        toggleMenu:  () ->
            if @data.isMenuShown then @hide() else @show()
            @data.isMenuShown = not @data.isMenuShown;

        ###
        Shows the me
        ###
        show: () ->
            # deactivating scroll capacity during splashscreen
            UIUtils.disableScroll()
            @html.menu.classList.add "show"

        ###
        Hides the me
        ###
        hide: () ->
            # reactivating scroll capacity
            @html.menu.classList.remove "show"
            UIUtils.enableScroll()



    module.exports = BaseMenu
