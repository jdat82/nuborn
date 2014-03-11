define "pages.SettingsPageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	settingsManager = require "#settingsManager"
	AppPageHandler = require "pages.AppPageHandler"
	context = require "#context"
	message = require "#message"
	bootManager = require "#bootManager"

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
			@html.animateCheckbox = @html.content.querySelector "#animate"
			@html.resetButton = @html.content.querySelector "#reset"

		###*
		@override
		@inheritdoc
		###
		pageCreate: ( event ) ->
			super event
			@handleAnimateCheckbox()
			@handleResetButton()

		###*
		(De)Activate animations in all application.
		###
		handleAnimateCheckbox: () ->
			# Handling change event
			@html.animateCheckbox.addEventListener "change", ->
				settingsManager.toggleAnimations()
			, false
			# Initializing default state
			@html.animateCheckbox.checked = settingsManager.animations()

		###*
		(De)Activate animations in all application.
		###
		handleResetButton: ->
			# Handling change event
			@html.resetButton.addEventListener "click", ->
				# Tempo
				message.message "Réinitialisation de vos préférences..."
				# Clearing the context
				context.clear()
				# Relaunching boot process
				bootManager.boot().done ->
					require( "#home" ).navigate()
			, false

		navigate: (options) ->
			# TODO hide the animate line if settingsManager.animations() is false
			super options

	module.exports = SettingsPageHandler
