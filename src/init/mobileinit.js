// Configuration of jQuery Mobile before it loads
( function ( $, win, doc, undefined ) {

	'use strict';

	$( doc ).on( "mobileinit", function () {


		// Do not auto initialize page because of splashscreen
		$.mobile.autoInitializePage = false;

		// Deprecated since 1.1
		// $.mobile.touchOverflowEnabled = true;

		// Phonegap friendly ?
		if ( win.cordova )
			$.mobile.phonegapNavigationEnabled = true;

		// Not needed as we load ourselve the templates
		$.mobile.ajaxEnabled = false;

		// Not used anymore
		$.mobile.linkBindingEnabled = false;

		// We don't want their loader
		$.mobile.loader.prototype.options.disabled = true;
		$.mobile.loader.prototype.options.textonly = true;

		// Disabling all transitions
		$.mobile.defaultPageTransition = "none";

		// Default fallback should be no transition at all and not fade
		for ( var key in $.mobile.transitionFallbacks ) {
			$.mobile.transitionFallbacks[ key ] = "none";
		}

		// Minimum displacement to consider a swipe event
		$.event.special.swipe.horizontalDistanceThreshold = 100;

	} );

} )( jQuery, window, document );