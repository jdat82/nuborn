
var SplashscreenPH = PageHandler.subClass(
{
	// constructor
	init: function()
	{
		this._super({
			ID: "splashscreen-page",
			URL: "index.html"
		});
	},


	createHtmlElements: function()
	{
		this.html.loaderIcon = $("#loader-icon");
	},


	hideSplashscreen: function()
	{
		console.log("hide splashscreen");
		// jquery mobile semble buggé si on change trop vite de page
		// sur la toute première page
		setTimeout(function(){
			$.mobile.changePage($.app.homePH.settings.URL, { transition: "fade" });
		}, 500);
	},


	hideLoaderIcon: function()
	{
		this.html.loaderIcon.hide();
	},


	// permet de supprimer la page d'accueil qui par défaut reste toujours dans le DOM
	// commenter si l'on souhaite préserver le comportement originel de jQuery Mobile
	pageHide: function(event, data)
	{
		console.log("removing splashscreen");
		this.html.page.remove();
	}

});

$.app.splashscreenPH = new SplashscreenPH();

// $(document).one("pagehide", $.proxy($.app.splashscreenPH, "firstPageHide"));

