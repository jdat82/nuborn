// Configuration of jQuery Mobile before it loads
$(document).on("mobileinit", function () {
	// do not auto initialize page because of splashscreen
	$.mobile.autoInitializePage = false;
	$.mobile.touchOverflowEnabled = true;
});