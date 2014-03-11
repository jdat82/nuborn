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
			@_defaultPageHandler = null
			@pageHandlers = {}

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
			# $document.on "pagebeforeload", pageSelector, @pageBeforeLoad.bind(@)
			# $document.on "pagecontainerbeforeload", pageSelector, @pageBeforeLoad.bind(@)
			# $document.on "pageload", pageSelector, @pageLoad.bind(@)
			# $document.on "pagecontainerload", pageSelector, @pageLoad.bind(@)

			# $document.on "pagebeforechange", pageSelector, @pageBeforeChange.bind(@)
			# $document.on "pagechange", pageSelector, @pageChange.bind(@)

			$document.on "pagebeforecreate", pageSelector, @pageBeforeCreate.bind(@)
			$document.on "pagecreate", pageSelector, @pageCreate.bind(@)

			$document.on "pagebeforeshow", pageSelector, @pageBeforeShow.bind(@)
			$document.on "pageshow", pageSelector, @pageShow.bind(@)
			# $document.n( "pagecontainershow", pageSelector, @pageShow.bind(@)

			$document.on "pagebeforehide", pageSelector, @pageBeforeHide.bind(@)
			$document.on "pagehide", pageSelector, @pageHide.bind(@)
			# $document.n( "pagecontainerhide", pageSelector, @pageHide.bind(@)

			# $document.n( "pageremove", pageSelector, @pageRemove.bind(@)

			$document.on "swipeleft", pageSelector, @swipeLeft.bind(@)
			$document.on "swiperight", pageSelector, @swipeRight.bind(@)

			$document.on "backbutton", @backButton.bind(@)
			$document.on "menubutton", @menuButton.bind(@)

			$document.on "pause", @pause.bind(@)
			$document.on "resume", @resume.bind(@)

			window.onpopstate = @onPopState.bind(@)
			$window.on "hashchange", @onHashChange.bind(@)
			$window.on "navigate", @onNavigate.bind(@)

		###*
		Unbind page events.
		###
		unbindPageEvent: () ->

			# Getting a reference to the page container
			$document = $( document );
			$window = $( window );

			# Unbinding all jQuery Mobile page events
			# $document.off "pagebeforeload"
			# $document.off "pagecontainerbeforeload"
			# $document.off "pageload"
			# $document.off "pagecontainerload"

			# $document.off "pagebeforechange"
			# $document.off "pagechange"

			$document.off "pagebeforecreate"
			$document.off "pagecreate"

			$document.off "pagebeforeshow"
			$document.off "pageshow"
			# $document.off "pagecontainershow"

			$document.off "pagebeforehide"
			$document.off "pagehide"
			# $document.off "pagecontainerhide"

			# $document.off "pageremove"

			$document.off "swipeleft"
			$document.off "swiperight"

			$document.off "backbutton"
			$document.off "menubutton"

			window.onpopstate = null
			$window.off "hashchange"
			$window.off "navigate"

		###
		Register a new page handler that listen to a specific hash.
		###
		registerPageHandler: (pageHandler) ->
			return if not pageHandler
			id = pageHandler.settings.id
			if not id
				log.w "Page handler subscription not accepted ; invalid id: '#{id}'" if WARN
				return
			@pageHandlers[id] = pageHandler
			if pageHandler.settings.default
				@_defaultPageHandler = pageHandler

		###*
		Returns the page handler from the given id.
		@param  {String} id
		@return {pages.PageHandler}
		###
		getPageHandler: ( id ) ->

			return if not id

			pageHandler = @pageHandlers[id]

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

		###*
		Cordova only.
		Android only.
		Event triggered when pressing the device physical back button.
		@param {Object} event
		###
		backButton: ( event ) ->
			# "backbutton" is sent by phonegap and page independent
			pageHandler = @currentPageHandler

			# Dispatching the event to current active page handler
			pageHandler.backButton event

		###*
		Cordova only.
		Android only.
		Event triggered when pressing the device physical menu button.
		@param {Object} event
		###
		menuButton: ( event ) ->
			# "menubutton" is sent by phonegap and page independent
			pageHandler = @currentPageHandler

			# Dispatching the event to current active page handler
			pageHandler.menuButton event

		###*
		Cordova only.
		Triggered when the application goes to background. Needs the Events plugin.
		@param {Object} event
		###
		pause: ( event ) ->
			# "pause" is sent by phonegap and page independent
			pageHandler = @currentPageHandler

			# Dispatching the event to current active page handler
			pageHandler.pause event

		###*
		Cordova only.
		Triggered when the application goes to foreground. Needs the Events plugin.
		@param {Object} event
		###
		resume: ( event ) ->
			# "pause" is sent by phonegap and page independent
			pageHandler = @currentPageHandler

			# Dispatching the event to current active page handler
			pageHandler.resume event

		###
		Load first page from hash.
		@return false if no hash found. True else. If no hash in url and a default page handler is known, it is used instead.
		###
		startFromHash: () ->

			# hash.name contains current page id in url if any
			hash = NetworkUtils.deserializeHash()

			pageId = hash.name
			pageHandler = @getPageHandler pageId

			if not pageHandler then pageHandler = @defaultPageHandler()
			return false if not pageHandler

			log.i "Starting from hash: #{Utils.toJSON hash}" if DEBUG
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
			debugger;
			pageHandler = @pageHandlers[hash.name]

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
			log.i "Detected a history event" if DEBUG
			# Navigating back to the previous page
			return @navigateFromHash state.hash



	module.exports = PageEventsManager


###
Shared instance.
###
define "#pagesManager", ( require, exports, module ) ->

	'use strict'

	PageEventsManager = require "pages.PageEventsManager"
	module.exports = new PageEventsManager
