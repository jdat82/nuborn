define "widgets.Menu", ( require, exports, module ) ->

    'use strict'


    $ = jQuery
    log = require "#log"
    BaseMenu = require "widgets.BaseMenu"



    ###*
    @class widgets.Menu
    @extends widgets.BaseMenu
    Nuborn Kitchen Sink general menu.
    ###
    class Menu extends BaseMenu

        ###*
        @constructor
        @param  {Object} settings
        ###
        constructor: ( settings ) ->
            super settings

            # Close the menu on oustide click
            @html.menu.click (event) =>
                @toggleMenu()
                return true

        show: ->
            $.mobile.activePage?.addClass "blur"
            super()

        hide: ->
            $.mobile.activePage?.removeClass "blur"
            super()


    navigate = ( menu, pageHandler ) ->
        settingsManager = require "#settingsManager"
        if settingsManager.animations()
            # TODO if needs be, handle others prefixes
            menu.one 'webkitTransitionEnd', () ->
                pageHandler.navigate()
        else
            pageHandler.navigate()



    module.exports = Menu

