define "#boot", ( require, exports, module ) ->

    'use strict'

    ###
    Callback function called when the DOM is ready.
    ###
    module.exports = ->

        $ = jQuery

        # Default logger
        log = require "#log"

        # Utilities
        BrowserUtils = require "utils.BrowserUtils"
        UIUtils = require "utils.UIUtils"

        app = require "#app"

        # Pure web
        if !BrowserUtils.isCordova()
            log.i "Used as a Web App" if INFO
            # Leveraging the manifest if possible
            require "#appCache"
            UIUtils.showSplashScreen()
            app.init()
        # Cordova
        else
            log.i "Used as a Hybrid App" if INFO
            document.addEventListener "deviceready", app.init.bind app
