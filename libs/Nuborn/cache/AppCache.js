( function ( window, $, nu, log, undefined ) {

	'use strict';

	/**
	 * @class nu.cache.AppCache
	 * @singleton
	 *
	 * Cache Manager.
	 * Check if a new version of the webapp is available online at startup.
	 * Non sense in hybride mode. Useful only in webapp mode.
	 *
	 * @provide nu.cache.AppCache
	 *
	 * @require nu.cache
	 * @require nu.debug.Log
	 */
	nu.cache.AppCache = Object.subClass( {
		init: function ( ) {
			// if application cache is not supported, this is a no-op.
			if ( !Modernizr.applicationcache ) return;

			var appCache = window.applicationCache;

			appCache.addEventListener( 'updateready', function ( e ) {
				DEBUG && log.i( "New hotness available !" );
				if ( appCache.status === appCache.UPDATEREADY ) {
					// new downloaded content available
					appCache.swapCache( );
					if ( !DEBUG ) {
						if ( confirm( 'A new version of this site is available. Load it ?' ) )
							window.location.reload( );
					}
					else
						window.location.reload( );
				}
			}, false );
		}

	} );

	/**
	 * Gets the shared instance of AppCache class.
	 * @return {nu.cache.AppCache} The shared instance of the cache manager.
	 *
	 * @static
	 * @method get
	 */
	nu.cache.AppCache.get = function ( ) {
		if ( !nu.cache.AppCache.SINGLETON_INSTANCE )
			nu.cache.AppCache.SINGLETON_INSTANCE = new nu.cache.AppCache( );
		return nu.cache.AppCache.SINGLETON_INSTANCE;
	};

	// When DOM is ready, starting the cache.
	$( function ( ) {
		// first access will initialize the cache manager
		nu.cache.AppCache.get( );
	} );

} )( this, jQuery, nu, nu.debug.Log );