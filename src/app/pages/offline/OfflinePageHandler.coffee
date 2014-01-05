define "app.pages.OfflinePageHandler", ( require, exports, module ) ->

	'use strict'

	NubornPageHandler = require "app.pages.NubornPageHandler"

	###*
	@class app.pages.OfflinePageHandler
	@extends app.pages.NubornPageHandler
	The Page Handler of the offline page
	###
	class OfflinePageHandler extends NubornPageHandler

		###*
		@override
		@inheritdoc
		###
		constructor: () ->
			super
				id: "offline"

		createHtmlElements: () ->

		###*
		@override
		@inheritdoc
		###
		pageBeforeShow: ( event, data ) ->
			super event, data

		pageBeforeHide: ( event, data ) ->
			super event, data


	module.exports = OfflinePageHandler

