define "cache.AppCache", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"

	###*
	@class cache.AppCache
	@singleton

	Cache Manager.
	Check if a new version of the webapp is available online at startup.
	Non sense in hybride mode except if there is no local files. Should be useful only in webapp mode.

	TODO This function should not start automatically on DOMContentLoaded. It should be launched manually
	in js only if in web mode, firstly for coherence, secondly because is is not used in hybrid mode.
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
				log.d "New hotness available !" if DEBUG
				if appCache.status is appCache.UPDATEREADY
					appCache.swapCache()
					window.location.reload() if DEBUG or (!DEBUG and confirm 'A new version of this site is available. Load it ?')

			appCache.addEventListener 'updateready', newHotness, false


	module.exports = AppCache


###
The shared instance
###
define "#appCache", ( require, exports, module ) ->

	'use strict'

	AppCache = require "cache.AppCache"
	module.exports = new AppCache()