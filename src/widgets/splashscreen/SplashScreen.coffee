define "widgets.SplashScreen", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	eventsBroker = require "#eventsBroker"
	UIUtils = require "utils.UIUtils"
	Base = require "common.Base"
	Constants = require "common.Constants"
	settingsManager = require "#settingsManager"



	###
	Default settings.
	###
	defaults =
		id: "splash",
		title: "",
		minDelay: 3000



	###*
	@class widgets.SplashScreen
	Controls the splashscreen of the application.
	###
	class SplashScreen extends Base

		###*
		@constructor
		@param  {Object} settings
		###
		constructor: ( settings ) ->
			super defaults, settings
			@html.body = $(document.body)
			# Inflates the splashscreen
			@data.splashscreen = templates.splashscreen.render @settings

		###*
		Shows the splashscreen.
		###
		show: () ->

			log.i "SplashScreen show" if DEBUG

			# Deactivating scroll capacity during splashscreen
			UIUtils.disableScroll()

			# Adding the splashscreen at the end of the document body
			@html.splashscreen = $( @data.splashscreen )
			@html.body.append @html.splashscreen

			@data.showTime = window.performance.now()
			return

		###*
		Hides the splashscreen.
		@param  {Boolean} animated Defines if the transition should be animated
		###
		hide: () ->

			log.i "SplashScreen hide" if DEBUG

			destroySplashscreen = () =>
				# Reactivating scroll capacity
				UIUtils.enableScroll()
				if  Modernizr.animationfriendly
					@html.splashscreen.one 'webkitAnimationEnd', =>
						@html.splashscreen.remove()
					@html.splashscreen.addClass "hide"
				else
					@html.splashscreen.remove()

			if @settings.minDelay
				delay = window.performance.now() - @data.showTime
				if @settings.minDelay > delay
					setTimeout destroySplashscreen, @settings.minDelay - delay
				else
					destroySplashscreen()
			else
				destroySplashscreen()



	module.exports = SplashScreen


###
Shared instance
###
define "#splashscreen", ( require, exports, module ) ->

	'use strict'

	SplashScreen = require "widgets.SplashScreen"
	module.exports = new SplashScreen
		title: "NUBORN"