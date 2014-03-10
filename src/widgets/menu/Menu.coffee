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
            @html.menu.addEventListener "click", (event) =>
                @toggleMenu()
                return true
            ,false
        show: ->
            @html.menu.classList.remove "out-of-screen"
            super()
            $.mobile.activePage?.addClass "blur"

        hide: ->
            super()
            $.mobile.activePage?.removeClass "blur"
            @html.menu.classList.add "out-of-screen"



    module.exports = Menu

