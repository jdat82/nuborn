/* -- Provider -- */
goog.provide("nu.pages.PageEventsManager");

/* -- Imports -- */
goog.require("nu");

/**
 * @class nu.pages.PageEventsManager
 * Page events manager Class. <br/>
 * Used to dispatch jQuery Mobile page events.
 */
nu.pages.PageEventsManager = Object.subClass(
{
	/**
	 * Constructor.
	 */
	init: function()
	{
		// initializing members
		this.pageHandlers = {};
		this.currentPageHandler = null;
		this.previousPageHandler = null;

		// binding page events to the manager
		this.bindPageEvents();
	},

	/**
	 * Bind page events.
	 */
	bindPageEvents: function()
	{
		// Declaring page selector string
		var pageSelector = "[data-role=page]";
		// Binding all jQuery Mobile page events
		$(document).on("pagebeforecreate", pageSelector, this.pageBeforeCreate);
		$(document).on("pageinit", pageSelector, this.pageInit);
		$(document).on("pagecreate", pageSelector, this.pageCreate);
		$(document).on("pagebeforechange", pageSelector, this.pageBeforeChange);
		$(document).on("pagechange", pageSelector, this.pageChange);
		$(document).on("pagebeforeload", pageSelector, this.pageBeforeLoad);
		$(document).on("pageload", pageSelector, this.pageLoad);
		$(document).on("pagebeforehide", pageSelector, this.pageBeforeHide);
		$(document).on("pagebeforeshow", pageSelector, this.pageBeforeShow);
		$(document).on("pageremove", pageSelector, this.pageRemove);
		$(document).on("pagehide", pageSelector, this.pageHide);
		$(document).on("pageshow", pageSelector, this.pageShow);
	},

	/**
	 * Unbind page events.
	 */
	unbindPageEvent: function(){
		// Unbinding all jQuery Mobile page events
		$(document).off("pagebeforecreate");
		$(document).off("pageinit");
		$(document).off("pagecreate");
		$(document).off("pagebeforechange");
		$(document).off("pagebeforeload");
		$(document).off("pagebeforehide");
		$(document).off("pagebeforeshow");
		$(document).off("pageremove");
		$(document).off("pagehide");
		$(document).off("pageshow");
	},

	/**
	 * Page handlers have to register to the page events manager to be notified when jQuery Mobile page events are triggered.
	 * @param  {nu.pages.PageHandler} pageHandler
	 */
	registerPageHandler: function(pageHandler)
	{
		this.pageHandlers[pageHandler.settings.ID] = pageHandler;
	},

	/**
	 * Returns the page handler from the given ID.
	 * @param  {String} id
	 * @return {nu.pages.PageHandler}
	 */
	getPageHandler: function(id)
	{
		var pageHandler = this.pageHandlers[id];
		if(!pageHandler){
			console.log("-- Warning : no page handler for page '" + id + "' !");
		}
		return pageHandler;
	},

	/**
	 * Returns the page handler from a page event.
	 * @param  {Event} event
	 * @return {nu.pages.PageHandler}
	 */
	getPageHandlerFromEvent: function(event)
	{
		// getting the page on which the event has been triggered
		var page = event.currentTarget;
		// getting the page handler
		return this.getPageHandler(page.id);
	},

	/**
	 * Called for pagebeforecreate event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageBeforeCreate: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// registering the current active page handler as the previous one
		this.previousPageHandler = this.currentPageHandler;
		// registering new active page handler
		this.currentPageHandler = pageHandler;

		// dispatching the event to current active page handler
		pageHandler.pageBeforeCreate(event, data);
	},

	/**
	 * Called for pageinit event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageInit: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageInit(event, data);
	},

	/**
	 * Called for pagecreate event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageCreate: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageCreate(event, data);
	},

	/**
	 * Called for pagehide event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageHide: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageHide(event, data);
	},

	/**
	 * Called for pageremove event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageRemove: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageRemove(event, data);
	},

	/**
	 * Called for pagebeforeshow event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageBeforeShow: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		var u = $.mobile.path.parseUrl(page.baseURI);
		if (u.search)
		{
			if(!data.options)
			{
				data.options = {};
			}
			if (!data.options.dataUrl)
			{
				data.options.dataUrl = u.hrefNoSearch;
			}
			data.options.pageData = $.it.toolbox.getUrlParams(u.search);
		}

		// dispatching the event to current active page handler
		pageHandler.pageBeforeShow(event, data);
	},

	/**
	 * Called for pagebeforechange event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageBeforeChange: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageBeforeChange(event, data);
	},

	/**
	 * Called for pagechange event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageChange: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageChange(event, data);
	},

	/**
	 * Called for pagebeforeload event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageBeforeLoad: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageBeforeLoad(event, data);
	},

	/**
	 * Called for pageload event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageLoad: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageLoad(event, data);
	},

	/**
	 * Called for pageshow event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageShow: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageShow(event, data);
	},

	/**
	 * Called for pagebeforehide event.
	 * @param {Object} event
	 * @param {Object} data
	 */
	pageBeforeHide: function(event, data)
	{
		// getting page handler from the event
		var pageHandler = this.getPageHandlerFromEvent(event);
		// stop process if no page handler has been found
		if(!pageHandler) {
			return;
		}

		// dispatching the event to current active page handler
		pageHandler.pageBeforeHide(event, data);
	}

});

// Declaring the page events manager into the Nuborn namespace.
nu.pages.pageEventsManager = new nu.pages.PageEventsManager();
