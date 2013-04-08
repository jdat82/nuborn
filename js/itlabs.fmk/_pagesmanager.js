
var PagesManager = Object.subClass(
{
	// constructeur
	init: function()
	{
		this.pageHandlers = {};
		this.currentPageHandler = null;
		this.previousPageHandler = null;
	},

	// chaque page peut enregistrer son PageHandler pour être notifiée lors du cycle de vie de la page
	registerPageHandler: function(ph)
	{
		this.pageHandlers[ph.settings.ID] = ph;
	},


	getPageHandler: function(id)
	{
		var ph = this.pageHandlers[id];
		if(!ph){
			console.log("warning: no PageHandler for page '" + id + "'");
		}
		return ph;
	},


	pageBeforeCreate: function(event, data)
	{
		var page = event.currentTarget;

		// target page handler
		var ph = this.getPageHandler(page.id);
		if(!ph) return;

		this.previousPageHandler = this.currentPageHandler;
		this.currentPageHandler = ph;

		ph.pageBeforeCreate(event, data);
	},


	pageInit: function(event, data)
	{
		var page = event.currentTarget;

		// target page handler
		var ph = this.getPageHandler(page.id);

		if(!ph)
			return;

		ph.pageInit(event, data);
	},


	pageCreate: function(event, data)
	{
		var page = event.currentTarget;

		// target page handler
		var ph = this.getPageHandler(page.id);

		if(!ph)
			return;

		ph.pageCreate(event, data);
	},


	pageHide: function(event, data)
	{
		var page = event.currentTarget;

		// target page handler
		var ph = this.getPageHandler(page.id);

		if(!ph)
			return;

		ph.pageHide(event, data);
	},


	pageRemove: function(event, data)
	{
		var page = event.currentTarget;

		// target page handler
		var ph = this.getPageHandler(page.id);

		if(!ph)
			return;

		ph.pageRemove(event, data);
	},


	pageBeforeShow: function(event, data)
	{
		var page = event.currentTarget;

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

		// target page handler
		var ph = this.getPageHandler(page.id);

		if(!ph)
			return;

		ph.pageBeforeShow(event, data);
	},


	pageBeforeChange: function(event, data)
	{
		// if(this.preventChangeToSplashscreen()){
		//	return;
		// }

		var page = event.currentTarget;

		// target page handler
		var ph = this.getPageHandler(page.id);

		if(!ph)
			return;

		ph.pageBeforeChange(event, data);
	},


	// preventChangeToSplashscreen: function(event, data)
	// {
	//	console.log("#### in prevent");
	//	var to = data.toPage,
	//	from = data.options.fromPage;

	//	if (typeof to === 'string')
	//	{
	//		var u = $.mobile.path.parseUrl(to);
	//		to = u.hash || '#' + u.pathname.substring(1);
	//		if (from) from = '#' + from.attr('id');

	//		if (to === $.app.splashscreenPH.settings.ID)
	//		{
	//			console.log('#### Cannot change to splashscreen');
	//			e.preventDefault();
	//			return true;
	//		}
	//	}
	//},


	pageBeforeLoad: function(event, data)
	{
		var page = event.currentTarget;

		// target page handler
		var ph = this.getPageHandler(page.id);

		if(!ph)
			return;

		ph.pageBeforeLoad(event, data);
	},


	pageShow: function(event, data)
	{
		var page = event.currentTarget;

		// target page handler
		var ph = this.getPageHandler(page.id);

		if(!ph)
			return;

		ph.pageShow(event, data);
	},


	pageBeforeHide: function(event, data)
	{
		var page = event.currentTarget;

		// target page handler
		var ph = this.getPageHandler(page.id);

		if(!ph)
			return;

		ph.pageBeforeHide(event, data);
	},


	// called when application come back from background (cordova only)
	resume: function(event)
	{
		console.log("resuming application");

		if($.app.resume) {
			$.app.resume();
		}

		// forwarded to current page handler
		var ph = this.currentPageHandler;

		if(!ph)
			return;

		ph.resume(event);
	},


	// called when application come back from background (cordova only)
	pause: function(event)
	{
		console.log("pausing application");

		if($.app.pause) {
			$.app.pause();
		}

		// forwarded to current page handler
		var ph = this.currentPageHandler;

		if(!ph)
			return;

		ph.pause(event);
	},


	// called when orientation change on page
	orientationChange: function(event)
	{
		console.log("orientation change");

		// forwarded to current page handler
		var ph = this.currentPageHandler;

		if(!ph)
			return;

		ph.orientationChange(event);
	}

});


// enregistrement dans le namespace IT&L@bs
$.it.pagesManager = new PagesManager();


// abonnement aux évènements de page pour dispatch
var pageSelector = "[data-role=page]";
$(document).on("pagebeforecreate", pageSelector, $.proxy($.it.pagesManager, "pageBeforeCreate"));
$(document).on("pageinit", pageSelector, $.proxy($.it.pagesManager, "pageInit"));
$(document).on("pagecreate", pageSelector, $.proxy($.it.pagesManager, "pageCreate"));
$(document).on("pagebeforechange", pageSelector, $.proxy($.it.pagesManager, "pageBeforeChange"));
$(document).on("pagebeforeload", pageSelector, $.proxy($.it.pagesManager, "pageBeforeLoad"));
$(document).on("pagebeforehide", pageSelector, $.proxy($.it.pagesManager, "pageBeforeHide"));
$(document).on("pagebeforeshow", pageSelector, $.proxy($.it.pagesManager, "pageBeforeShow"));
$(document).on("pageremove", pageSelector, $.proxy($.it.pagesManager, "pageRemove"));
$(document).on("pagehide", pageSelector, $.proxy($.it.pagesManager, "pageHide"));
$(document).on("pageshow", pageSelector, $.proxy($.it.pagesManager, "pageShow"));
$(document).on("resume", $.proxy($.it.pagesManager, "resume"));
$(document).on("pause", $.proxy($.it.pagesManager, "pause"));
$(document).on("orientationchange", $.proxy($.it.pagesManager, "orientationChange"));
