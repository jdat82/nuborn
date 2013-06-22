/**
 * @class nu.Utils
 * Utilities class.
 * @singleton
 *
 * @provide nu.Utils
 * @require nu
 */
nu.Utils = {}

/**
 * Checks if Internet is reachable.
 * @return {Boolean} The reachability of the internet
 */
nu.Utils.isNetworkAvailable = function(){
	if(nu.Utils.isCordova()){
		return navigator.connection.type !== Connection.NONE;
	} else {
		return navigator.onLine;
	}
};

/**
 * Checks if the application is running with PhoneGap (Cordova)
 * @return {Boolean} [description]
 */
nu.Utils.isCordova = function(){
	return window.cordova;
};

/**
 * Checks if the device platform is Android.
 * @return {Boolean} 
 */
nu.Utils.isAndroid = function(){
	if(nu.Utils.isCordova()){
		return device.platform === "Android";
	} else {
		return navigator.userAgent.match("Android");
	}
};

/**
 * Checks if the device platform is iOS.
 * @return {Boolean} 
 */
nu.Utils.isIOS = function(){
	if(nu.Utils.isCordova()){
		return device.platform === "iOS";
	} else {
		return navigator.userAgent.match(/(iPhone|iPod|iPad)/i);
	}
};

/**
 * Checks if the device platform is older than Android 4.
 * @return {Boolean} 
 */
nu.Utils.isOldAndroid = function(){
	if(!nu.Utils.isAndroid()){
		return false;
	}
	return nu.Utils.getOSVersion() < 4;
};

/**
 * Checks if the device platform is older than iOS 5.
 * @return {Boolean}
 */
nu.Utils.isOldIOS = function(){
	if(!nu.Utils.isIOS()){
		return false;
	}
	return nu.Utils.getOSVersion() < 5;
};

/**
 * Gets the OS version. <br/>
 * Supports Phonegap - web (iOS, Android). <br/>
 * Needs more support.
 * @return {Boolean}
 */
nu.Utils.getOSVersion = function(){
	// if the app is running on PhoneGap, ask for the device version
	if(nu.Utils.isCordova()){
		return parseFloat(device.version, 10);
	} 
	// if it is a web app, ask the navigator user agent
	else {
		// getting the user agent into a local variable
		var agent = navigator.userAgent;
		// iOS case
		if(nu.Utils.isIOS()){
			// removing the first part of the user agent
			var versionIndex = agent.indexOf("OS")+2;
			agent = agent.slice(versionIndex);
			// removing the end of the user agent
			var lastIndex = agent.indexOf(")") === -1 ? 0 : agent.indexOf(")");
			agent = agent.substring(0, lastIndex);
			// replacing all underscores with points
			agent = agent.replace(/_/g, ".");
			// parse the agent tg get the version as a float
			var version = parseFloat(agent);
			// returning the version
			return version;
		}
		// Android case
		else if(nu.Utils.isAndroid()) {
			// removing the first part of the user agent
			var versionIndex = agent.indexOf("Android")+7;
			agent = agent.slice(versionIndex);
			// removing the end of the user agent
			var lastIndex = agent.indexOf(";") === -1 ? 0 : agent.indexOf(";");
			agent = agent.substring(0, lastIndex);
			// parse the agent to get the version as a float
			var version = parseInt(agent);
			// returning the version
			return version;
		} else {
			return NaN;
		} 	
	}
};

/**
 * Loads JavaScript library contained in the js/lazy folder.
 * @param  {String} library The library to load
 */
nu.Utils.loadLazyLib = function(library){
	$.ajax({
		url: "js/lazy/"+library,
		dataType: "script",
		async: false
	});
};

nu.Utils.blockEvent = function(event){
	return false;
};

nu.Utils.disableScroll = function(){
	$(document).on("touchmove", nu.Utils.blockEvent);
};

nu.Utils.enableScroll = function(){
	$(document).off("touchmove", nu.Utils.blockEvent);
};

// handle old browsers when JSON object is missing
// if(!JSON || !JSON.stringify || !JSON.parse){
// 	// creating JSON object
// 	JSON = {};
// 	// bind JSON stringify to jQuery JSON "toJSON" method
// 	JSON.stringify = $.toJSON || function(object){
// 		nu.Log.e("JSON.stringify could not be loaded : returning empty string !");
// 		return object instanceof Array ? "[]" : object instanceof Object ? "{}" : "";
// 	};
// 	// bind JSON stringify to jQuery JSON "evalJSON" method
// 	JSON.parse = $.evalJSON || function(string){
// 		nu.Log.e("JSON.parse could not be loaded : returning empty object !");
// 		return {};
// 	};
// }
