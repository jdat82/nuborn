define "pages.PageEventsManager", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	log = require "#log"
	Utils = require "utils.Utils"
	NetworkUtils = require "utils.NetworkUtils"

	###*
	@class pages.PageEventsManager
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

			# Getting a reference to the page container
			$document = $( document );
			$window = $( window );

			# Binding all jQuery Mobile page events
			# $document.on( "pagebeforeload", pageSelector, $.proxy( this, "pageBeforeLoad" ) )
			# $document.on( "pagecontainerbeforeload", pageSelector, $.proxy( this, "pageBeforeLoad" ) )
			# $document.on( "pageload", pageSelector, $.proxy( this, "pageLoad" ) )
			# $document.on( "pagecontainerload", pageSelector, $.proxy( this, "pageLoad" ) )

			# $document.on( "pagebeforechange", pageSelector, $.proxy( this, "pageBeforeChange" ) )
			# $document.on( "pagechange", pageSelector, $.proxy( this, "pageChange" ) )

			$document.on( "pagebeforecreate", pageSelector, $.proxy( this, "pageBeforeCreate" ) )
			$document.on( "pagecreate", pageSelector, $.proxy( this, "pageCreate" ) )

			$document.on( "pagebeforeshow", pageSelector, $.proxy( this, "pageBeforeShow" ) )
			$document.on( "pageshow", pageSelector, $.proxy( this, "pageShow" ) )
			# $document.on( "pagecontainershow", pageSelector, $.proxy( this, "pageShow" ) )

			$document.on( "pagebeforehide", pageSelector, $.proxy( this, "pageBeforeHide" ) )
			$document.on( "pagehide", pageSelector, $.proxy( this, "pageHide" ) )
			# $document.on( "pagecontainerhide", pageSelector, $.proxy( this, "pageHide" ) )

			# $document.on( "pageremove", pageSelector, $.proxy( this, "pageRemove" ) )

			$document.on( "swipeleft", pageSelector, $.proxy( this, "swipeLeft" ) )
			$document.on( "swiperight", pageSelector, $.proxy( this, "swipeRight" ) )

			$document.on( "backbutton", $.proxy( this, "backButton" ) )
			$document.on( "menubutton", $.proxy( this, "menuButton" ) )

			window.onpopstate = $.proxy( this, "onPopState" )
			$window.on( "hashchange", $.proxy( this, "onHashChange" ) )
			$window.on( "navigate", $.proxy( this, "onNavigate" ) )

		###*
		Unbind page events.
		###
		unbindPageEvent: () ->

			# Getting a reference to the page container
			$document = $( document );
			$window = $( window );

			# Unbinding all jQuery Mobile page events
			# $document.off( "pagebeforeload" )
			# $document.off( "pagecontainerbeforeload" )
			# $document.off( "pageload" )
			# $document.off( "pagecontainerload" )

			# $document.off( "pagebeforechange" )
			# $document.off( "pagechange" )

			$document.off( "pagebeforecreate" )
			$document.off( "pagecreate" )

			$document.off( "pagebeforeshow" )
			$document.off( "pageshow" )
			# $document.off( "pagecontainershow" )

			$document.off( "pagebeforehide" )
			$document.off( "pagehide" )
			# $document.off( "pagecontainerhide" )

			# $document.off( "pageremove" )

			$document.off( "swipeleft" )
			$document.off( "swiperight" )

			$document.off( "backbutton" )
			$document.off( "menubutton" )

			window.onpopstate = null
			$window.off( "hashchange" )
			$window.off( "navigate" )

		###*
		Returns the page handler from the given id.
		@param  {String} id
		@return {pages.PageHandler}
		###
		getPageHandler: ( id ) ->

			return if not id

			pageHandler = require "##{id}"

			if !pageHandler
				return log.w "No page handler for page '#{id}' !"

			return pageHandler

		###*
		Returns the page handler from a page event.
		@param  {Event} event
		@return {pages.PageHandler}
		###
		getPageHandlerFromEvent: ( event ) ->
			# Getting the page on which the event has been triggered
			page = event.currentTarget
			# Getting the page handler
			return @getPageHandler page.id

		###
		Getter and Setter for the default page handler.
		###
		defaultPageHandler: ( pageHandler ) ->
			if pageHandler
				@_defaultPageHandler = pageHandler
			else
				return @_defaultPageHandler

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

			# Dispatching the event to current active page handler
			pageHandler.pageBeforeShow event, data

		###*
		Called for pagebeforechange event.
		@param {Object} event
		@param {Object} data
		###
		# pageBeforeChange: ( event, data ) ->
		# 	# Getting page handler from the event
		# 	pageHandler = @getPageHandlerFromEvent event
		# 	# Stop process if no page handler has been found
		# 	return if !pageHandler
		# 	# Dispatching the event to current active page handler
		# 	pageHandler.pageBeforeChange event, data

		###*
		Called for pagechange event.
		@param {Object} event
		@param {Object} data
		###
		# pageChange: ( event, data ) ->
		# 	# Getting page handler from the event
		# 	pageHandler = @getPageHandlerFromEvent event
		# 	# Stop process if no page handler has been found
		# 	return if !pageHandler
		# 	# Dispatching the event to current active page handler
		# 	pageHandler.pageChange event, data

		###*
		Called for pagebeforeload event.
		@param {Object} event
		@param {Object} data
		###
		# pageBeforeLoad: ( event, data ) ->
		# 	# Getting page handler from the event
		# 	pageHandler = @getPageHandlerFromEvent event
		# 	# Stop process if no page handler has been found
		# 	return if !pageHandler
		# 	# Dispatching the event to current active page handler
		# 	pageHandler.pageBeforeLoad event, data

		###*
		Called for pageload event.
		@param {Object} event
		@param {Object} data
		###
		# pageLoad: ( event, data ) ->
		# 	# Getting page handler from the event
		# 	pageHandler = @getPageHandlerFromEvent event
		# 	# Stop process if no page handler has been found
		# 	return if !pageHandler
		# 	# Dispatching the event to current active page handler
		# 	pageHandler.pageLoad event, data

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

		###
		Load first page from hash.
		@return false if no hash. True else.
		###
		startFromHash: () ->

			# hash.name contains current page id in url if any
			hash = NetworkUtils.deserializeHash()
			log.i "Starting from hash: #{Utils.toJSON hash}" if DEBUG

			pageId = hash.name
			pageHandler = @getPageHandler pageId

			return false if !pageHandler

			pageHandler.navigate
                urlParams: hash.params

			return true

		###*
		Intercept links which starts with a #.
		The page manager will load the linked template and navigate to it.
		###
		interceptHashLinks: () ->
			$(document).on "click", "a", ( event ) =>
				el = event.currentTarget
				log.i "Intercepted link '#{el.href}'" if DEBUG
				doNotIntercept = el.dataset.intercept is "false"
				if doNotIntercept
					log.i "Link will not be intercepted " if DEBUG
					return true
				return @navigateFromHash( el.href );

		###
		Parse a hash and navigate to it.
		###
		navigateFromHash: ( hashUrl ) ->

			hash = NetworkUtils.deserializeHash hashUrl

			# If it is not a hash link, nothing to do
			if !hash?.name
				log.i "Not a valid hash: #{Utils.toJSON hash}" if DEBUG
				if @_defaultPageHandler
					log.i "Found a default page handler: #{@_defaultPageHandler.settings.id}. Redirecting..." if DEBUG
					hash =
						name: @_defaultPageHandler.settings.id
				else
					return true

			DEBUG && log.i "Intercepted hash link: ##{hash.name}"
			pageHandler = require "##{hash.name}"

			if pageHandler
				pageHandler.navigate
                	urlParams: hash.params
				return false

			return true

		###
		Listening the popstate event to detect backward navigation in history.
		###
		onPopState: ( event ) ->
			log.i "============ POPSTATE ============" if TRACE
			console.log event if TRACE

		onHashChange: ( event ) ->
			log.i "============ HASHCHANGE ============" if TRACE
			console.log event if TRACE

		onNavigate: ( event ) ->
			log.i "============ NAVIGATE ============" if TRACE
			console.log event if TRACE
			# Getting the native javascript PopStateEvent state
			state = event.originalEvent.originalEvent.state
			# No state, no navigation
			return if not state
			log.i "Detected a backward history event" if DEBUG
			# Navigating back to the previous page
			return @navigateFromHash state.hash



	###*
	@singleton
	@property {pages.PageEventsManager} instance The shared instance of PageEventsManager
	###
	PageEventsManager.instance = new PageEventsManager()



	module.exports = PageEventsManager

