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

define "pages#legalNotices", ( require, exports, module ) ->

    LegalNoticesPageHandler = require "pages.LegalNoticesPageHandler"

    ###
    @property {pages.LegalNoticesPageHandler}
    Instance of a page handler for the legal notices page.
    ###
    module.exports = new LegalNoticesPageHandler()