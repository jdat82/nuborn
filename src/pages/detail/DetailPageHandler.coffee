define "pages.DetailPageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	AppPageHandler = require "pages.AppPageHandler"
	messageWidget = require "widgets#message"
	newsManager = require "manager#news"
	Utils = require "utils.Utils"

	###*
	@class pages.DetailPageHandler
	@extends pages.AppPageHandler
	The Page Handler of the detail page
	###
	class DetailPageHandler extends AppPageHandler

		###*
		@constructor
		###
		constructor: () ->
			super
				id: "detail"

		###
		@override
		@inheritdoc
		###
		navigate: (options) ->
			if not options?.urlParams
				log.e "Mandatory argument 'newsId' not found"
				messageWidget.error "News non trouvée"
				return

			newsId = options.urlParams.newsId
			log.i "Viewing news with id #{newsId}" if DEBUG

			newsManager.newsById(parseInt(newsId))
			.done (news) =>
				options.pageParams = news
				super options

			.fail (error) =>
				messageWidget.error error


	module.exports = DetailPageHandler

###
Shared instance.
###
define "pages#detail", ( require, exports, module ) ->

    DetailPageHandler = require "pages.DetailPageHandler"

    ###
    Instance of a page handler for the detail page.
    ###
    module.exports = new DetailPageHandler()
