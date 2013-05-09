/* -- Provider --*/
goog.provide("app");

window.onerror = function(message, url, line){
	log.e(message);
};

// Create Shortcuts
var utils = nu.Utils;
var log = nu.debug.Log;

var PH = nu.pages.PageHandler;

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
app.ready = function(){
	if(!utils.isCordova()) {
		log.i("Used as a Web App");
		app.init();
	}
	else {
		log.i("Used as a Hybrid App");
		$.mobile.defaultHomeScroll = 0;
		document.addEventListener("deviceready", app.init, false);
	}
};

/**
 * Initialize the appllication when DOM & Device (PhoneGap) are ready.
 */
app.init = function(){
	if(!utils.isCordova() || !utils.isIOS()){
		app.splash = new nu.widgets.SplashScreen({
			id: "splash"
		});
		app.splash.show();
	}

	HomePageHandler.insertHTML().done(function(){
		$.mobile.initializePage();
	});
};

// When the Document is Ready, call app.ready
$(app.ready);
