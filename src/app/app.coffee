( () ->

    'use strict'

    $ = jQuery

    define "app", ( require, exports, module ) ->

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
    Callback function called when the DOM is ready.
    ###
    ready = () ->

        # Initiliazing application cache
        require "nu.cache.AppCache"
        # Default logger
        log = require "#log"
        # Common utilities
        Utils = require "nu.Utils"

        # Initiliazing default logger with a local storage key and a memory channel for easy debugging
        log.tune
            storageKey: "nuborn.logs"
            memory: true

        # Installing scripts that will help remote debugging
        Utils.installDebugScripts() if DEBUG

        if !Utils.isCordova()
            log.i "Used as a Web App"
            init()
        else
            log.i "Used as a Hybrid App"
            document.addEventListener "deviceready", init, false

    ###
    Initialize the appllication when DOM & Device (PhoneGap only) are ready.
    ###
    init = () ->

        # Removing 300 ms classic delay in mobile browsers
        # http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away
        FastClick.attach document.body

        Utils = require "nu.Utils"
        Utils.decorateDOMWithBrowserClass()

        # Initiliazing a shared context object
        context = require "#context"

        # Creating a user ID
        Constants = require "app.Constants"
        userId = context.get Constants.USER_ID
        if !userId then context.set Constants.USER_ID, Utils.guid()

        # Starting JQM
        $.mobile.initializePage()

        # Show splashscreen
        showSplashScreen()

        # Initializing the global menu
        menu = require "#menu"

        # Loading mandatory data before going to first page
        downloadMetadataAndStart()

    ###*
    Show a web splashscreen if platform doesn't support it.
    ###
    showSplashScreen = () ->

        # Common utilities
        Utils = require "nu.Utils"
        log = require "#log"

        if !navigator.splashscreen
            events = require( "nu.events.EventsDispatcher" ).instance
            SplashScreen = require "nu.widgets.SplashScreen"
            events.emit
                name: SplashScreen.EVENT_SHOW
                settings:
                    title: "NUBORN"

    ###
    Download application mandatory data.
    ###
    downloadMetadataAndStart = () ->

        # Page events manager (singleton)
        pageEventsManager = require( "nu.pages.PageEventsManager" ).instance
        # Home page instance
        homePage = require "#home"

        # Widget that stress the device to check if it is capable of playing animations smoothly
        StressTest = require "nu.widgets.StressTest"
        stressTestWidget = new StressTest()
        stressTestPromise = stressTestWidget.play()

        # When all promises are resolved, we can go ahead
        xhr = $.when stressTestPromise
        xhr.done () ->
            window.setTimeout () ->
                # There is a very annoying JQM bug : we need to add our first page at the end of the event loop.
                pageEventsManager.loadFirstPage homePage.settings.id
            , 100

        xhr.fail () ->
            # TODO handle properly. Redirect to an error page which will give options to user like restart the app, send an email, etc.
            # Or show a beautiful popup
            alert "Oops... Something went wrong."

        return

    # Wwhen the Document is ready, GO GO GO
    $( ready )

).call()