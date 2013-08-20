// Configuration of jQuery Mobile before it loads
$(document).on("mobileinit", function ()
{
	// do not auto initialize page because of splashscreen
	$.mobile.autoInitializePage = false;

	// $.mobile.touchOverflowEnabled = true; // Deprecated since 1.1

	// phonegap friendly ?
	if (window.cordova)
		$.mobile.phonegapNavigationEnabled = true;

	// TODO je serais partant pour désactiver les transitions dès qu'on a un peu scrollé
	// la valeur par défaut me semble bien trop importante
	// $.mobile.maxScrollForTransition = 1;

	// Don't use fancy transitions on poor capable devices
    if ($.mobile.gradeA())
        $.mobile.defaultPageTransition = "slide";
    else
		$.mobile.defaultPageTransition = "none";
});