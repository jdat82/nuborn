define "app.pages.OfflinePageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	AppPageHandler = require "app.pages.AppPageHandler"
	Message = require "nu.widgets.Message"
	log = require "#log"

	###
	@class app.pages.OfflinePageHandler
	@extends app.pages.AppPageHandler
	The Page Handler of the offline page
	###
	class OfflinePageHandler extends AppPageHandler

		###
		@override
		@inheritdoc
		###
		init: () ->
			super
				id: "offline"

		pageShow: ( event, data ) ->

			super event, data

			DEBUG && log.i "No network"

			# Showing the no network widget
			Message.instance.offline()

			# If network come back, redirecting to home page
			$( document ).on "online", () ->

				# Showing the loading widget
				Message.instance.loading()

				# Relaunching boot process
				promise = require( "app.manager.BootManager" ).instance.boot()
				promise.done () ->
					require( "#home" ).navigate()

		backButton: ( event ) ->
			super event
			log.i "Exiting app"
			navigator.app and navigator.app.exitApp and navigator.app.exitApp()


	module.exports = OfflinePageHandler

