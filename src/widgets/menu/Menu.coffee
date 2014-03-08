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
            super()
            $.mobile.activePage?.addClass "blur"

        hide: ->
            super()
            $.mobile.activePage?.removeClass "blur"



    module.exports = Menu

