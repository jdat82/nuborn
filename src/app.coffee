( () ->

    'use strict'

    $ = jQuery

    define "app", ( require, exports, module ) ->

        # Default logger
        log = require "#log"

        # Common utilities
        Utils = require "utils.Utils"
        BrowserUtils = require "utils.BrowserUtils"
        NetworkUtils = require "utils.NetworkUtils"

        # Page events manager
        pagesManager = require "#pagesManager"

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
                # FastClick.attach document.body

                # Configuring jQuery ajax default settings
                $.ajaxSetup require "#ajaxSettings"

                # Installing scripts that will help remote debugging
                Utils.installDebugScripts() if DEBUG

                # Little impurity to detect iOS and Android in CSS
                BrowserUtils.decorateDOMWithBrowserClass()

                # Starting the notification manager
                require "manager#notification"

                # Loading the global menu
                require "widgets#menu"

                # Open external links in a new web view
                require( "widgets#inAppWebView" ).listenForExternalLinks()

                # Loading the home page handler
                homePage = require "pages#home"

                # Defining default page handler
                pagesManager.defaultPageHandler homePage

                # Redirecting to the offline page if no network
                # Implies application don't handle an offline mode
                if not NetworkUtils.isNetworkAvailable()
                    require( "pages#offline" ).navigate();
                else
                    # Watch for online/offline events
                    offlineWidget = require "widgets#offline"
                    offlineWidget.watch()

                    # Loading mandatory data before going to first page
                    require( "manager#boot" ).boot().done ->
                        # First page loading
                        pagesManager.startFromHash()


    ###
    Callback function called when the DOM is ready.
    ###
    ready = () ->

        # Default logger
        log = require "#log"

        # Utilities
        BrowserUtils = require "utils.BrowserUtils"
        UIUtils = require "utils.UIUtils"

        app = require "app"

        # Preloading all page handlers to be ready for hash events
        requireWithPattern /pages#/

        # Pure web
        if !BrowserUtils.isCordova()
            log.i "Used as a Web App"
            # Leveraging the manifest if possible
            require "#appCache"
            UIUtils.showSplashScreen()
            app.init()
        # Cordova
        else
            log.i "Used as a Hybrid App"
            document.addEventListener "deviceready", app.init.bind( app ), false


    # Wwhen the Document is ready, GO GO GO
    document.addEventListener "DOMContentLoaded", ready, false

).call()