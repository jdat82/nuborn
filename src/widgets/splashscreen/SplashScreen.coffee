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
			@html.splashscreen = $( templates[ "splashscreen" ].render( @settings ) )

		###*
		Shows the splashscreen.
		###
		show: () ->

			log.i "SplashScreen show"

			# Deactivating scroll capacity during splashscreen
			UIUtils.disableScroll()

			# Adding the splashscreen at the end of the document body
			@html.body.append( @html.splashscreen )

			@showTime = window.performance.now()

		###*
		Hides the splashscreen.
		@param  {Boolean} animated Defines if the transition should be animated
		###
		hide: () ->

			log.i "SplashScreen hide"

			destroySplashscreen = () =>

				# Reactivating scroll capacity
				UIUtils.enableScroll()

				if  Modernizr.animationfriendly
					@html.splashscreen.addClass "fade-out"
					@html.splashscreen.one 'animationend webkitAnimationEnd oanimationend MSAnimationEnd', () =>
						@html.splashscreen.remove()
				else
					@html.splashscreen.remove()

			if @settings.minDelay
				delay = window.performance.now() - @showTime
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