(function (window, $, nu, log, undefined) {

	'use strict';

	/***
	 * @class nu.Utils
	 * @singleton
	 *
	 * Utilities class.
	 *
	 * @provide nu.Utils
	 *
	 * @require nu
	 */
	nu.Utils = {};

	/**
	 * Checks if Internet is reachable.
	 * @return {Boolean} The reachability of the internet
	 */
	nu.Utils.isNetworkAvailable = function () {
		if (nu.Utils.isCordova()) {
			return navigator.connection.type !== Connection.NONE;
		}
		else {
			return navigator.onLine;
		}
	};

	/**
	 * Checks if the application is running with PhoneGap (Cordova)
	 * @return {Boolean} [description]
	 */
	nu.Utils.isCordova = function () {
		return window.cordova;
	};

	/**
	 * Checks if the device platform is Android.
	 * @return {Boolean}
	 */
	nu.Utils.isAndroid = function () {
		if (nu.Utils.isCordova()) {
			return device.platform === "Android";
		}
		else {
			return navigator.userAgent.match("Android");
		}
	};

	/**
	 * Checks if the device platform is iOS.
	 * @return {Boolean}
	 */
	nu.Utils.isIOS = function () {
		if (nu.Utils.isCordova()) {
			return device.platform === "iOS";
		}
		else {
			return navigator.userAgent.match(/(iPhone|iPod|iPad)/i);
		}
	};

	/**
	 * Checks if the device platform is older than Android 4.
	 * @return {Boolean}
	 */
	nu.Utils.isOldAndroid = function () {
		if (!nu.Utils.isAndroid()) {
			return false;
		}
		return nu.Utils.getOSVersion() < 4;
	};

	/**
	 * Checks if the device platform is older than iOS 5.
	 * @return {Boolean}
	 */
	nu.Utils.isOldIOS = function () {
		if (!nu.Utils.isIOS()) {
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
	nu.Utils.getOSVersion = function () {
		// if the app is running on PhoneGap, ask for the device version
		if (nu.Utils.isCordova()) {
			return parseFloat(device.version, 10);
		}
		// if it is a web app, ask the navigator user agent
		else {
			// getting the user agent into a local variable
			var agent = navigator.userAgent;
			// iOS case
			if (nu.Utils.isIOS()) {
				// removing the first part of the user agent
				var versionIndex = agent.indexOf("OS") + 2;
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
			else if (nu.Utils.isAndroid()) {
				// removing the first part of the user agent
				var versionIndex = agent.indexOf("Android") + 7;
				agent = agent.slice(versionIndex);
				// removing the end of the user agent
				var lastIndex = agent.indexOf(";") === -1 ? 0 : agent.indexOf(";");
				agent = agent.substring(0, lastIndex);
				// parse the agent to get the version as a float
				var version = parseInt(agent);
				// returning the version
				return version;
			}
			else {
				return NaN;
			}
		}
	};

	/**
	 * Loads JavaScript library contained in the js/lazy folder.
	 * @param  {String} library The library to load
	 */
	nu.Utils.loadLazyLib = function (library) {
		$.ajax({
			url: "js/lazy/" + library,
			dataType: "script",
			async: false
		});
	};

	nu.Utils.blockEvent = function (event) {
		event.preventDefault();
		return false;
	};

	nu.Utils.disableScroll = function () {
		$(document).on("touchmove", nu.Utils.blockEvent);
	};

	nu.Utils.enableScroll = function () {
		$(document).off("touchmove", nu.Utils.blockEvent);
	};

	/**
	 * Deserialize the hash part of a URL.
	 * @param {String} hash Hash part of a URL. If null, window.location.hash is used.
	 * @return {Object}
	 * @return {String} return.name Hash name
	 * @return {Object} return.params Hash parameters
	 */
	nu.Utils.deserializeHash = function (hash) {
		var result = {
			name: "",
			params: ""
		};
		if (!hash || !hash.length)
			hash = window.location.hash;

		var questionMarkIndex = hash.indexOf("?");
		questionMarkIndex = questionMarkIndex < 0 ? hash.length : questionMarkIndex + 1;

		// extracting hash name
		result.name = hash.substr(0, questionMarkIndex);
		if (result.name && result.name.length)
			result.name = result.name.replace(/[#?]/g, "");

		// extracting hash parameters
		result.params = nu.Utils.deserializeHashParameters(hash.substr(questionMarkIndex));

		return result;
	};

	/**
	 * Create a javascript object from a string hash which contains key/value parameters.
	 * @param {String} hash Minimum significant pattern is "?key=value"
	 * @return {Object} Simple key/value object.
	 */
	nu.Utils.deserializeHashParameters = function (hash) {

		var result = {};
		if (!hash || !hash.length)
			hash = window.location.hash;

		// extracting hash parameters substring
		var hashParameters = hash.substr(hash.indexOf("?") + 1);
		if (!hashParameters || !hashParameters.length)
			return result;

		// parsing key=value pairs
		var paramsArray = hashParameters.split("&");
		paramsArray.forEach(function (param) {
			var keyValueArray = param.split("=");
			if (!keyValueArray || !keyValueArray.length)
				return;
			result[keyValueArray[0]] = decodeURIComponent(keyValueArray[1]);
		});

		return result;
	};

	/**
	 * Create a new String object from a javascript object.
	 * @param {Object} parameters Simple key/value object.
	 * @return {String} following pattern "key1=value[&key2=value&...]"
	 */
	nu.Utils.serializeHashParameters = function (parameters) {

		var result = "";
		if (!parameters)
			return result;

		var paramsArray = [];
		for (var key in parameters) {
			paramsArray.push(key + "=" + encodeURIComponent(parameters[key]));
		}

		result = paramsArray.join("&");
		return result;
	};

	/**
	 * Shortcut for JSON.stringify(object, null, "    ")
	 */
	nu.Utils.toJSON = function (object) {
		var clone = $.extend(true, {}, object);
		return JSON.stringify(clone, null, "    ");
	};

	/**
	 * [Warning] Doesn't work if page handler is in prototype mode.
	 * Refresh a JQM page. If no page id provided, use the current active page.
	 * @param {String} pageId page ID.
	 *	Don't provide the character "#" in pageId.
	 */
	nu.Utils.refreshPage = function (pageId) {
		pageId = pageId || $.mobile.activePage.attr("id");
		debug && log.i("Refreshing page: " + pageId);
		$.mobile.changePage(
			"#" + pageId, {
				allowSamePageTransition: true,
				transition: 'none',
				showLoadMsg: false,
				changeHash: false
			});
	};

	/**
	 * If in a web app, wait 2 seconds and hide web splashscreen.
	 * If in a phonegap app, hide native splashscreen.
	 * @param {nu.widgets.SplashScreen} splashscreen Web splashscreen. Useless in phonegap app.
	 */
	nu.Utils.hideSplashScreen = function (splashscreen) {
		var self = this;
		// if the splashscreen is handled from web
		if (splashscreen) {
			setTimeout(function () {
				// hide splashscreen after 2 seconds
				splashscreen.hide(true);
			}, 2000);
		}
		// if the splashscreen is handled natively with iOS
		else if (this.isCordova() && this.isIOS()) {
			// hide it immediately via cordova
			navigator.splashscreen.hide();
		}
	};

	/**
	 * Install remote debugging scripts based on build based variables (uglify compilation).
	 * debug : true if compiling for development
	 * weinre : true if you want weinre support
	 * livereload : true if you want livereload support
	 */
	nu.Utils.installDebugScripts = function () {

		/**
		 * Adding livereload support for development only.
		 * Refresh page automatically in conjunction with grunt watcher.
		 * Generate something like this in body :
		 *   <script src="http://<hostname>:35729/livereload.js"></script>
		 */
		if (debug && livereload) {
			var lr = document.createElement('script');
			lr.src = ('https:' == window.location.protocol ? 'https://' : 'http://') + window.location.hostname + ":35729/livereload.js";
			lr.type = 'text/javascript';
			lr.async = 'true';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(lr, s);
		}

		/**
		 * Adding weinre support for development only.
		 * Allows remote debugging with Android default browser.
		 * Generate something like this in body :
		 *   <script src="http://<hostname>::8080/target/target-script-min.js#weinre"></script>
		 */
		if (debug && weinre) {
			var lr = document.createElement('script');
			lr.src = ('https:' == window.location.protocol ? 'https://' : 'http://') + window.location.hostname +
				":8080/target/target-script-min.js#weinre";
			lr.type = 'text/javascript';
			lr.async = 'true';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(lr, s);
		}

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

})(this, jQuery, nu, nu.debug.Log)