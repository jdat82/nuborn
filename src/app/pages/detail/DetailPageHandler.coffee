define "app.pages.DetailPageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	buttonUtils = require( "nu.widgets.button.Utils" ).instance
	NubornPageHandler = require "app.pages.NubornPageHandler"

	###*
	@class app.pages.DetailPageHandler
	@extends app.pages.NubornPageHandler
	The Page Handler of the detail page
	###
	class DetailPageHandler extends NubornPageHandler

		###*
		@override
		@inheritdoc
		###
		constructor: () ->
			super
				id: "detail"

		createHtmlElements: () ->
			# Getting a local reference of the back button
			@html.backButton = @html.page.find ".back-button"

		###*
		@override
		@inheritdoc
		###
		pageBeforeShow: ( event, data ) ->
			super event, data
			@prepareBackButton()

		prepareBackButton: () ->
			# When touch start, go to active state
			buttonUtils.enableUniversalPressMode @html.backButton

			# When tap on back button, go back home
			@html.backButton.on "tap", @goBackToHomePage

		goBackToHomePage: () ->
			homePage = require "#home"
			homePage.navigate
				jqmOptions:
					reverse: true
			# Prevent bubbling
			return false

		pageBeforeHide: ( event, data ) ->
			super event, data
			@html.backButton.off "tap", @goBackToHomePage
			buttonUtils.disableUniversalPressMode @html.backButton

		swipeRight: ( event ) ->
			super event
			@goBackToHomePage()


	module.exports = DetailPageHandler

