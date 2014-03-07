define "pages.SettingsPageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	SettingsManager = require( "manager.SettingsManager" )
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
			@html.logsCheckbox = @html.content.find "#logs"

		###*
		@override
		@inheritdoc
		###
		pageCreate: ( event ) ->
			super event
			@handleAnimateCheckbox()
			@handleLogsCheckbox()

		###*
		(De)Activate animations in all application.
		###
		handleAnimateCheckbox: () ->
			# Handling change event
			@html.animateCheckbox.change () ->
				SettingsManager.instance.toggleAnimations()
			# Initializing default state
			@html.animateCheckbox.prop "checked", SettingsManager.instance.animations()

		###*
		(De)Activate logs recording in local storage for debugging purposes.
		###
		handleLogsCheckbox: () ->
			# Handling change event
			@html.logsCheckbox.change () ->
				SettingsManager.instance.toggleLogsRecording()
			# Initializing default state
			@html.logsCheckbox.prop "checked", SettingsManager.instance.logsRecording()


	module.exports = SettingsPageHandler

