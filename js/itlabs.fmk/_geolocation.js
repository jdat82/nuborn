
// Geolocation object which help with geolocation common needs.
// Help to abstract the use of differents API like phonegap or html5.
var Geolocation = Object.subClass({

	// constructor
	// defaults: 
	// - enableHighAccuracy: true
	// - maximumAge: 60000
	init: function(settings)
	{
		this.defaults = {
			// on utilise le GPS si disponible
			enableHighAccuracy: true,
			// on accepte les mesures qui ont au maximum 1 minute d'ancienneté
			maximumAge: 60000,
			// s'il faut plus de 5s. pour obtenir la position, timeout
			timeout: 5000
		};
		this.settings = $.extend(true, {}, this.defaults, settings);
	},


	// update current settings
	updateSettings: function(settings)
	{
		this.settings = $.extend(true, {}, this.settings, settings);
	},


	// méthode utilitaire pour abstraire la récupération de la localisation courante de l'utilisateur
	// selon que l'on est dans une coque phonegap ou dans un navigateur web classique
	//
	// En cas de succès, le contexte de la callback est un objet Position traditionnel
	// Position: {
	//	coords: {
	//		latitude, longitude, speed, etc.
	//	},
	//	timestamp
	// }
	//
	// En cas d'échec, le contexte de la callback est un objet PositionError traditionnel
	// PositionError: {
	//	code,
	//	message
	// }
	//
	// Voir les API phonegap et HTML5 pour les codes d'erreur respectifs :
	// - phonegap : http://docs.phonegap.com/en/2.4.0/cordova_geolocation_geolocation.md.html#Geolocation
	// - html5 : http://www.w3.org/TR/geolocation-API/#position_error_interface
	//
	// @param settings: optionnel pour surcharger les paramètres par défaut (voir #init)
	// @param updateContext: update $.it.context.position on success
	//
	// @return un objet Promise de jQuery
	// ----------------------------------------------------------------------------------------------------
	// Exemple :
	// var onSuccess = function() {
	//	console.log('Latitude: '          + this.coords.latitude          + '\n' +
	//          'Longitude: '         + this.coords.longitude         + '\n' +
	//          'Altitude: '          + this.coords.altitude          + '\n' +
	//          'Accuracy: '          + this.coords.accuracy          + '\n' +
	//          'Altitude Accuracy: ' + this.coords.altitudeAccuracy  + '\n' +
	//          'Heading: '           + this.coords.heading           + '\n' +
	//          'Speed: '             + this.coords.speed             + '\n' +
	//          'Timestamp: '         + this.timestamp                + '\n');
	// };
	// var onFail = function() {
	//		console.log('code: '    + this.code    + '\n' +
	//         'message: ' + this.message + '\n');
	// };
	// $.it.geo.getPosition().done(onSuccess).fail(onFail);
	getPosition: function(updateContext, settings)
	{
		// deferred que nous allons retourner au client
		var dfd = $.Deferred();
		var self = this;

		// PHONEGAP && HTML5 API
		if(navigator.geolocation && navigator.geolocation.getCurrentPosition)
		{
			// success callback receives a Position object
			var onSuccess = function(position) {
				self.logPosition("GET", position);
				if(updateContext) {
					$.it.context.position = position;
				}
				dfd.resolveWith(position);
			};

			// error callback receives a PositionError object
			var onError = function(positionError) {
				self.logPositionError("GET", positionError);
				dfd.rejectWith(positionError);
			};

			// if(settings)
			settings = $.extend(true, {}, this.settings, settings);

			navigator.geolocation.getCurrentPosition(onSuccess, onError, settings);
		}
		// NO API
		else
		{
			// creating a custom error object has PositionError from HTML5 is not public
			// but attributes are identicals
			dfd.rejectWith(new Status(GenericStatus.NOK, $.it.wordings.msg("geolocation-api-missing")));
		}

		return dfd.promise();
	},


	// Check if geolocation is possible on current device/browser
	// @param verbose: alert a message to the user :
	//	- if permission denied, use the wording key <geolocation-permission-denied>
	//	- else, use the wording key <geolocation-position-unavailable>
	// Callbacks receive nothing
	checkAvailability: function(verbose)
	{
		var dfd = $.Deferred();

		var success = function(position)
		{
			dfd.resolve();
		};

		var error = function(positionError)
		{
			if(verbose) {
				if(positionError && positionError.code === 1) {
					$.it.toolbox.alert($.it.wordings.msg("geolocation-permission-denied"));
				}
				else {
					$.it.toolbox.alert($.it.wordings.msg("geolocation-position-unavailable"));
				}
			}
			dfd.reject();
		};

		this.getPosition().done(success).fail(error);

		return dfd.promise();
	},


	// watch position at regular interval
	// @param settings: optionnel pour surcharger les paramètres par défaut (voir #init)
	// @param updateContext: update $.it.context.position on success
	watchPosition: function(updateContext, settings)
	{
		if(this.watchId) {
			this.stopWatching();
		}

		// deferred que nous allons retourner au client
		var dfd = $.Deferred();
		var self = this;

		// PHONEGAP && HTML5 API
		if(navigator.geolocation && navigator.geolocation.getCurrentPosition)
		{
			// success callback receives a Position object
			var onSuccess = function(position) {
				self.logPosition("WATCH", position);
				if(updateContext) {
					$.it.context.position = position;
				}
				dfd.resolveWith(position);
			};

			// error callback receives a PositionError object
			var onError = function(positionError) {
				self.logPositionError("WATCH", positionError);
				dfd.rejectWith(positionError);
			};

			// if(settings)
			settings = $.extend(true, {}, this.settings, settings);

			self.watchId = navigator.geolocation.watchPosition(onSuccess, onError, settings);
		}
		// NO API
		else
		{
			// creating a custom error object has PositionError from HTML5 is not public
			// but attributes are identicals
			dfd.rejectWith(new Status(GenericStatus.NOK, $.it.wordings.msg("geolocation-api-missing")));
		}

		return dfd.promise();
	},


	// stop a preceding watch
	stopWatching: function()
	{
		if(!this.watchId) return;

		// HTML5 && Cordova
		if(navigator.geolocation && navigator.geolocation.clearWatch)
		{
			navigator.geolocation.clearWatch(this.watchId);
		}
	},


	// methode utilitaire pour logger un positionError
	logPositionError: function(prefix, positionError)
	{
		if(!positionError) return;

		// valeur du code hardcodé car il ne semble pas possible d'accéder à l'interface PositionError
		var codeStr = ["UNKNOWN", "PERMISSION_DENIED", "POSITION_UNAVAILABLE", "TIMEOUT"];
		var code = codeStr[0];
		if(positionError.code >= 1 && positionError.code <= 3) {
			code = codeStr[positionError.code];
		}

		if(prefix)
			prefix = "[" + prefix + "] ";
		else
			prefix = "";

		console.log(prefix + "PositionError ==> code: "+ code + ", message: " + positionError.message);
	},


	logPosition: function(prefix, position)
	{
		if(!position || !position.coords || !position.coords.latitude || !position.coords.longitude)
			return;

		if(prefix)
			prefix = "[" + prefix + "] ";
		else
			prefix = "";

		console.log(prefix + "Position ==> latitude: "+ position.coords.latitude + ", longitude: " + position.coords.longitude);

	}

});

// adding to IT&L@BS namespace
$.it.geo = new Geolocation();