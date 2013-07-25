/**
 * @class app
 * Application entry point.
 * @singleton
 *
 * @provide app
 * @require nu
 */
var app = {}

// rend impossible le debugging des erreurs dans la console
// window.onerror = function(message, url, line){
// 	log.e(message);
// };

/**
 * @class app
 * The App namespace.
 * @singleton
 */

/**
 * The version of the application.
 * @type {String}
 */
app.version = "0.1.0";

/**
 * The name of the application.
 * @type {String}
 */
app.name = "Nuborn Application";

/**
 * Callback function called when the DOM is ready.
 */
app.ready = function() {
	if (!utils.isCordova()) {
		debug && log.i("Used as a Web App");
		app.init();
	} else {
		debug && log.i("Used as a Hybrid App");
		$.mobile.defaultHomeScroll = 0;
		document.addEventListener("deviceready", app.init, false);
	}
};

/**
 * Initialize the appllication when DOM & Device (PhoneGap) are ready.
 */
app.init = function() {
	if (!utils.isCordova() || !utils.isIOS()) {
		app.splash = new nu.widgets.SplashScreen({
			id: "splash"
		});
		app.splash.show();
	}

	if (utils.isOldAndroid()) {
		$.mobile.defaultPageTransition = "none";
	} else {
		$.mobile.defaultPageTransition = "slide";
	}

	insertHomePage()
	$.mobile.initializePage()
};

/**
 * Load the page home.html and insert it to the body
 * @return {Deferred} The deferred of the process
 */

function insertHomePage() {
	// load the html of the home page
	// we don't use the go function has it is the first page for JQM after its initialization
	// and it will not work
	$(templates.home.render()).appendTo("body")
};

// When the Document is Ready, call app.ready
$(app.ready);