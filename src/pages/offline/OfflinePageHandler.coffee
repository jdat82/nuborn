define "pages.OfflinePageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	AppPageHandler = require "pages.AppPageHandler"
	messageWidget = require "widgets#message"
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
			messageWidget.offline()

			# If network come back, redirecting to home page
			document.addEventListener "online", () ->

				# Showing the loading widget
				messageWidget.loading()

				# Relaunching boot process
				require( "manager#boot" ).boot().done ->
					require( "pages#home" ).navigate()

			, false

		backButton: ( event ) ->
			super event
			log.i "Exiting app"
			if navigator.app?.exitApp then navigator.exitApp()


	module.exports = OfflinePageHandler

define "pages#offline", ( require, exports, module ) ->

    OfflinePageHandler = require "pages.OfflinePageHandler"

    ###
    @property {pages.OfflinePageHandler}
    Instance of a page handler for the offline page.
    ###
    module.exports = new OfflinePageHandler()