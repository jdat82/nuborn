define "app.pages.HomePageHandler", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	AppPageHandler = require "app.pages.AppPageHandler"

	###*
	@class app.pages.HomePageHandler
	@extends app.pages.AppPageHandler
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
			page = @html.page
			@html.menuButton = page.find "div.menu-button"
			@html.carousel = page.find "#carousel"
			@html.carouselWrapper = page.find "#carousel-wrapper"
			@html.news = page.find "#news"

		###*
		@override
		@inheritdoc
		###
		createDataElements: () ->

			# Create the data to display in the carousel
			@data.carousel =
				cards: [ {
					title: "The Big Bang Theory",
					image: "http://src.sencha.io/http://farm3.staticflickr.com/2493/3983699775_cfe70a1224_z.jpg"
				}, {
					title: "Game of Thrones",
					image: "http://src.sencha.io/http://www.menzone.gr/wp-content/uploads/2013/05/game-of-thrones-Poster.jpg"
				}, {
					title: "How I Met Your Mother",
					image: "http://src.sencha.io/http://opinionaided.s3.amazonaws.com/201211/50a004d9a6710c0f7c000006_ref.jpg"
				}, {
					title: "Person of Interest",
					image: "http://src.sencha.io/http://www.tuxboard.com/photos/2013/01/Person-of-Interest-saison-1-VOSTFR-640x640.jpg"
				} ]


			# Create the data to display in the news
			@data.news =
				items: [ {
						id: 1,
						title: "Le créateur des \"Griffin\" se pointe... dans \"Les Simpson\" !",
						author: "",
						date: "dimanche 12 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/94/34/20558741.jpg"
					}, {
						id: 2,
						title: "La chaîne américaine ABC commande 12 nouvelles séries",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/28/20560689.jpg"
					}, {
						id: 3,
						title: "La série adaptée de \"SHIELD\" de Marvel est commandée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/95/80/20559549.jpg"
					}, {
						id: 4,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 5,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 6,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 7,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						id: 8,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 9,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 10,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 11,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						id: 12,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 13,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 14,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 15,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						id: 16,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 17,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 18,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 19,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}
				]

		###*
		@override
		@inheritdoc
		###
		pageInit: ( event ) ->
			super event
			@handleMenuButton()
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
		Handle the menu button.
		###
		handleMenuButton: () ->
			# When tap on menu button, open menu panel
			@html.menuButton.on "tap", () ->
				menu = require "#menu"
				# Opening menu panel
				menu.toggleMenu()
				# Prevent bubbling
				return false

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
			news.on "tap", "li", ( event ) ->
				$selectedNews = $(event.currentTarget)
				# $thumbnail = $selectedNews.find ".thumbnail"
				# $thumbnail.addClass "squeeze"
				detailPage = require "#detail"
				newsId = $selectedNews.attr "data-news-id"
				# $thumbnail.one 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd', ->
				detailPage.navigate
					pageParams:
						id: newsId
					# callback: ->
					# 	$thumbnail.removeClass "squeeze"

				return false

		backButton: ( event ) ->
			super event
			log.i "Exiting app"
			navigator.app && navigator.app.exitApp && navigator.app.exitApp()



	module.exports = HomePageHandler

