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

		###*
		Shows the splashscreen.
		###
		show: () ->

			log.i "SplashScreen show" if DEBUG

			# Deactivating scroll capacity during splashscreen
			UIUtils.disableScroll()

			# Adding the splashscreen at the end of the document body
			UIUtils.append document.body, templates.splashscreen.render @settings
			@html.splashscreen = document.body.querySelector "##{@settings.id}"

			# Saving current time of add for minDelay feature
			@data.showTime = window.performance.now()
			return

		###*
		Hides the splashscreen.
		@param  {Boolean} animated Defines if the transition should be animated
		###
		hide: () ->

			log.i "SplashScreen hide" if DEBUG

			destroy = () =>
				# Reactivating scroll capacity
				UIUtils.enableScroll()
				if  Modernizr.animationfriendly
					UIUtils.one @html.splashscreen, 'webkitAnimationEnd', false, =>
						UIUtils.remove @html.splashscreen
					@html.splashscreen.classList.add "hide"
				else
					UIUtils.remove @html.splashscreen

			if @settings.minDelay
				delay = window.performance.now() - @data.showTime
				if @settings.minDelay > delay
					setTimeout destroy, @settings.minDelay - delay
				else
					destroy()
			else
				destroy()



	module.exports = SplashScreen


###
Shared instance
###
define "#splashscreen", ( require, exports, module ) ->

	'use strict'

	SplashScreen = require "widgets.SplashScreen"
	module.exports = new SplashScreen
		title: "NUBORN"