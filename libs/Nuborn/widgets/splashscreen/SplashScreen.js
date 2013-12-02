( function ( window, $, nu, Log, EventsDispatcher, undefined ) {

	'use strict';

	var defaults = {
		id: "splash",
		title: "Nuborn",
		minDelay: 3000
	};

	/**
	 * @class nu.widgets.SplashScreen
	 * Controls the splashscreen of the application.
	 *
	 * @provide nu.widgets.SplashScreen
	 *
	 * @require nu.widgets
	 * @require nu.debug.Log
	 * @require nu.events.EventsDispatcher
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
		show: function () {

			Log.i( "SplashScreen show" );

			// deactivating scroll capacity during splashscreen
			nu.Utils.disableScroll();

			// adding the splashscreen at the end of the document body
			$( "body" ).append( this.element );

			this.showTime = window.performance.now();
		},

		/**
		 * Hides the splashscreen.
		 * @param  {Boolean} animated Defines if the transition should be animated
		 */
		hide: function () {

			Log.i( "SplashScreen hide" );

			var self = this;
			var destroySplashscreen = function () {

				// reactivating scroll capacity
				nu.Utils.enableScroll();

				if ( Modernizr.animationfriendly && Modernizr.csstransforms3d ) {
					self.element.addClass( "fade-out" );
					self.element.one( 'animationend webkitAnimationEnd oanimationend MSAnimationEnd', function () {
						self.element.remove();
					} );
				}
				else {
					self.element.remove();
				}
			};

			if ( this.settings.minDelay ) {
				var delay = window.performance.now() - this.showTime;
				if ( this.settings.minDelay > delay ) {
					setTimeout( destroySplashscreen, this.settings.minDelay - delay );
				}
				else {
					destroySplashscreen();
				}
			}
			else {
				destroySplashscreen();
			}
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

	function handleSplashScreenEvents() {
		EventsDispatcher.on( SplashScreen.EVENT_SHOW, onShow );
		EventsDispatcher.on( SplashScreen.EVENT_HIDE, onHide );
	}

	function onShow( event ) {
		DEBUG && Log.i( "Event SplashScreen show" );
		instance && instance.hide();
		instance = new SplashScreen( event.settings );
		instance.show();
	}

	function onHide( event ) {
		DEBUG && Log.i( "Event SplashScreen hide" );
		instance && instance.hide();
		instance = null;
	}

	// listening...
	handleSplashScreenEvents();

} )( window, jQuery, nu, nu.debug.Log, nu.events.EventsDispatcher );