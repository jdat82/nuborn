(function($, nu, utils, log, templates, undefined) {

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
		ready: function() {
			if (!utils.isCordova()) {
				debug && log.i("Used as a Web App")
				app.init()
			} else {
				debug && log.i("Used as a Hybrid App")
				$.mobile.defaultHomeScroll = 0
				document.addEventListener("deviceready", app.init, false)
			}
		},

		/**
		 * Initialize the appllication when DOM & Device (PhoneGap only) are ready.
		 */
		init: function() {
			if (!utils.isCordova() || !utils.isIOS()) {
				/**
				 * @property {nu.widgets.SplashScreen} splash
				 * @member app
				 * Application splashscreen instance.
				 */
				app.splash = new nu.widgets.SplashScreen({
					id: "splash"
				})
				app.splash.show()
			}

			if (utils.isOldAndroid()) {
				$.mobile.defaultPageTransition = "none"
			} else {
				$.mobile.defaultPageTransition = "slide"
			}

			insertHomePage()
			$.mobile.initializePage()
		}
		
	}

	// Load the page home.html and insert it to the body
	function insertHomePage() {
		// load the html of the home page
		// we don't use the go function has it is the first page for JQM after its initialization
		// and it will not work
		$(templates.home.render()).appendTo("body")
	}

	// When the Document is Ready, call app.ready
	$(app.ready)

})(jQuery, nu, nu.Utils, nu.debug.Log, templates)
