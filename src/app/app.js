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

    var $ = jQuery;
    var Utils = require( "nu.Utils" );
    var Log = require( "nu.debug.Log" );
    var Context = require( "nu.core.Context" );
    var SplashScreen = require( "nu.widgets.SplashScreen" );
    var EventsDispatcher = require( "nu.events.EventsDispatcher" );
    var pageEventsManager = require( "nu.pages.PageEventsManager" ).instance;
    var Menu = require( "app.widgets.Menu" );
    var FakeManager = require( "app.manager.FakeManager" );
    var PolyfillManager = require( "app.manager.PolyfillManager" );
    var StressTest = require( "nu.widgets.StressTest" );
    var Constants = require( "app.Constants" );
    var homePage = require( "#home" );

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

        Log.init( {
            storageKey: "nuborn.logs"
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

        createContext();

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

        // sample manager that returns a promise
        var fakePromise = FakeManager.init();

        // all polyfills mandatory at startup are loaded now
        var polyfillsPromise = PolyfillManager.init();

        // widget that test the device to discover its abilities
        var stressTestWidget = new StressTest();
        var stressTestPromise = stressTestWidget.play();

        // when all promises are resolved, we can go ahead
        $.when( fakePromise, polyfillsPromise, stressTestPromise ).done( function () {
            window.setTimeout( function () {

                PolyfillManager.checkTouchOverflowSupport();

                // there is a very annoying JQM bug : we need to add our first page navigation at the end of the event loop.
                // so that's the setTimeout job in here.
                // loading in DOM first page app
                pageEventsManager.loadFirstPage( homePage.settings.id );

            }, 100 );
        } ).fail( function () {

            // TODO handle properly. Redirect to an error page which will give options to user like restart the app, send an email, etc.
            alert( "Oops... Something went wrong." );

        } );
    }

    function createContext() {
        define( "app.context", function ( require, exports, module ) {
            /**
             * Context instance which holds contextual data.
             * @type nu.core.Context
             */
            var context = new Context( {
                localStorageKey: "nuborn.context",
                synchronizeInLocalStorage: true
            } );

            // Creating a user ID
            var userId = app.context.get( Constants.USER_ID );
            !userId && app.context.set( Constants.USER_ID, Utils.guid() );

            module.exports = context;
        } );
    }

    function showSplashScreen() {
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