/* -- Provider -- */
goog.provide("nu.pages.PageHandler");

/* -- Imports -- */
goog.require("nu.pages.PageEventsManager");

/**
 * @class nu.pages.PageHandler
 * Handle lifecycle of jQuery Mobile pages.
 */
nu.pages.PageHandler = Object.subClass(
{

	/**
	 * @constructor
	 * Creates a new Page Handler.
	 * @param  {Object} settings    The settings of the page handler (ID, URL, ...).
	 */
	init: function(settings)
	{
		// Declaring class members
		// Settings : object containing ID and URL or a jQuery Mobile page
		this.settings = $.extend(true, {}, settings);
		// Html : Object containing jQuery Object referencing to HTML elements of the page
		this.html = {};
		// Data : data of the page
		this.data = {};

		// Regitsering 
		nu.pages.PageEventsManager.sharedManager().registerPageHandler(this);
	},

	/**
	 * Called for the pagebeforecreate event. <br/>
	 * Also register page into HTML elements.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageBeforeCreate: function(event, data)
	{
		// Registering the page into HTML elements
		var page = event.currentTarget;
		this.html.page = $(page);

		// inserting wordings on current page
		// $.it.wordings.update(page);

		// using right image resolution depending on device
		// $.it.rimages.update(page);
	},


	/**
	 * Called for the pageinit event. <br/>
	 * Also create Html Elements & Data objects.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageInit: function(event, data)
	{
		console.log("page init of " + event.currentTarget.id);

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
	pageCreate: function(event, data)
	{
		console.log("page create of '" + event.currentTarget.id + "'");
	},

	/**
	 * Called for the pagebeforehide event.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageBeforeHide: function(event, data)
	{
		console.log("page before hide of '" + event.currentTarget.id + "'");
	},

	/**
	 * Called for the pagehide event.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageHide: function(event, data)
	{
		console.log("page hide of '" + event.currentTarget.id + "'");
	},

	/**
	 * Called for the pagebeforeshow event.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageBeforeShow: function(event, data)
	{
		console.log("page before show of '" + event.currentTarget.id + "'");
	},

	/**
	 * Called for the pageshow event.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageShow: function(event, data)
	{
		console.log("page show of '" + event.currentTarget.id + "'");
	},

	/**
	 * Called for the pagebeforechange event.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageBeforeChange: function(event, data)
	{
		console.log("page before change of '" + event.currentTarget.id + "'");
	},

	/**
	 * Called for the pagechange event.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageChange: function(event, data)
	{
		console.log("page change of '" + event.currentTarget.id + "'");
	},

	/**
	 * Called for the pagebeforeload event.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageBeforeLoad: function(event, data)
	{
		console.log("page before load of '" + event.currentTarget.id + "'");
	},

	/**
	 * Called for the pageLoad event.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageLoad: function(event, data)
	{
		console.log("page load of '" + event.currentTarget.id + "'");
	},

	/**
	 * Called for the pageremove event. <br/>
	 * Also clean references to HTML elements & Data Objects.
	 * @param  {Object} event
	 * @param  {Object} data
	 */
	pageRemove: function(event, data)
	{
		console.log("page remove of '" + event.currentTarget.id + "'");

		// Cleaning references to HTML elements & data objects
		this.deleteHtmlElements();
		this.deleteDataElements();
	},

	/**
	 * Create all references to HTML elements.
	 */
	createHtmlElements: function()
	{
		nu.debug.Log.w("This method should be overriden");
	},

	/**
	 * Create all references to data objects.
	 */
	createDataElements: function()
	{
		nu.debug.Log.w("This method should be overriden");
	},

	/**
	 * Delete all references to HTML elements.
	 */
	deleteHtmlElements: function()
	{
		if (this.html){
			for(var key in this.html){
				delete this.html[key];
			}
		}
	},

	/**
	 * Delete all references to data objects.
	 */
	deleteDataElements: function()
	{
		if (this.data){
			for(var key in this.data){
				delete this.data[key];
			}
		}
	}

});