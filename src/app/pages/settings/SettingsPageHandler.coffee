define "app.pages.SettingsPageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	SettingsManager = require( "app.manager.SettingsManager" ).instance
	NubornPageHandler = require "app.pages.NubornPageHandler"

	###*
	@class app.pages.SettingsPageHandler
	@extends app.pages.NubornPageHandler
	The Page Handler of the settings page.
	###
	class SettingsPageHandler extends NubornPageHandler

		###*
		@override
		@inheritdoc
		###
		constructor: () ->
			super
				id: "settings"

		###*
		@override
		@inheritdoc
		###
		createHtmlElements: () ->
			page = @html.page
			@html.menuButton = page.find "div.menu-button"
			@html.animateCheckbox = page.find "#animate"
			@html.logsCheckbox = page.find "#logs"

		###*
		@override
		@inheritdoc
		###
		createDataElements: () ->

		###*
		@override
		@inheritdoc
		###
		pageInit: ( event ) ->
			super event
			@handleMenuButton()
			@handleAnimateCheckbox()
			@handleLogsCheckbox()

		###*
		(De)Activate animations in all application.
		###
		handleAnimateCheckbox: () ->
			# Handling change event
			@html.animateCheckbox.change () ->
				SettingsManager.toggleAnimationFriendly()
			# Initializing default state
			@html.animateCheckbox.prop "checked", SettingsManager.animationFriendly()

		###*
		(De)Activate logs recording in local storage for debugging purposes.
		###
		handleLogsCheckbox: () ->
			# Handling change event
			@html.logsCheckbox.change () ->
				SettingsManager.toggleLogsRecording()
			# Initializing default state
			@html.logsCheckbox.prop "checked", SettingsManager.logsRecording()

		###*
		@override
		@inheritdoc
		###
		pageShow: ( event, data ) ->
			super event, data

		###*
		Handle the menu button.
		###
		handleMenuButton: () ->
			# When tap on menu button, open menu panel
			@html.menuButton.on "tap", () ->
				menu = require "#menu"
				# Opening menu panel
				menu.toggleMenu()
				# Prevent bubbling
				return false

		swipeRight: ( event ) ->
			swipeCheckbox event, @html.animateCheckbox, true
			swipeCheckbox event, @html.logsCheckbox, true

		swipeLeft: ( event ) ->
			swipeCheckbox event, @html.animateCheckbox, false
			swipeCheckbox event, @html.logsCheckbox, false


	swipeCheckbox = ( event, checkbox, check ) ->
		if event.target.id is checkbox.attr "id"
			checkbox.prop "checked", check
			checkbox.change()



	module.exports = SettingsPageHandler

