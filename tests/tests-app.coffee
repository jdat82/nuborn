###
Removing the default startup process in order to replace it.
###
define.remove "app"
###
Redefining what happens at startup.
###
define "app", ( require, exports, module ) ->

    'use strict'

    $ = jQuery

    # Default logger
    log = require "#log"

    # Common utilities
    Utils = require "utils.Utils"

    ###*
    @class app
    @singleton
    Application entry point.
    ###
    module.exports =
        ###*
        Application current version.
        ###
        version: "0.1.0"

        ###*
        Application name.
        ###
        name: "Nuborn Test Application"

        ###
        Initialize the appllication when DOM & Device (PhoneGap only) are ready.
        ###
        init: () ->

            # Removing 300 ms classic delay in mobile browsers
            # http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away
            FastClick.attach document.body

            # Configuring jQuery ajax default settings
            $.ajaxSetup require "#ajaxSettings"

            # Little impurity to detect iOS and Android in CSS
            BrowserUtils.decorateDOMWithBrowserClass()

            # Preloading all page handlers to be ready for hash events
            requireWithPattern /pages#/
