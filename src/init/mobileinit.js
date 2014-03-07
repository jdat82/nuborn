// Configuration of jQuery Mobile before it loads
( function ( $, win, doc, undefined ) {

	$( doc ).on( "mobileinit", function () {

		'use strict';

		// Do not auto initialize page because of splashscreen
		$.mobile.autoInitializePage = false;

		// Deprecated since 1.1
		// $.mobile.touchOverflowEnabled = true;

		// Phonegap friendly ?
		if ( win.cordova )
			$.mobile.phonegapNavigationEnabled = true;

		// Not needed
		$.mobile.ajaxEnabled = false;

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