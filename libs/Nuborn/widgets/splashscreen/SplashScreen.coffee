define "nu.widgets.SplashScreen", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	Log = require "nu.debug.Log"
	EventsDispatcher = require "nu.events.EventsDispatcher"
	Utils = require "nu.Utils"
	Base = require "nu.core.Base"



	###
	Default settings.
	###
	defaults =
		id: "splash",
		title: "Nuborn",
		minDelay: 3000



	###*
	@class nu.widgets.SplashScreen
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

			Log.i "SplashScreen show"

			# Deactivating scroll capacity during splashscreen
			Utils.disableScroll()

			# Adding the splashscreen at the end of the document body
			$( "body" ).append( @element )

			@showTime = window.performance.now()

		###*
		Hides the splashscreen.
		@param  {Boolean} animated Defines if the transition should be animated
		###
		hide: () ->

			Log.i "SplashScreen hide"

			destroySplashscreen = () =>

				# Reactivating scroll capacity
				Utils.enableScroll()

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
		EventsDispatcher.on SplashScreen.EVENT_SHOW, onShow
		EventsDispatcher.on SplashScreen.EVENT_HIDE, onHide

	onShow = ( event ) ->
		DEBUG && Log.i "Event SplashScreen show"
		instance.hide() if instance
		instance = new SplashScreen event.settings
		instance.show()

	onHide = ( event ) ->
		DEBUG && Log.i "Event SplashScreen hide"
		instance.hide() if instance
		instance = undefined



	# Listening...
	handleSplashScreenEvents()



	module.exports = SplashScreen