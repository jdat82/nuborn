define "nu.cache.AppCache", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	Log = require "nu.debug.Log"

	###*
	@class nu.cache.AppCache
	@singleton

	Cache Manager.
	Check if a new version of the webapp is available online at startup.
	Non sense in hybride mode. Useful only in webapp mode.
	###
	class AppCache

		###*
		If application cache is not supported, noop.
		@constructor
		###
		constructor: () ->

			return if Modernizr.applicationcache is false

			appCache = window.applicationCache

			newHotness = ( event ) ->

				DEBUG && Log.i "New hotness available !"

				if appCache.status is appCache.UPDATEREADY
					appCache.swapCache()
					window.location.reload() if DEBUG or (!DEBUG and confirm 'A new version of this site is available. Load it ?')

			appCache.addEventListener 'updateready', newHotness, false


	###
	The shared instance of the cache manager.
	###
	AppCache.instance = new AppCache()

	module.exports = AppCache
