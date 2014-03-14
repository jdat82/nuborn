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
				exitOnBack: true

		pageShow: ( event, data ) ->

			super event, data

			log.i "No network" if INFO

			# Showing the no network widget
			messageWidget.offline()

			# If network come back, redirecting to home page
			document.addEventListener "online", () ->

				# Showing the loading widget
				messageWidget.loading()

				# Relaunching boot process
				require( "manager#boot" ).boot().done ->
					require( "pages#home" ).navigate()


	module.exports = OfflinePageHandler

define "pages#offline", ( require, exports, module ) ->

    OfflinePageHandler = require "pages.OfflinePageHandler"

    ###
    @property {pages.OfflinePageHandler}
    Instance of a page handler for the offline page.
    ###
    module.exports = new OfflinePageHandler()