define "pages.HomePageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	AppPageHandler = require "pages.AppPageHandler"

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

		###*
		@override
		@inheritdoc
		###
		createHtmlElements: () ->
			super()
			@html.carousel = @html.content.find "#carousel"
			@html.carouselWrapper = @html.content.find "#carousel-wrapper"
			@html.news = @html.content.find "#news"

		###*
		@override
		@inheritdoc
		###
		createDataElements: () ->
			super()

			# Create the data to display in the carousel
			@data.carousel =
				cards: [ {
					title: "The Big Bang Theory",
					image: "img/3983699775_cfe70a1224_z.jpg"
				}, {
					title: "Game of Thrones",
					image: "img/game-of-thrones-Poster.jpg"
				}, {
					title: "How I Met Your Mother",
					image: "img/50a004d9a6710c0f7c000006_ref.jpg"
				}, {
					title: "Person of Interest",
					image: "img/Person-of-Interest-saison-1-VOSTFR-640x640.jpg"
				} ]


			# Create the data to display in the news
			@data.news =
				items: [ {
						id: 1,
						title: "Le créateur des \"Griffin\" se pointe... dans \"Les Simpson\" !",
						author: "",
						date: "dimanche 12 mai",
						image: "img/20558741.jpg"
					}, {
						id: 2,
						title: "La chaîne américaine ABC commande 12 nouvelles séries",
						author: "",
						date: "samedi 11 mai",
						image: "img/20560689.jpg"
					}, {
						id: 3,
						title: "La série adaptée de \"SHIELD\" de Marvel est commandée",
						author: "",
						date: "samedi 11 mai",
						image: "img/20559549.jpg"
					}, {
						id: 4,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "img/20560903.jpg"
					}, {
						id: 5,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "img/20560816.jpg"
					}, {
						id: 6,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "img/20560903.jpg"
					}, {
						id: 7,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "img/20555126.jpg"
					}, {
						id: 8,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "img/20560903.jpg"
					}, {
						id: 9,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "img/20560816.jpg"
					}, {
						id: 10,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "img/20556957.jpg"
					}, {
						id: 11,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "img/20555126.jpg"
					}, {
						id: 12,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "img/20560903.jpg"
					}, {
						id: 13,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "img/20560816.jpg"
					}, {
						id: 14,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "img/20556957.jpg"
					}, {
						id: 15,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "img/20555126.jpg"
					}, {
						id: 16,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "img/20560903.jpg"
					}, {
						id: 17,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "img/20560816.jpg"
					}, {
						id: 18,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "img/20556957.jpg"
					}, {
						id: 19,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "img/20555126.jpg"
					}
				]

		###*
		@override
		@inheritdoc
		###
		pageCreate: ( event ) ->
			super event
			@prepareCarousel()
			@prepareNews()

		###*
		@override
		@inheritdoc
		###
		pageShow: ( event, data ) ->
			super event, data

			# Initializing Carousel with the Swipe library
			@html.carousel.Swipe()

		###*
		Prepare the carousel. <br/>
		-- Load the data <br/>
		-- Render the data
		###
		prepareCarousel: () ->
			# Add template to carousel wrapper, rendered with carousel data
			@html.carouselWrapper.html templates.card.render @data.carousel

		prepareNews: () ->
			# Add template to news, rendered with news data
			news = @html.news
			news.append templates.news_cell.render @data.news

		###
		@override
		@inheritdoc
		###
		backButton: ( event ) ->
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


	module.exports = HomePageHandler

