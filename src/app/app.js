(function (window, $, nu, utils, log, templates, undefined) {

	'use strict';

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
		ready: function () {
			if (!utils.isCordova()) {
				debug && log.i("Used as a Web App");
				app.init();
			}
			else {
				debug && log.i("Used as a Hybrid App");
				// $.mobile.defaultHomeScroll = 0;
				document.addEventListener("deviceready", app.init, false);
			}

			/**
			 * Adding livereload support for development only.
			 * Refresh page automatically in conjunction with grunt watcher.
			 * Generate something like this in body :
			 *   <script src="http://<hostname>:35729/livereload.js"></script>
			 */
			if (debug) {
				var lr = document.createElement('script');
				lr.src = ('https:' == window.location.protocol ? 'https://' : 'http://') + window.location.hostname + ":35729/livereload.js";
				lr.type = 'text/javascript';
				lr.async = 'true';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(lr, s);
			}
		},

		/**
		 * Initialize the appllication when DOM & Device (PhoneGap only) are ready.
		 */
		init: function () {
			if (!utils.isCordova() || !utils.isIOS()) {
				/**
				 * @property {nu.widgets.SplashScreen} splash
				 * @member app
				 * Application splashscreen instance.
				 */
				var splashscreen = new nu.widgets.SplashScreen({
					title: "NUBORN"
				});
				splashscreen.show();
			}

			window.onpopstate = function (event) {
				debug && log.i("## popstate ##");
				debug && log.i("history.length: " + history.length);
				debug && console.log(event);
			};

			window.onhashchange = function (event) {
				debug && log.i("## hashchange ##");
				debug && console.log(event);
			};

			// loading in DOM first page app
			nu.pages.PageEventsManager.get().loadFirstPage(app.home.settings.id, splashscreen);

			// starting JQM pages enhancement mechanism
			$.mobile.initializePage();
		}

	};

	// when the Document is Ready, call app.ready
	$(app.ready);

})(this, jQuery, nu, nu.Utils, nu.debug.Log, templates);