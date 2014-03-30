define "#app", ( require, exports, module ) ->

    'use strict'

    $ = jQuery

    # Default logger
    log = require "#log"

    # Common utilities
    Utils = require "utils.Utils"
    BrowserUtils = require "utils.BrowserUtils"
    NetworkUtils = require "utils.NetworkUtils"

    # Page events manager
    pagesManager = require "manager#pages"

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
        name: "Nuborn Application"

        ###
        Initialize the appllication when DOM & Device (PhoneGap only) are ready.
        ###
        init: () ->

            # Removing 300 ms classic delay in mobile browsers
            # http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away
            FastClick.attach document.body

            # Configuring jQuery ajax default settings
            $.ajaxSetup require "ajax#settings"

            # Installing scripts that will help remote debugging
            Utils.installDebugScripts() if DEBUG

            # Little impurity to detect iOS and Android in CSS
            BrowserUtils.decorateDOMWithBrowserClass()

            # Preloading all page handlers to be ready for hash events
            requireWithPattern /pages#/

            # Starting the notification manager
            require "manager#notification"

            # Loading the global menu
            require "widgets#menu"

            # Listen for external links in order to open them in a new web view
            require( "widgets#inAppWebView" ).listenForExternalLinks()

            # Load the home page handler
            homePage = require "pages#home"

            # Define the default page handler
            pagesManager.defaultPageHandler homePage

            # Redirecting to the offline page if no network
            # Implies application don't handle an offline mode
            if not NetworkUtils.isNetworkAvailable()
                require( "pages#offline" ).navigate();
            else
                # Watch for online/offline events
                offlineWidget = require "widgets#offline"
                offlineWidget.watch()

                # Load mandatory data before going to first page
                require( "manager#boot" ).boot().done ->
                    # First page loading
                    pagesManager.startFromHash()
