define( "nu.Utils", function ( require, exports, module ) {

	'use strict';

	var $ = jQuery;

	/***
	 * @class nu.Utils
	 * @singleton
	 *
	 * Utilities class.
	 */
	var Utils = {};

	/**
	 * Checks if Internet is reachable.
	 * @return {Boolean} The reachability of the internet
	 */
	Utils.isNetworkAvailable = function () {
		if ( Utils.isCordova() ) {
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
	Utils.isCordova = function () {
		return window.cordova;
	};

	/**
	 * Checks if the device platform is Android.
	 * @return {Boolean}
	 */
	Utils.isAndroid = function () {
		if ( Utils.isCordova() ) {
			return device.platform === "Android";
		}
		else {
			return navigator.userAgent.match( "Android" );
		}
	};

	/**
	 * Checks if the device platform is iOS.
	 * @return {Boolean}
	 */
	Utils.isIOS = function () {
		if ( Utils.isCordova() ) {
			return device.platform === "iOS";
		}
		else {
			return navigator.userAgent.match( /(iPhone|iPod|iPad)/i ) !== null;
		}
	};

	/**
	 * Checks if the device platform is older than Android 4.
	 * @return {Boolean}
	 */
	Utils.isOldAndroid = function () {
		if ( !Utils.isAndroid() ) {
			return false;
		}
		return Utils.getOSVersion() < 4;
	};

	/**
	 * Checks if the device platform is older than iOS 5.
	 * @return {Boolean}
	 */
	Utils.isOldIOS = function () {
		if ( !Utils.isIOS() ) {
			return false;
		}
		return Utils.getOSVersion() < 5;
	};

	/**
	 * Gets the OS version. <br/>
	 * Supports Phonegap - web (iOS, Android). <br/>
	 * Needs more support.
	 * @return {Boolean}
	 */
	Utils.getOSVersion = function () {
		// if the app is running on PhoneGap, ask for the device version
		// if ( Utils.isCordova() ) {
		// 	return parseFloat( device.version, 10 );
		// }
		// if it is a web app, ask the navigator user agent
		// else {
		// getting the user agent into a local variable
		var agent = navigator.userAgent;
		// iOS case
		if ( Utils.isIOS() ) {
			// removing the first part of the user agent
			var versionIndex = agent.indexOf( "OS" ) + 2;
			agent = agent.slice( versionIndex );
			// removing the end of the user agent
			var lastIndex = agent.indexOf( ")" ) === -1 ? 0 : agent.indexOf( ")" );
			agent = agent.substring( 0, lastIndex );
			// replacing all underscores with points
			agent = agent.replace( /_/g, "." );
			// parse the agent tg get the version as a float
			var version = parseFloat( agent );
			// returning the version
			return version;
		}
		// Android case
		else if ( Utils.isAndroid() ) {
			// removing the first part of the user agent
			var versionIndex = agent.indexOf( "Android" ) + 7;
			agent = agent.slice( versionIndex );
			// removing the end of the user agent
			var lastIndex = agent.indexOf( ";" ) === -1 ? 0 : agent.indexOf( ";" );
			agent = agent.substring( 0, lastIndex );
			// parse the agent to get the version as a float
			var version = parseInt( agent );
			// returning the version
			return version;
		}
		else {
			return NaN;
		}
		// }
	};

	/**
	 * Simple utility method to add a class to the HTML tag which reflect the current browser/version.
	 * Of course, you should always use feature detection but there is time when you need to come back to an old
	 * user-agent snif. To use with great caution.
	 * Handle only iOS and Android like everything else in Nuborn.
	 */
	Utils.decorateDOMWithBrowserClass = function () {
		var browser = Utils.isIOS() ? "ios" : Utils.isAndroid() ? "android" : "other";
		var version = Utils.getOSVersion();
		document.getElementsByTagName( "html" )[ 0 ].classList.add( browser + "-" + version );
	};

	/**
	 * Loads JavaScript library contained in the js/lazy folder.
	 * @param  {String} library The library to load
	 */
	Utils.loadLazyLib = function ( library ) {
		$.ajax( {
			url: "js/lazy/" + library,
			dataType: "script",
			async: false
		} );
	};

	Utils.blockEvent = function ( event ) {
		event.preventDefault();
		return false;
	};

	Utils.disableScroll = function ( element ) {
		var el = element || document;
		$( el ).on( "touchmove", Utils.blockEvent );
	};

	Utils.enableScroll = function ( element ) {
		var el = element || document;
		$( el ).off( "touchmove", Utils.blockEvent );
	};

	/**
	 * Deserialize the hash part of a URL.
	 * @param {String} hash Hash part of a URL. If null, window.location.hash is used.
	 * @return {Object}
	 * @return {String} return.name Hash name
	 * @return {Object} return.params Hash parameters
	 */
	Utils.deserializeHash = function ( hash ) {
		var result = {
			name: "",
			params: ""
		};
		if ( !hash || !hash.length )
			hash = window.location.hash;

		// adding the raw source, can be useful for regexp searchs for instance
		result.hash = hash;

		// no hash, no op.
		var hashIndex = hash.lastIndexOf( "#" );
		if ( hashIndex < 0 )
			return result;

		// removing part before hash
		hash = hash.substr( hashIndex );

		// is there hash parameters too ?
		var questionMarkIndex = hash.indexOf( "?" );
		questionMarkIndex = questionMarkIndex < 0 ? hash.length : questionMarkIndex + 1;

		// extracting hash name
		result.name = hash.substr( 0, questionMarkIndex );
		if ( result.name && result.name.length )
			result.name = result.name.replace( /(.*#)|(\?.*)/g, "" );

		// extracting hash parameters
		result.params = Utils.deserializeParameters( hash.substr( questionMarkIndex ) );

		return result;
	};

	/**
	 * Create a javascript object from a string hash which contains key/value parameters.
	 * @param {String} hash Minimum significant pattern is "?key=value"
	 * @return {Object} Simple key/value object.
	 */
	Utils.deserializeParameters = function ( hash ) {

		var result = {};
		if ( !hash || !hash.length )
			return result;

		// extracting hash parameters substring
		var hashParameters = hash.substr( hash.indexOf( "?" ) + 1 );
		if ( !hashParameters || !hashParameters.length )
			return result;

		// parsing key=value pairs
		var paramsArray = hashParameters.split( "&" );
		paramsArray.forEach( function ( param ) {
			var keyValueArray = param.split( "=" );
			if ( !keyValueArray || !keyValueArray.length )
				return;
			result[ keyValueArray[ 0 ] ] = decodeURIComponent( keyValueArray[ 1 ] );
		} );

		return result;
	};

	/**
	 * Create a new String object from a javascript object.
	 * @param {Object} parameters Simple key/value object.
	 * @return {String} following pattern "key1=value[&key2=value&...]"
	 */
	Utils.serializeHashParameters = function ( parameters ) {

		var result = "";
		if ( !parameters )
			return result;

		var paramsArray = [];
		for ( var key in parameters ) {
			paramsArray.push( key + "=" + encodeURIComponent( parameters[ key ] ) );
		}

		result = paramsArray.join( "&" );
		return result;
	};

	/**
	 * Clone a javascript object.
	 */
	Utils.clone = function ( objectToClone ) {
		return JSON.parse( JSON.stringify( objectToClone ) );
	};

	/**
	 * Shortcut for JSON.stringify(object, null, "    ")
	 */
	Utils.toJSON = function ( object ) {
		var clone = $.extend( true, {}, object );
		return JSON.stringify( clone, null, "    " );
	};

	/**
	 * [Warning] Doesn't work if page handler is in prototype mode.
	 * Refresh a JQM page. If no page id provided, use the current active page.
	 * @param {String} pageId page ID.
	 *  Don't provide the character "#" in pageId.
	 */
	Utils.refreshPage = function ( pageId ) {
		pageId = pageId || $.mobile.activePage.attr( "id" );
		DEBUG && log.i( "Refreshing page: " + pageId );
		$.mobile.changePage(
			"#" + pageId, {
				allowSamePageTransition: true,
				transition: 'none',
				showLoadMsg: false,
				changeHash: false
			} );
	};

	/**
	 * If in a phonegap iOS app, hide native splashscreen.
	 * Else, hide web splashscreen.
	 */
	Utils.hideSplashScreen = function () {
		// if the splashscreen is handled natively with iOS
		if ( Utils.isCordova() && navigator.splashscreen ) {
			navigator.splashscreen.hide();
		}
		else {
			var EventsDispatcher = require( "nu.events.EventsDispatcher" ); // @ignore
			var SplashScreen = require( "nu.widgets.SplashScreen" ); // @ignore
			EventsDispatcher.emit( {
				name: SplashScreen.EVENT_HIDE
			} );
		}
	};

	/**
	 * Install remote debugging scripts based on build based variables (uglify compilation).
	 * debug : true if compiling for development
	 * weinre : true if you want weinre support
	 * livereload : true if you want livereload support
	 */
	Utils.installDebugScripts = function () {

		var log = require( "#log" );

		/**
		 * Adding livereload support for development only.
		 * Refresh page automatically in conjunction with grunt watcher.
		 * Generate something like this in body :
		 *   <script src="http://<hostname>:35729/livereload.js"></script>
		 */
		if ( DEBUG && LIVERELOAD ) {
			var lr = document.createElement( 'script' );
			var hostname = REMOTE_HOST || window.location.hostname;
			lr.src = ( 'https:' == window.location.protocol ? 'https://' : 'http://' ) + hostname + ":" + LIVERELOAD_PORT + "/livereload.js";
			DEBUG && log.i( "Installing Livereload script at: " + lr.src );
			lr.type = 'text/javascript';
			lr.async = 'true';
			var s = document.getElementsByTagName( 'script' )[ 0 ];
			s.parentNode.insertBefore( lr, s );
		}

		/**
		 * Adding weinre support for development only.
		 * Allows remote debugging with Android default browser.
		 * Generate something like this in body :
		 *   <script src="http://<hostname>::8080/target/target-script-min.js#weinre"></script>
		 */
		if ( DEBUG && WEINRE ) {
			var lr = document.createElement( 'script' );
			var hostname = REMOTE_HOST || window.location.hostname;
			lr.src = ( 'https:' == window.location.protocol ? 'https://' : 'http://' ) + hostname +
				":" + WEINRE_PORT + "/target/target-script-min.js#weinre";
			DEBUG && log.i( "Installing Weinre script at: " + lr.src );
			lr.type = 'text/javascript';
			lr.async = 'true';
			var s = document.getElementsByTagName( 'script' )[ 0 ];
			s.parentNode.insertBefore( lr, s );
		}

	};

	/**
	 * Replace placeholders of form {x} in a string where x is a number >= 0.
	 * If no placeholders, return the string as is.
	 * @param {String} string
	 * @param {Array} params Array of values (converted as string)
	 */
	Utils.replaceWith = function ( string, params ) {
		if ( !params )
			return string;
		if ( !( params instanceof Array ) )
			params = [ params ];

		var regex = new RegExp( "\\{[0-9]\\}" );
		for ( var paramsIndex = 0, paramsLength = params.length; paramsIndex < paramsLength; paramsIndex++ ) {
			var m = regex.exec( string );
			if ( m === null ) {
				return string;
			}
			else {
				for ( var i = 0, lg = m.length; i < lg; i++ ) {
					string = string.replace( m[ i ], params[ paramsIndex ] );
				}
			}
		}

		return string;
	};

	/**
	 * Generate a random GUID.
	 */
	Utils.guid = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c ) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : ( r & 0x3 | 0x8 );
			return v.toString( 16 );
		} );
	};

	/**
	 * Generate a random color as HEX format.
	 */
	Utils.randomHexColor = function () {
		return '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );
	};

	Utils.randomRgbaColor = function ( opacity, hex ) {
		var hex = hex || Utils.randomHexColor().replace( '#', '' );
		var r = parseInt( hex.substring( 0, 2 ), 16 );
		var g = parseInt( hex.substring( 2, 4 ), 16 );
		var b = parseInt( hex.substring( 4, 6 ), 16 );

		var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
		return result;
	};

	Utils.randomHexColorWithLuminance = function ( lum, hex ) {
		var hex = hex || Utils.randomHexColor();

		// validate hex string
		hex = String( hex ).replace( /[^0-9a-f]/gi, '' );
		if ( hex.length < 6 ) {
			hex = hex[ 0 ] + hex[ 0 ] + hex[ 1 ] + hex[ 1 ] + hex[ 2 ] + hex[ 2 ];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#",
			c, i;
		for ( i = 0; i < 3; i++ ) {
			c = parseInt( hex.substr( i * 2, 2 ), 16 );
			c = Math.round( Math.min( Math.max( 0, c + ( c * lum ) ), 255 ) ).toString( 16 );
			rgb += ( "00" + c ).substr( c.length );
		}

		return rgb;
	};

	Utils.randomRgbColor = function () {
		var hex = Utils.randomHexColor();
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
		return result ? {
			r: parseInt( result[ 1 ], 16 ),
			g: parseInt( result[ 2 ], 16 ),
			b: parseInt( result[ 3 ], 16 )
		} : null;
	};

	/**
	 * Return a random item from an array.
	 */
	Utils.randomItemFromArray = function ( array ) {
		return array[ Math.floor( Math.random() * array.length ) ];
	};

	// handle old browsers when JSON object is missing
	// if(!JSON || !JSON.stringify || !JSON.parse){
	// 	// creating JSON object
	// 	JSON = {};
	// 	// bind JSON stringify to jQuery JSON "toJSON" method
	// 	JSON.stringify = $.toJSON || function(object){
	// 		nu.log.e("JSON.stringify could not be loaded : returning empty string !");
	// 		return object instanceof Array ? "[]" : object instanceof Object ? "{}" : "";
	// 	};
	// 	// bind JSON stringify to jQuery JSON "evalJSON" method
	// 	JSON.parse = $.evalJSON || function(string){
	// 		nu.log.e("JSON.parse could not be loaded : returning empty object !");
	// 		return {};
	// 	};
	// }

	module.exports = Utils;

} );