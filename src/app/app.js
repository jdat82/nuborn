(function (window, $, nu, utils, log, templates, undefined)
{

	/**
	 * @class app
	 * @singleton
	 * Application entry point.
	 *
	 * @provide app
	 *
	 * @require nu
	 */
	window["app"] = {

		/**
		 * Application current version.
		 */
		version: "0.1.0",

		/**
		 * Application name.
		 */
		name: "Nuborn Application",

		/**
		 * Callback function called when the DOM is ready.
		 */
		ready: function ()
		{
			if (!utils.isCordova())
			{
				debug && log.i("Used as a Web App");
				// first access will initialize the cache manager
				nu.cache.AppCache.get();
				app.init();
			}
			else
			{
				debug && log.i("Used as a Hybrid App");
				$.mobile.defaultHomeScroll = 0;
				document.addEventListener("deviceready", app.init, false);
			}
		},

		/**
		 * Initialize the appllication when DOM & Device (PhoneGap only) are ready.
		 */
		init: function ()
		{
			if (!utils.isCordova() || !utils.isIOS())
			{
				/**
				 * @property {nu.widgets.SplashScreen} splash
				 * @member app
				 * Application splashscreen instance.
				 */
				app.splash = new nu.widgets.SplashScreen(
				{
					title: "NUBORN"
				});
				app.splash.show();
			}

			// loading in DOM first page app
			nu.pages.PageEventsManager.get().loadFirstPage("home");

			// only simple way to know if JQM is started or not
			app.isJqmInitialized = true;

			// starting JQM pages enhancement mechanism
			$.mobile.initializePage();
		}

	};

	// when the Document is Ready, call app.ready
	$(app.ready);

})(this, jQuery, nu, nu.Utils, nu.debug.Log, templates);