/**
 * -- Provider
 */
goog.provide("app");

app.version = "0.1.0";

app.name = "Nuborn Kitchen Sink";

app.ready = function(){
	if(WEB){
		$.app.init();
	} else {
		document.addEventListener("deviceready", $.app.init, false);
	}
}
