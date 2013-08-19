(function ($, nu, log, undefined) {

	/**
	 * @class nu.pages.PageHandler
	 *
	 * Handle lifecycle of jQuery Mobile pages.
	 * Defaults PageHandler instances are prototype which means
	 * every time you change the page, the page is considered to be removed
	 * from the DOM. If you use data-dom-cache or any technique to keep the page
	 * in the DOM, set "singleton" to true in the settings.
	 *
	 * @provide nu.pages.PageHandler
	 *
	 * @require nu.pages.PageEventsManager
	 */
	nu.pages.PageHandler = Object.subClass({

		/**
		 * Initialize a fresh new Page Handler.
		 * @param {Object} settings    The settings of the page handler (ID, URL, ...).
		 */
		init: function (settings) {
			// Declaring class members
			// Settings : object containing ID and URL or a jQuery Mobile page
			this.settings = $.extend(true, {
				singleton: false
			}, settings);
			// Html : Object containing jQuery Object referencing to HTML elements of the page
			this.html = {};
			// Data : data of the page
			this.data = {};

			// Regitsering
			nu.pages.PageEventsManager.get().registerPageHandler(this);
		},

		/**
		 * Called for the pagebeforecreate event. <br/>
		 * Also register page into HTML elements.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageBeforeCreate: function (event, data) {
			// Registering the page into HTML elements
			var page = event.currentTarget;
			this.html.page = $(page);

			// TODO inserting wordings on current page
			// $.it.wordings.update(page);

			// TODO using right image resolution depending on device
			// $.it.rimages.update(page);
		},


		/**
		 * Called for the pageinit event. <br/>
		 * Also create Html Elements & Data objects.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageInit: function (event, data) {
			debug && log.i("page init of " + event.currentTarget.id);

			// Calling #createHtmlElements
			this.createHtmlElements();

			// Calling #createDataElements if exists
			this.createDataElements();

		},

		/**
		 * Called for the pagecreate event.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageCreate: function (event, data) {
			debug && log.i("page create of '" + event.currentTarget.id + "'");
		},

		/**
		 * Called for the pagebeforehide event.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageBeforeHide: function (event, data) {
			debug && log.i("page before hide of '" + event.currentTarget.id + "'");
		},

		/**
		 * Called for the pagehide event.
		 * Also clean references to HTML elements & Data Objects in prototype mode,
		 * i.e. when page is removed each time we go away.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageHide: function (event, data) {
			debug && log.i("page hide of '" + event.currentTarget.id + "'");

			if (!this.settings.singleton) {
				// Cleaning references to HTML elements & data objects
				// as they will be recreated every time we go back to the page
				this.html.page.remove();
				this.deleteHtmlElements();
				this.deleteDataElements();
			}
		},

		/**
		 * Called for the pagebeforeshow event.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageBeforeShow: function (event, data) {
			debug && log.i("page before show of '" + event.currentTarget.id + "'");
		},

		/**
		 * Called for the pageshow event.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageShow: function (event, data) {
			debug && log.i("page show of '" + event.currentTarget.id + "'");
		},

		/**
		 * Called for the pagebeforechange event.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageBeforeChange: function (event, data) {
			debug && log.i("page before change of '" + event.currentTarget.id + "'");
		},

		/**
		 * Called for the pagechange event.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageChange: function (event, data) {
			debug && log.i("page change of '" + event.currentTarget.id + "'");
		},

		/**
		 * Called for the pagebeforeload event.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageBeforeLoad: function (event, data) {
			debug && log.i("page before load of '" + event.currentTarget.id + "'");
		},

		/**
		 * Called for the pageLoad event.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageLoad: function (event, data) {
			debug && log.i("page load of '" + event.currentTarget.id + "'");
		},

		/**
		 * Called for the pageremove event. <br/>
		 * Also clean references to HTML elements & Data Objects in prototype mode,
		 * i.e. when page is removed each time we go away.
		 * @param  {Object} event
		 * @param  {Object} data
		 */
		pageRemove: function (event, data) {
			debug && log.i("page remove of '" + event.currentTarget.id + "'");
		},

		/**
		 * Create all references to HTML elements.
		 */
		createHtmlElements: function () {
			nu.debug.Log.w("This method should be overriden");
		},

		/**
		 * Create all references to data objects.
		 */
		createDataElements: function () {
			nu.debug.Log.w("This method should be overriden");
		},

		/**
		 * Delete all references to HTML elements.
		 */
		deleteHtmlElements: function () {
			if (this.html) {
				for (var key in this.html) {
					delete this.html[key];
				}
			}
		},

		/**
		 * Delete all references to data objects.
		 */
		deleteDataElements: function () {
			if (this.data) {
				for (var key in this.data) {
					delete this.data[key];
				}
			}
		},


		/**
		 * Utility method to navigate from one page to another
		 * If the page handler has an id and we found a javascript template for it, we use it.
		 * Else, if the page handler has a url, we use that instead.
		 * Else error.
		 * @param {Object} options [jQuery Mobile #changePage options][1]
		 * @param {Object} data template placeholders values
		 * [1]: http://api.jquerymobile.com/jQuery.mobile.changePage/
		 */
		navigate: function (options, data) {

			if (!this.settings) throw "invalid page handler";

			var pageId = this.settings.id;
			var pageUrl = this.settings.url;

			if (pageId && templates[pageId]) {
				if (document.getElementById(pageId) === null) {
					// at least, we add the page to the DOM
					$(templates[pageId].render(data)).appendTo("body");
				}
				// plus if JQM is initialized, we navigate to it
				if (app.isJqmInitialized) {
					debug && log.i("navigating to " + pageId + " page");
					$.mobile.changePage("#" + pageId, options);
				}
				// else we do nothing waiting for $.mobile.initializePage to be called
				else {
					debug && log.i("loading " + pageId + " page");
				}
				return true;
			}

			if (pageUrl) {
				debug && log.i("navigating to " + pageUrl);
				$.mobile.changePage(pageUrl, options);
				return true;
			}

			throw "This page handler has neither a valid page id nor a valid url";
		}

	});

})(jQuery, nu, nu.debug.Log)