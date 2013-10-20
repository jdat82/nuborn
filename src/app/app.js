( function ( window, $, nu, Utils, Log, Context, SplashScreen, EventsDispatcher, undefined ) {

    'use strict';

    var splashscreen;

    /**
     * @class app
     * @singleton
     * Application entry point.
     *
     * @provide app
     *
     * @require nu
     */
    window[ "app" ] = {

        /**
         * Application current version.
         */
        version: "0.1.0",

        /**
         * Application name.
         */
        name: "Nuborn Application"
    };

    /*
     * Callback function called when the DOM is ready.
     */

    function ready( ) {

        Log.init( {
            memory: true
        } );

        // installing scripts that will help remote debugging
        DEBUG && Utils.installDebugScripts( );

        if ( !Utils.isCordova( ) ) {
            Log.i( "Used as a Web App" );
            init( );
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

    function init( ) {

        /**
         * Context instance which holds contextual data.
         * @type nu.core.Context
         */
        app.context = new Context( {
            synchronizeInLocalStorage: true
        } );

        // starting JQM
        $.mobile.initializePage( );

        // show splashscreen
        if ( !Utils.isCordova( ) || !Utils.isIOS( ) ) {
            EventsDispatcher.emit( {
                name: SplashScreen.EVENT_SHOW,
                settings: {
                    title: "NUBORN"
                }
            } );
        }

        // global menu
        app.menu = new app.widgets.Menu( {
            id: "menu"
        } );

        // loading mandatory data then going to first page
        downloadMetadataAndStart( );
    }

    /*
     * Download application mandatory data.
     */

    function downloadMetadataAndStart( ) {

        // sample manager that returns a promise
        var fakePromise = app.manager.FakeManager.init( );

        // all polyfills mandatory at startup are loaded now
        var polyfillsPromise = app.manager.PolyfillManager.init( );

        // widget that test the device to discover its abilities
        var stressTestWidget = new nu.widgets.StressTest( );
        var stressTestPromise = stressTestWidget.play( );

        // when all promises are resolved, we can go ahead
        $.when( fakePromise, polyfillsPromise, stressTestPromise ).done( function ( ) {
            window.setTimeout( function ( ) {

                // there is a very annoying JQM bug : we need to add our first page navigation at the end of the event loop.
                // so that's the setTimeout job in here.
                // loading in DOM first page app
                nu.pages.PageEventsManager.get( ).loadFirstPage( app.home.settings.id );

            }, 100 );
        } ).fail( function ( ) {

            // TODO handle properly. Redirect to an error page which will give options to user like restart the app, send an email, etc.
            alert( "Oops... Something went wrong." );

        } );
    }

    // when the Document is ready, we too
    $( ready );

} )( this, jQuery, nu, nu.Utils, nu.debug.Log, nu.core.Context, nu.widgets.SplashScreen, nu.events.EventsDispatcher );