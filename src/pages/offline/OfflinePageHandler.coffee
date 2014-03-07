define "pages.OfflinePageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	AppPageHandler = require "pages.AppPageHandler"
	Message = require "widgets.Message"
	log = require "#log"

	###
	@class pages.OfflinePageHandler
	@extends pages.AppPageHandler
	The Page Handler of the offline page
	###
	class OfflinePageHandler extends AppPageHandler

		###
		@override
		@inheritdoc
		###
		constructor: () ->
			super
				id: "offline"

		pageShow: ( event, data ) ->

			super event, data

			DEBUG && log.i "No network"

			# Showing the no network widget
			Message.instance.offline()

			# If network come back, redirecting to home page
			document.addEventListener "online", () ->

				# Showing the loading widget
				Message.instance.loading()

				# Relaunching boot process
				promise = require( "manager.BootManager" ).instance.boot()
				promise.done () ->
					require( "#home" ).navigate()

			, false

		backButton: ( event ) ->
			super event
			log.i "Exiting app"
			if navigator.app?.exitApp then navigator.exitApp()


	module.exports = OfflinePageHandler

