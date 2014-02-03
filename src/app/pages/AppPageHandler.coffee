define "app.pages.AppPageHandler", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    PageHandler = require "nu.pages.PageHandler"

    ###*
    @class app.pages.AppPageHandler
    @extends nu.pages.PageHandler
    Override nu.pages.PageHandler to add some custom behavior to the default page handler.
    ###
    class AppPageHandler extends PageHandler

        pageShow: ( event, data ) ->
            super event, data

        menuButton: ( event ) ->
            super event
            menu = require "#menu"
            menu.toggleMenu()


    module.exports = AppPageHandler

