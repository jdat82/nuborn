(function ($, nu, log, undefined)
{

	/**
	 * @class nu.pages.PageEventsManager
	 * @singleton
	 *
	 * Page events manager Class. <br/>
	 * Used to dispatch jQuery Mobile page events.
	 *
	 * @provide nu.pages.PageEventsManager
	 *
	 * @require nu.pages
	 * @require nu.debug.Log
	 */
	nu.pages.PageEventsManager = Object.subClass(
	{
		/**
		 * @constructor
		 * Creates a new Page Events Manager.
		 */
		init: function ()
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
		bindPageEvents: function ()
		{
			// Declaring page selector string
			var pageSelector = "[data-role=page]";
			// Binding all jQuery Mobile page events
			$(document).on("pagebeforecreate", pageSelector, $.proxy(this, "pageBeforeCreate"));
			$(document).on("pageinit", pageSelector, $.proxy(this, "pageInit"));
			$(document).on("pagecreate", pageSelector, $.proxy(this, "pageCreate"));
			$(document).on("pagebeforechange", pageSelector, $.proxy(this, "pageBeforeChange"));
			$(document).on("pagechange", pageSelector, $.proxy(this, "pageChange"));
			$(document).on("pagebeforeload", pageSelector, $.proxy(this, "pageBeforeLoad"));
			$(document).on("pageload", pageSelector, $.proxy(this, "pageLoad"));
			$(document).on("pagebeforehide", pageSelector, $.proxy(this, "pageBeforeHide"));
			$(document).on("pagebeforeshow", pageSelector, $.proxy(this, "pageBeforeShow"));
			// $(document).on("pageremove", pageSelector, $.proxy(this, "pageRemove"));
			$(document).on("pagehide", pageSelector, $.proxy(this, "pageHide"));
			$(document).on("pageshow", pageSelector, $.proxy(this, "pageShow"));
			$(document).on("swipeleft", pageSelector, $.proxy(this, "swipeLeft"));
			$(document).on("swiperight", pageSelector, $.proxy(this, "swipeRight"));
		},

		/**
		 * Unbind page events.
		 */
		unbindPageEvent: function ()
		{
			// Unbinding all jQuery Mobile page events
			$(document).off("pagebeforecreate");
			$(document).off("pageinit");
			$(document).off("pagecreate");
			$(document).off("pagebeforechange");
			$(document).off("pagebeforeload");
			$(document).off("pagebeforehide");
			$(document).off("pagebeforeshow");
			// $(document).off("pageremove");
			$(document).off("pagehide");
			$(document).off("pageshow");
		},

		/**
		 * Page handlers have to register to the page events manager to be notified when jQuery Mobile page events are triggered.
		 * @param  {nu.pages.PageHandler} pageHandler
		 */
		registerPageHandler: function (pageHandler)
		{
			this.pageHandlers[pageHandler.settings.id] = pageHandler;
		},

		/**
		 * Returns the page handler from the given id.
		 * @param  {String} id
		 * @return {nu.pages.PageHandler}
		 */
		getPageHandler: function (id)
		{
			var pageHandler = this.pageHandlers[id];
			if (!pageHandler)
			{
				log.w("-- Warning : no page handler for page '" + id + "' !");
			}
			return pageHandler;
		},

		/**
		 * Returns the page handler from a page event.
		 * @param  {Event} event
		 * @return {nu.pages.PageHandler}
		 */
		getPageHandlerFromEvent: function (event)
		{
			// getting the page on which the event has been triggered
			var page = event.currentTarget;
			// getting the page handler
			return this.getPageHandler(page.id);
		},

		/**
		 * Load first page.
		 * @param {String} defaultPageId Default page ID to use if no ID in current URL.
		 */
		loadFirstPage: function (defaultPageId)
		{
			// TODO passer les paramètres d'URL à la page et gérer suppression du splash screen
			// car seul la home aujourd'hui sait se débarrasser du splashscreen
			var parser = $.mobile.path.parseUrl(window.location.href);
			var pageId = parser.hash;
			debug && log.i("First page is: " + (pageId || defaultPageId));
			if (pageId)
				pageId = pageId.replace("#", "");
			var pageParams = parser.search;
			debug && log.i("Page params: " + nu.Utils.toJSON(nu.Utils.getUrlParams(pageParams)));

			var pageHandler = this.getPageHandler(pageId || defaultPageId);
			if (pageHandler)
			{
				pageHandler.navigate();
			}
		},

		/**
		 * Called for pagebeforecreate event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageBeforeCreate: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
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
		pageInit: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
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
		pageCreate: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
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
		pageHide: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
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
		// pageRemove: function (event, data) {
		// 	// getting page handler from the event
		// 	var pageHandler = this.getPageHandlerFromEvent(event);
		// 	// stop process if no page handler has been found
		// 	if (!pageHandler) {
		// 		return;
		// 	}

		// 	// dispatching the event to current active page handler
		// 	pageHandler.pageRemove(event, data);
		// },

		/**
		 * Called for pagebeforeshow event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageBeforeShow: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
				return;
			}

			var page = event.currentTarget;

			data = nu.Utils.fillUrlParams(page, data);

			// dispatching the event to current active page handler
			pageHandler.pageBeforeShow(event, data);
		},

		/**
		 * Called for pagebeforechange event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageBeforeChange: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
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
		pageChange: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
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
		pageBeforeLoad: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
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
		pageLoad: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
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
		pageShow: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
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
		pageBeforeHide: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.pageBeforeHide(event, data);
		},

		/**
		 * Called for swipeleft event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		swipeLeft: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.swipeLeft(event, data);
		},

		/**
		 * Called for swiperight event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		swipeRight: function (event, data)
		{
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent(event);
			// stop process if no page handler has been found
			if (!pageHandler)
			{
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.swipeRight(event, data);
		}

	});

	/**
	 * Gets the shared instance of PageEventsManager class.
	 * @return {nu.pages.PageEventsManager} The shared instance of Page Events Manager
	 *
	 * @static
	 * @method get
	 */
	nu.pages.PageEventsManager.get = function ()
	{
		if (!nu.pages.PageEventsManager.SINGLETON_INSTANCE)
		{
			nu.pages.PageEventsManager.SINGLETON_INSTANCE = new nu.pages.PageEventsManager();
		}
		return nu.pages.PageEventsManager.SINGLETON_INSTANCE;
	};

})(jQuery, nu, nu.debug.Log)