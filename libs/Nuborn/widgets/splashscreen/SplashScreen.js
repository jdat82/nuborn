( function ( $, nu, Log, EventsDispatcher, undefined ) {

    'use strict';

    var defaults = {
        id: "splash",
        title: "Nuborn"
    };

    /**
     * @class nu.widgets.SplashScreen
     * Controls the splashscreen of the application.
     *
     * @provide nu.widgets.SplashScreen
     *
     * @require nu.widgets
     */
    var SplashScreen = nu.widgets.SplashScreen = Object.subClass( {

        /**
         * @constructor
         * @param  {Object} settings
         */
        init: function ( settings ) {
            this.settings = $.extend( true, defaults, settings );
            // inflates the splashscreen
            this.element = $( templates.SplashScreen.render( this.settings ) );
        },

        /**
         * Shows the splashscreen.
         */
        show: function ( ) {

            // deactivating scroll capacity during splashscreen
            nu.Utils.disableScroll( );

            // adding the splashscreen at the end of the document body
            $( "body" ).append( this.element );
        },

        /**
         * Hides the splashscreen.
         * @param  {Boolean} animated Defines if the transition should be animated
         */
        hide: function ( ) {

            // reactivating scroll capacity
            nu.Utils.enableScroll( );

            this.element.addClass( "fade-out" );

            var self = this;
            this.element.one( 'animationend webkitAnimationEnd oanimationend MSAnimationEnd', function ( ) {
                self.element.remove( );
            } );
        }

    } );

    /*
     * Current splashscreen instance.
     */
    var instance;

    /**
     * @event
     * Show splashscreen.
     */
    SplashScreen.EVENT_SHOW = "splashscreen/show";
    /**
     * @event
     * Hide splashscreen.
     */
    SplashScreen.EVENT_HIDE = "splashscreen/hide";

    /*
     * Handle events lifecycle.
     */

    function handleSplashScreenEvents( ) {
        EventsDispatcher.on( SplashScreen.EVENT_SHOW, onShow );
        EventsDispatcher.on( SplashScreen.EVENT_HIDE, onHide );
    }

    function onShow( event ) {
        DEBUG && Log.i( "SplashScreen show" );
        instance && instance.hide( );
        instance = new SplashScreen( event.settings );
        instance.show( );
    }

    function onHide( event ) {
        DEBUG && Log.i( "SplashScreen hide" );
        instance && instance.hide( );
    }

    // listening...
    handleSplashScreenEvents( );

} )( jQuery, nu, nu.debug.Log, nu.events.EventsDispatcher );