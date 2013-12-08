( function ( undefined ) {

    'use strict';

    var $ = jQuery;

    define( "app", function ( require, exports, module ) {

        /**
         * @class app
         * @singleton
         * Application entry point.
         */
        module.exports = {
            /**
             * Application current version.
             */
            version: "0.1.0",

            /**
             * Application name.
             */
            name: "Nuborn Application"
        };
    } );


    /*
     * Callback function called when the DOM is ready.
     */

    function ready() {

        // Initiliazing application cache
        var AppCache = require( "nu.cache.AppCache" );
        // Default logger
        var Log = require( "nu.debug.Log" );
        // Common utilities
        var Utils = require( "nu.Utils" );

        // Initiliazing default logger with a local storage key and a memory channel for easy debugging
        Log.init( {
            storageKey: "nuborn.logs",
            memory: true
        } );

        // Installing scripts that will help remote debugging
        DEBUG && Utils.installDebugScripts();

        if ( !Utils.isCordova() ) {
            Log.i( "Used as a Web App" );
            init();
        }
        else {
            Log.i( "Used as a Hybrid App" );
            document.addEventListener( "deviceready", init, false );
        }
    }

    /*
     * Initialize the appllication when DOM & Device (PhoneGap only) are ready.
     */

    function init() {

        // Initiliazing a shared context object
        var context = require( "#context" );

        // Starting JQM
        $.mobile.initializePage();

        // Show splashscreen
        showSplashScreen();

        // Initializing the global menu
        var menu = require( "#menu" );

        // Loading mandatory data before going to first page
        downloadMetadataAndStart();
    }

    /**
     * Show a web splashscreen if platform doesn't support it.
     */
    function showSplashScreen() {

        // Common utilities
        var Utils = require( "nu.Utils" );
        var Log = require( "nu.debug.Log" );

        if ( !navigator.splashscreen ) {

            var EventsDispatcher = require( "nu.events.EventsDispatcher" );
            var SplashScreen = require( "nu.widgets.SplashScreen" );

            EventsDispatcher.emit( {
                name: SplashScreen.EVENT_SHOW,
                settings: {
                    title: "NUBORN"
                }
            } );
        }
    }

    /*
     * Download application mandatory data.
     */

    function downloadMetadataAndStart() {

        // Page events manager (singleton)
        var pageEventsManager = require( "nu.pages.PageEventsManager" ).instance;
        // Home page instance
        var homePage = require( "#home" );

        // Widget that stress the device to check if it is capable of playing animations smoothly
        var StressTest = require( "nu.widgets.StressTest" );
        var stressTestWidget = new StressTest();
        var stressTestPromise = stressTestWidget.play();

        // When all promises are resolved, we can go ahead
        $.when( stressTestPromise ).done( function () {

            window.setTimeout( function () {
                // There is a very annoying JQM bug : we need to add our first page at the end of the event loop.
                pageEventsManager.loadFirstPage( homePage.settings.id );
            }, 100 );

        } ).fail( function () {

            // TODO handle properly. Redirect to an error page which will give options to user like restart the app, send an email, etc.
            // Or show a beautiful popup
            alert( "Oops... Something went wrong." );

        } );
    }

    // Wwhen the Document is ready, GO GO GO
    $( ready );

} )();