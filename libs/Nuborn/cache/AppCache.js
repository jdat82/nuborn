(function (window, nu, log, undefined)
{

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
	nu.cache.AppCache = Object.subClass(
	{
		init: function ()
		{
			var appCache = window.applicationCache;

			appCache.addEventListener('updateready', function (e)
			{
				debug && log.i("New hotness available !");
				if (appCache.status === appCache.UPDATEREADY)
				{
					// new downloaded content available
					appCache.swapCache();
					if (!debug)
					{
						if (confirm('A new version of this site is available. Load it ?'))
							window.location.reload();
					}
					else
						window.location.reload();
				}
			}, false);
		}

	});

	/**
	 * Gets the shared instance of AppCache class.
	 * @return {nu.cache.AppCache} The shared instance of the cache manager.
	 *
	 * @static
	 * @method get
	 */
	nu.cache.AppCache.get = function ()
	{
		if (!nu.cache.AppCache.SINGLETON_INSTANCE)
			nu.cache.AppCache.SINGLETON_INSTANCE = new nu.cache.AppCache();
		return nu.cache.AppCache.SINGLETON_INSTANCE;
	};

})(this, nu, nu.debug.Log)