define "pages.DetailPageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	AppPageHandler = require "pages.AppPageHandler"

	###*
	@class pages.DetailPageHandler
	@extends pages.AppPageHandler
	The Page Handler of the detail page
	###
	class DetailPageHandler extends AppPageHandler

		###*
		@override
		@inheritdoc
		###
		constructor: () ->
			super
				id: "detail"


	module.exports = DetailPageHandler

