define "pages.HomePageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	AppPageHandler = require "pages.AppPageHandler"
	Utils = require "utils.Utils"
	UIUtils = require "utils.UIUtils"
	newsManager = require "manager#news"
	messageWidget = require "widgets#message"

	###*
	@class pages.HomePageHandler
	@extends pages.AppPageHandler
	The Page Handler of the home page.
	###
	class HomePageHandler extends AppPageHandler

		###*
		@override
		@inheritdoc
		###
		constructor: () ->
			super
				id: "home"
				singleton: true
				default: true

		###*
		@override
		@inheritdoc
		###
		createHtmlElements: () ->
			super()
			@html.refreshButton = @html.header.querySelector "#refresh-button"

		###*
		@override
		@inheritdoc
		###
		pageCreate: ( event ) ->
			super event
			@prepareNews()
			@handleManualRefresh()

		###
		Refresh button behavior.
		###
		handleManualRefresh: ->
			onClick = =>
				@html.refreshButton.classList.add "rotate"
				newsManager.news(true)
				.done (data) =>
					@data.cards = data?.cards
					@data.list = data?.list
					# Replace list content
					# todo
					@html.refreshButton.classList.remove "rotate"
					log.i "News refreshed manually" if DEBUG
				.fail (error) ->
					messageWidget.error()
				return false

			@html.refreshButton.addEventListener "click", onClick, false

		###
		Generate DOM elements based on downloaded news.
		###
		prepareNews: () ->
			# Carousel
			if @data.cards?.length
				# Add template to carousel wrapper, rendered with carousel data
				UIUtils.append @html.content, templates.card.render
					cards: @data.cards
			# List
			if @data.list?.length
				# The news template
				UIUtils.append @html.content, templates["news"].render
					news: @data.list
			else
				# Add the no data template
				UIUtils.append @html.content, templates["no-news"].render()

		###
		@override
		@inheritdoc
		###
		pageShow: (event, data) ->
			super event, data
			# Initializing Carousel with the Swipe library
			@data.carousel = new Swipe document.getElementById "carousel"

		###
		@override
		@inheritdoc
		###
		backButton: ( event ) ->
			super event
			log.i "Exiting app"
			navigator.app?.exitApp()

		###
		@override
		@inheritdoc
		Deactivating swipe effect in home page (useless)
		###
		swipeRight: ->

		###
		@override
		@inheritdoc
		Deactivating swipe effect in home page (useless)
		###
		swipeLeft: ->

		###
		Intercept the navigate call.
		Allows us to preload data or even stop navigation.
		###
		navigate: (options) ->

			log.i "Current options: #{Utils.toJSON options}" if DEBUG

			newsManager.news()
			.done (data) =>
				@data.cards = data?.cards
				@data.list = data?.list
				super options

			.fail (error) ->
				messageWidget.error()

	module.exports = HomePageHandler


define "pages#home", ( require, exports, module ) ->

    HomePageHandler = require "pages.HomePageHandler"

    ###
    @property {pages.HomePageHandler}
    Instance of a page handler for the home page.
    ###
    module.exports = new HomePageHandler()