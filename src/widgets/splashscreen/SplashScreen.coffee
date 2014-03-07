define "widgets.SplashScreen", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	events = require( "events.EventsBroker" ).instance
	UIUtils = require "utils.UIUtils"
	Base = require "common.Base"



	###
	Default settings.
	###
	defaults =
		id: "splash",
		title: "Nuborn",
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
			# Inflates the splashscreen
			@element = $( templates[ "SplashScreen" ].render( @settings ) )

		###*
		Shows the splashscreen.
		###
		show: () ->

			log.i "SplashScreen show"

			# Deactivating scroll capacity during splashscreen
			UIUtils.disableScroll()

			# Adding the splashscreen at the end of the document body
			$( "body" ).append( @element )

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

				if  Modernizr.animationfriendly and Modernizr.csstransforms3d
					@element.addClass "fade-out"
					@element.one 'animationend webkitAnimationEnd oanimationend MSAnimationEnd', () =>
						@element.remove()
				else
					@element.remove()

			if @settings.minDelay
				delay = window.performance.now() - @showTime
				if @settings.minDelay > delay
					setTimeout destroySplashscreen, @settings.minDelay - delay
				else
					destroySplashscreen()
			else
				destroySplashscreen()



	###
	Current splashscreen instance.
	###
	instance = undefined



	###*
	@event
	Show splashscreen.
	###
	SplashScreen.EVENT_SHOW = "splashscreen/show"

	###*
	@event
	Hide splashscreen.
	###
	SplashScreen.EVENT_HIDE = "splashscreen/hide"



	###
	Handle events lifecycle.
	###
	handleSplashScreenEvents = () ->
		events.on SplashScreen.EVENT_SHOW, onShow
		events.on SplashScreen.EVENT_HIDE, onHide

	onShow = ( event ) ->
		DEBUG && log.i "Event SplashScreen show"
		instance.hide() if instance
		instance = new SplashScreen event.settings
		instance.show()

	onHide = ( event ) ->
		DEBUG && log.i "Event SplashScreen hide"
		instance.hide() if instance
		instance = undefined



	# Listening...
	handleSplashScreenEvents()



	module.exports = SplashScreen