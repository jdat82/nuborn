/*
 * @provide nu.cache.AppCache
 * @require nu.debug.Log
 */
define( "nu.cache.AppCache", function ( require, exports, module ) {

	'use strict';

	var $ = jQuery;
	var Log = require( "nu.debug.Log" );

	/**
	 * @class nu.cache.AppCache
	 * @singleton
	 *
	 * Cache Manager.
	 * Check if a new version of the webapp is available online at startup.
	 * Non sense in hybride mode. Useful only in webapp mode.
	 */
	var AppCache = Object.subClass( {
		init: function () {
			// if application cache is not supported, this is a no-op.
			if ( !Modernizr.applicationcache ) return;

			var appCache = window.applicationCache;

			appCache.addEventListener( 'updateready', function ( e ) {
				DEBUG && Log.i( "New hotness available !" );
				if ( appCache.status === appCache.UPDATEREADY ) {
					// new downloaded content available
					appCache.swapCache();
					if ( !DEBUG ) {
						if ( confirm( 'A new version of this site is available. Load it ?' ) )
							window.location.reload();
					}
					else
						window.location.reload();
				}
			}, false );
		}

	} );

	module.exports = AppCache;

	// When DOM is ready, starting the cache.
	$( function () {
		/**
		 * Gets the shared instance of AppCache class.
		 * @return {nu.cache.AppCache} The shared instance of the cache manager.
		 * @property {AppCache} instance
		 */
		AppCache.instance = new nu.cache.AppCache();
	} );

} );