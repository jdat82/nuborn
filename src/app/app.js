( function ( window, $, nu, utils, log, undefined ) {

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

    /**
     * Callback function called when the DOM is ready.
     */

    function ready( ) {
        if ( !utils.isCordova( ) ) {
            debug && log.i( "Used as a Web App" );
            init( );
        }
        else {
            debug && log.i( "Used as a Hybrid App" );
            // $.mobile.defaultHomeScroll = 0;
            document.addEventListener( "deviceready", init, false );
        }

        // installing scripts that will help remote debugging
        debug && utils.installDebugScripts( );
    }

    /**
     * Initialize the appllication when DOM & Device (PhoneGap only) are ready.
     */

    function init( ) {

        // starting JQM
        $.mobile.initializePage( );

        if ( !utils.isCordova( ) || !utils.isIOS( ) ) {
            // Application splashscreen instance
            splashscreen = new nu.widgets.SplashScreen( {
                title: "NUBORN"
            } );
            splashscreen.show( );
        }

        downloadMetadataAndStart( );
    }

    /**
     * Download application mandatory data.
     */

    function downloadMetadataAndStart( ) {

        var promise = app.manager.FakeManager.init( );
        $.when( promise ).done( function ( ) {
            window.setTimeout( function ( ) {
                // there is a very annoying JQM bug : we need to add our first page navigation at the end of the event loop.
                // so that's the setTimeout job in here.
                // loading in DOM first page app
                nu.pages.PageEventsManager.get( ).loadFirstPage( app.home.settings.id, splashscreen );
            }, 100 );
        } ).fail( function ( ) {
            // TODO handle properly. Redirect to an error page which will give options to user like restart the app, send an email, etc.
            alert( "Oops... Something went wrong." );
        } );
    }

    // when the Document is Ready, call app.ready
    $( ready );

} )( this, jQuery, nu, nu.Utils, nu.debug.Log );