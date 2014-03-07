define "pages.ProfilePageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	Utils = require "utils.Utils"
	log = require "#log"
	AppPageHandler = require "pages.AppPageHandler"

	###*
	@class pages.ProfilePageHandler
	@extends pages.AppPageHandler
	The Page Handler of the profile page.
	###
	class ProfilePageHandler extends AppPageHandler

		###*
		@override
		@inheritdoc
		###
		constructor: () ->
			super
				id: "profile"



	module.exports = ProfilePageHandler

