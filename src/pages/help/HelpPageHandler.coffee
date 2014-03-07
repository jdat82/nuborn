define "pages.HelpPageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	Utils = require "utils.Utils"
	log = require "#log"
	AppPageHandler = require "pages.AppPageHandler"

	###*
	@class pages.HelpPageHandler
	@extends pages.AppPageHandler
	The Page Handler of the help page.
	###
	class HelpPageHandler extends AppPageHandler

		###*
		@override
		@inheritdoc
		###
		constructor: () ->
			super
				id: "help"


	module.exports = HelpPageHandler

