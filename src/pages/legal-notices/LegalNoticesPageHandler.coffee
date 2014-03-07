define "pages.LegalNoticesPageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	AppPageHandler = require "pages.AppPageHandler"

	###*
	@class pages.LegalNoticesPageHandler
	@extends pages.AppPageHandler
	The Page Handler of the legalNotices page.
	###
	class LegalNoticesPageHandler extends AppPageHandler

		###*
		@override
		@inheritdoc
		###
		constructor: () ->
			super
				id: "legalNotices"
				templateId: "legal-notices"



	module.exports = LegalNoticesPageHandler

