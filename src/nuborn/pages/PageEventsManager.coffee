define "nu.pages.PageEventsManager", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	Utils = require "nu.Utils"

	###*
	@class nu.pages.PageEventsManager
	Page events manager Class. <br/>
	Used to dispatch jQuery Mobile page events.
	###
	class PageEventsManager

		###*
		@constructor
		Creates a new Page Events Manager.
		###
		constructor: () ->
			@currentPageHandler = null
			@previousPageHandler = null

			# Binding page events to the manager
			@bindPageEvents()
			@interceptHashLinks()

		###*
		Bind page events.
		###
		bindPageEvents: () ->
			# Declaring page selector string
			pageSelector = "[data-role=page]"

			# Binding all jQuery Mobile page events
			$document = $(document)
			$document.on "pagebeforecreate", pageSelector, $.proxy( this, "pageBeforeCreate" )
			$document.on "pageinit", pageSelector, $.proxy( this, "pageInit" )
			$document.on "pagecreate", pageSelector, $.proxy( this, "pageCreate" )
			$document.on "pagebeforechange", pageSelector, $.proxy( this, "pageBeforeChange" )
			$document.on "pagechange", pageSelector, $.proxy( this, "pageChange" )
			$document.on "pagebeforeload", pageSelector, $.proxy( this, "pageBeforeLoad" )
			$document.on "pageload", pageSelector, $.proxy( this, "pageLoad" )
			$document.on "pagebeforehide", pageSelector, $.proxy( this, "pageBeforeHide" )
			$document.on "pagebeforeshow", pageSelector, $.proxy( this, "pageBeforeShow" )
			# $document.on "pageremove", pageSelector, $.proxy(this, "pageRemove")
			$document.on "pagehide", pageSelector, $.proxy( this, "pageHide" )
			$document.on "pageshow", pageSelector, $.proxy( this, "pageShow" )
			$document.on "swipeleft", pageSelector, $.proxy( this, "swipeLeft" )
			$document.on "swiperight", pageSelector, $.proxy( this, "swipeRight" )
			$document.on "backbutton", $.proxy( this, "backButton" )
			$document.on "menubutton", $.proxy( this, "menuButton" )

		###*
		Unbind page events.
		###
		unbindPageEvent: () ->
			# Unbinding all jQuery Mobile page events
			$document = $(document)
			$document.off "pagebeforecreate"
			$document.off "pageinit"
			$document.off "pagecreate"
			$document.off "pagechange"
			$document.off "pageload"
			$document.off "pagebeforechange"
			$document.off "pagebeforeload"
			$document.off "pagebeforehide"
			$document.off "pagebeforeshow"
			# $document.off "pageremove"
			$document.off "pagehide"
			$document.off "pageshow"
			$document.off "swipeleft"
			$document.off "swiperight"
			$document.off "backbutton"
			$document.off "menubutton"

		###*
		Page handlers have to register to the page events manager to be notified when jQuery Mobile page events are triggered.
		@param  {nu.pages.PageHandler} pageHandler
		###
		# registerPageHandler: function ( pageHandler ) {
		# 	if ( !pageHandler || !pageHandler.settings || !pageHandler.settings.id )
		# 		return
		# 	if ( pageHandler.settings[ "default" ] )
		# 		@defaultPageHandler = pageHandler
		# 	else
		# 		@pageHandlers[ pageHandler.settings.id ] = pageHandler
		# },

		###*
		Returns the page handler from the given id.
		@param  {String} id
		@return {nu.pages.PageHandler}
		###
		getPageHandler: ( id ) ->

			try
				pageHandler = require "##{id}"
			catch exception

			if !pageHandler && !@defaultPageHandler
				return log.w "No page handler for page '#{id}' !"

			if !pageHandler && @defaultPageHandler
				return @defaultPageHandler

			return pageHandler

		###*
		Returns the page handler from a page event.
		@param  {Event} event
		@return {nu.pages.PageHandler}
		###
		getPageHandlerFromEvent: ( event ) ->
			# Getting the page on which the event has been triggered
			page = event.currentTarget
			# Getting the page handler
			return @getPageHandler page.id

		###*
		Load first page.
		@param {String} defaultPageId Default page ID to use if no ID in current URL.
		###
		loadFirstPage: ( defaultPageId ) ->

			# Hash.name contains current page id if filled
			hash = Utils.deserializeHash()
			pageId = hash.name || defaultPageId
			log.i "First page is: #{pageId}" if DEBUG

			pageHandler = @getPageHandler pageId

			if pageHandler
				if !window.location.hash then window.location.hash = "##{pageId}"
				# Memorizing first page handler to handle splashscreen removal
				pageHandler.data.isFirst = true
				# Loading page into DOM
				pageHandler.navigate
					pageParams: hash.params

		###*
		Called for pagebeforecreate event.
		@param {Object} event
		###
		pageBeforeCreate: ( event ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler

			# For prototype page handlers, the pagebeforecreate event is always invoked
			if !pageHandler.settings.singleton
				# Registering the current active page handler as the previous one
				@previousPageHandler = @currentPageHandler
				# Registering new active page handler
				@currentPageHandler = pageHandler

			# Dispatching the event to current active page handler
			pageHandler.pageBeforeCreate event

		###*
		Called for pageinit event.
		@param {Object} event
		###
		pageInit: ( event ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.pageInit event

		###*
		Called for pagecreate event.
		@param {Object} event
		###
		pageCreate: ( event ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.pageCreate event

		###*
		Called for pagehide event.
		@param {Object} event
		@param {Object} data
		###
		pageHide: ( event, data ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.pageHide event, data

		###*
		Called for pageremove event.
		@param {Object} event
		@param {Object} data
		###
		# pageRemove: function (event, data) {
		# 	# getting page handler from the event
		# 	pageHandler = @getPageHandlerFromEvent(event)
		# 	# stop process if no page handler has been found
		# 	if (!pageHandler) {
		# 		return
		# 	}

		# 	# dispatching the event to current active page handler
		# 	pageHandler.pageRemove(event, data)
		# },

		###*
		Called for pagebeforeshow event.
		@param {Object} event
		@param {Object} data
		###
		pageBeforeShow: ( event, data ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler

			# For singleton page handlers, the pagebeforecreate event is invoked only once, so we dit it in the pagebeforeshow event.
			if pageHandler.settings.singleton
				# Registering the current active page handler as the previous one
				@previousPageHandler = @currentPageHandler
				# Registering new active page handler
				@currentPageHandler = pageHandler

			page = event.currentTarget

			# Dispatching the event to current active page handler
			pageHandler.pageBeforeShow event, data

		###*
		Called for pagebeforechange event.
		@param {Object} event
		@param {Object} data
		###
		pageBeforeChange: ( event, data ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.pageBeforeChange event, data

		###*
		Called for pagechange event.
		@param {Object} event
		@param {Object} data
		###
		pageChange: ( event, data ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.pageChange event, data

		###*
		Called for pagebeforeload event.
		@param {Object} event
		@param {Object} data
		###
		pageBeforeLoad: ( event, data ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.pageBeforeLoad event, data

		###*
		Called for pageload event.
		@param {Object} event
		@param {Object} data
		###
		pageLoad: ( event, data ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.pageLoad event, data

		###*
		Called for pageshow event.
		@param {Object} event
		@param {Object} data
		###
		pageShow: ( event, data ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.pageShow event, data

		###*
		Called for pagebeforehide event.
		@param {Object} event
		@param {Object} data
		###
		pageBeforeHide: ( event, data ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.pageBeforeHide event, data

		###*
		Called for swipeleft event.
		@param {Object} event
		###
		swipeLeft: ( event ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.swipeLeft event

		###*
		Called for swiperight event.
		@param {Object} event
		###
		swipeRight: ( event ) ->
			# Getting page handler from the event
			pageHandler = @getPageHandlerFromEvent event
			# Stop process if no page handler has been found
			return if !pageHandler
			# Dispatching the event to current active page handler
			pageHandler.swipeRight event

		backButton: ( event ) ->
			# "backbutton" is sent by phonegap and page independent
			pageHandler = @currentPageHandler

			# Dispatching the event to current active page handler
			pageHandler.backButton event

		menuButton: ( event ) ->
			# "menubutton" is sent by phonegap and page independent
			pageHandler = @currentPageHandler

			# Dispatching the event to current active page handler
			pageHandler.menuButton event

		###*
		Intercept links which starts with a #.
		The page manager will load the linked template and navigate to it.
		###
		interceptHashLinks: () ->

			$document = $(document)
			$document.on "click", "a", ( event ) ->

				el = event.currentTarget
				log.i "Intercepted link '#{el.href}'" if DEBUG
				hash = Utils.deserializeHash el.href
				preventDefault = el.dataset.intercept is "false"
				log.i "Link will not be intercepted " if preventDefault and DEBUG

				# If it is not a hash link, nothing to do
				if !hash?.name?.length || preventDefault
					event.preventDefault()
					return false

				log.i "intercepted hash link: ##{hash.name}" if DEBUG
				pageHandler = require "##{hash.name}"
				if pageHandler
					pageHandler.navigate
						pageParams: hash.params
					event.preventDefault()
					return false

	###*
	@singleton
	@property {nu.pages.PageEventsManager} instance The shared instance of PageEventsManager
	###
	PageEventsManager.instance = new PageEventsManager()



	module.exports = PageEventsManager

