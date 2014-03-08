define "pages.SettingsPageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	settingsManager = require "#settingsManager"
	AppPageHandler = require "pages.AppPageHandler"

	###*
	@class pages.SettingsPageHandler
	@extends pages.AppPageHandler
	The Page Handler of the settings page.
	###
	class SettingsPageHandler extends AppPageHandler

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
			super()
			@html.animateCheckbox = @html.content.find "#animate"

		###*
		@override
		@inheritdoc
		###
		pageCreate: ( event ) ->
			super event
			@handleAnimateCheckbox()

		###*
		(De)Activate animations in all application.
		###
		handleAnimateCheckbox: () ->
			# Handling change event
			@html.animateCheckbox.change () ->
				settingsManager.toggleAnimations()
			# Initializing default state
			@html.animateCheckbox.prop "checked", settingsManager.animations()

		navigate: (options) ->
			# TODO hide the animate line if settingsManager.animations() is false
			super options

	module.exports = SettingsPageHandler

