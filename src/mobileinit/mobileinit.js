/**
 * Configuration of jQuery Mobile before it loads
 */
$(document).on("mobileinit", function(){
	// do not auto initialize page because of splashscreen
	$.mobile.autoInitializePage = false;

	// if it's not Web Build, set the Home Scroll valu
	if(CORDOVA){
		$.mobile.defaultHomeScroll = 0;
	}
});