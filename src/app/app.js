/*
 * @provide app
 * @require app.Constants
 * @require #home
 * @require app.manager.FakeManager
 * @require app.manager.PolyfillManager
 * @require app.widgets.Menu
 * @require nu.debug.Log
 * @require nu.core.Context
 * @require nu.events.EventsDispatcher
 * @require nu.pages.PageEventsManager
 * @require nu.Utils
 * @require nu.widgets.SplashScreen
 * @require nu.widgets.StressTest
 */
( function ( undefined ) {

    'use strict';

    var $ = jQuery,
        AppCache, Utils, Log, Context, SplashScreen, EventsDispatcher, pageEventsManager, menu, context,
        FakeManager, PolyfillManager, StressTest, Constants, homePage;

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

        AppCache = require( "nu.cache.AppCache" );
        Utils = require( "nu.Utils" );
        Log = require( "nu.debug.Log" );

        Log.init( {
            storageKey: "nuborn.logs",
            memory: true
        } );

        // installing scripts that will help remote debugging
        DEBUG && Utils.installDebugScripts();

        if ( !Utils.isCordova() ) {
            Log.i( "Used as a Web App" );
            init();
        }
        else {
            Log.i( "Used as a Hybrid App" );
            // $.mobile.defaultHomeScroll = 0;
            document.addEventListener( "deviceready", init, false );
        }
    }

    /*
     * Initialize the appllication when DOM & Device (PhoneGap only) are ready.
     */

    function init() {

        context = require( "#context" );

        // starting JQM
        $.mobile.initializePage();

        // show splashscreen
        showSplashScreen();

        // loading mandatory data then going to first page
        downloadMetadataAndStart();
    }

    /*
     * Download application mandatory data.
     */

    function downloadMetadataAndStart() {

        StressTest = require( "nu.widgets.StressTest" );
        pageEventsManager = require( "nu.pages.PageEventsManager" ).instance;
        homePage = require( "#home" );

        // widget that test the device to discover its abilities
        var stressTestWidget = new StressTest();
        var stressTestPromise = stressTestWidget.play();

        // when all promises are resolved, we can go ahead
        $.when( stressTestPromise ).done( function () {
            window.setTimeout( function () {

                // there is a very annoying JQM bug : we need to add our first page navigation at the end of the event loop.
                // so that's the setTimeout job in her
                // loading in DOM first page app
                pageEventsManager.loadFirstPage( homePage.settings.id );

            }, 100 );
        } ).fail( function () {

            // TODO handle properly. Redirect to an error page which will give options to user like restart the app, send an email, etc.
            alert( "Oops... Something went wrong." );

        } );
    }

    function showSplashScreen() {

        EventsDispatcher = require( "nu.events.EventsDispatcher" );
        SplashScreen = require( "nu.widgets.SplashScreen" );

        if ( !Utils.isCordova() || !Utils.isIOS() ) {
            EventsDispatcher.emit( {
                name: SplashScreen.EVENT_SHOW,
                settings: {
                    title: "NUBORN"
                }
            } );
        }
    }

    // when the Document is ready, GO GO GO
    $( ready );

} )();