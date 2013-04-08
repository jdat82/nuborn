
function Toolbox() {
	this.settings = {
		"templates-folder": "templates/"
	};
}

// enregistrement dans le namespace IT&L@bs
$.it.toolbox = new Toolbox();

// use params to fill placeholders of form {x} in string
Toolbox.prototype.fillParams = function(string, params) {
	if(!params || params.length <= 0) {
		return string;
	}
	var regex = new RegExp("\\{[0-9]\\}");
	if(!(params instanceof Array)) {
		params = [params];
	}
	for(var paramsIndex = 0; paramsIndex < params.length; paramsIndex++){
		var m = regex.exec(string);
		if(m === null) {
			return string;
		}
		else {
			for (i = 0; i < m.length; i++) {
				string = string.replace(m[i], params[paramsIndex]);
			}
		}
	}

	return string;
};

Toolbox.prototype.updateSettings = function(settings) {
	this.settings = $.extend(true, {}, this.settings, settings);
	return this.settings;
};

// retourne un string contenant le contenu du template
// url : path relatif du template à partir du dossier "templates"
// format de sortie : peut être "string" ou "html"
// updateWording : true pour updater le wording du template
// WARNING : en l'état, l'update du wording ne marche pas si le template ne possède pas une balise racine
// TODO : implémenter un cache
Toolbox.prototype.getTemplate = function(url, format, updateWording)
{
	// on n'utilise pas notre objet Ajax pour le chargement de templates
	var template = "";
	$.ajax({
		url: "templates/" + url,
		type: 'GET',
		dataType: "html",
		async: false,
		success: function(data) {
			template = data;
		}
	});

	// si le paramètre format est absent ou possède la valeur "string", one retourne le contenu du template
	// directement
	if(!format || format === "string")
		return template;

	// si le format demandé est HTML, on demande à jQuery de créer un élément HTML
	var el;
	if(format === "html")
		el = $(template);

	// sur demande, on update le wording contenu dans l'arbre HTML
	if(updateWording && el)
		$.it.wordings.update(el);

	return el;
};

Toolbox.prototype.getUrlParams = function(query) {
	var result = {},
	nvPairs = ( ( query || "" ).replace( /^\?/, "" ).split( /&/ ) ), i, pair, n, v;

	for ( i = 0; i < nvPairs.length; i++ ) {
		var pstr = nvPairs[ i ];
		if ( pstr ) {
			pair = pstr.split( /=/ );
			n = pair[ 0 ];
			v = pair[ 1 ];
			if ( result[ n ] === undefined ) {
				result[ n ] = v;
			} else {
				if ( typeof result[ n ] !== "object" ) {
					result[ n ] = [ result[ n ] ];
				}
				result[ n ].push( v );
			}
		}
	}

	return result;
};

// teste la disponibilité des API phonegap
Toolbox.prototype.isCordova = function() {
	return window.cordova;
};

// teste la connectivité courante
Toolbox.prototype.networkAvailable = function() {
	if($.it.toolbox.isCordova()) {
		// cordova
		return navigator.connection.type !== Connection.NONE;
	}
	else {
		// html5
		return navigator.onLine;
	}
};


// check whether application is initialized
Toolbox.prototype.isInitialized = function()
{
	return $.it.context.appStatus && $.it.context.appStatus.code === $.app.status.INITIALIZED;
};

// teste la présence de l'OS Android
Toolbox.prototype.isAndroid = function() {
	if(window.device && window.device.platform)
		return (window.device.platform === "Android");
	return false;
};

// teste la présence de l'OS Android en dessous de la version 4 (exclu)
Toolbox.prototype.isOldAndroid = function(){
	return this.isAndroid() && (parseInt(window.device.version, 10) < 4);
};

// retarde l'exécution d'une fonction
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

// create a phonegap mock
// TO BE completed or replaced by something better
Toolbox.prototype.createPhonegapMock = function(){
	Connection = {"WIFI":"WIFI"};
	navigator.network = {
		"connection": {
			"type": Connection.WIFI
		}
	};
	navigator.notification = {
		alert: function(message, callback, titre){
			console.log("bouchon phonegap navigator.notification.alert");
			alert(message);
		},
		confirm: function(message, callback, titre, buttons){
			console.log("bouchon phonegap navigator.notification.confirm");
			callback(2);
		}
	};
	navigator.splashscreen = {
		hide: function(){
			console.log("Hide Splashscreen");
		}
	};
	$.it.context.phonegapMock = true;
};

// affiche des informations de debug pour les développements
// le mock phonegap est-il actif ?
// weinre est-il présent ?
// quel est le contexte réseau ? (lié à $.it.urls.network)
Toolbox.prototype.addDebugInfos = function(){
	$("body").prepend("<div class=\"debug-info\"></div>");
	// phonegap mock detection
	if($.it.context.phonegapMock){
		$(".debug-info").append("<span class=\"green\">mock phonegap</span>");
	}
	// weinre detection
	if(window.modjewel){
		$(".debug-info").append("<span class=\"green\">weinre</span>");
	}
	$(".debug-info").append("<span class=\"green developer\">"+$.it.urls.network.name+"</span>");
};

// ouvre une url dans un navigateur web externe du device
// entraine la sortie de l'application courante
Toolbox.prototype.openExternalPage = function(url){
	// Attention plus valable pour la version 2.4 phonegap
	/*
	if ($.it.toolbox.isAndroid()) {
		navigator.app.loadUrl(url, { openExternal:true });
	}
	else {
		window.open(url);
	}*/
	window.open(url, "_blank");
};

// apparu avec javascript 6, forEach permet de boucler sur un tableau plus simplement
// ce polyfill l'ajoute dans les vieux navigateurs si la méthode n'existe pas
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, context) {
		for (var i = 0; i < this.length; i++) {
			callback.call(context || null, this[i], i, this);
		}
	};
}


// clone un objet javascript
Toolbox.prototype.clone = function(obj)
{
	return JSON.parse(JSON.stringify(obj));
};


// change "el" height in order to fill all remaining space vertically
Toolbox.prototype.useFullHeight = function(elm, forceMaxHeight)
{
	elm = $(elm);
	var elmTopEdge = elm.offset().top;
	var windowBottomEdge = window.innerHeight; //$(window).height();
	var height = windowBottomEdge - elmTopEdge;
	elm.height(height);
	if(forceMaxHeight) {
		elm.css("max-height", height);
	}
};


// pour que les liens provenant de sources externes qui s'ouvrent en target blank ou autre
// soit gérés proprement
Toolbox.prototype.handleTargetBlankUrls = function()
{
	$(document).on("click", "[target=_blank], [target=_new]", function (){
		var href = $(this).attr("href");
		if (href) {
			console.log("openExternalPage: "+href);
			$.it.toolbox.openExternalPage(href);
			return false;
		}
		return true;
	});
};


// search the current locale
// on cordova device, will be a couple <language>-<region>
// on web browser, will be either a <language> or <language>-<region>
//
// Returns a promise object: 
// - on success: the found locale
// - on fail: either the default locale if provided or undefined
Toolbox.prototype.getCurrentLocale = function(defaultLocale)
{
	var locale;
	var dfd = $.Deferred();

	if(defaultLocale) {
		locale = defaultLocale;
	}

	if($.it.toolbox.isCordova())
	{
		var onSuccess = function(loc) {
			locale = loc.value;
			console.log("current locale is: " + JSON.stringify(locale));
			dfd.resolveWith(locale);
		};
		var onFail = function() {
			console.log("current locale is: " + JSON.stringify(locale));
			// returning default locale or undefined
			dfd.rejectWith(locale);
		};
		navigator.globalization.getLocaleName(onSuccess, onFail);
	}
	else
	{
		if(navigator.language) {
			locale = navigator.language;
			console.log("current locale is: " + JSON.stringify(locale));
			dfd.resolveWith(locale);
		}
		else {
			// returning default locale or undefined
			console.log("current locale is: " + JSON.stringify(locale));
			dfd.rejectWith(locale);
		}
	}

	return dfd.promise();
};

// shows an alert popup 
// In Cordova the popup is asynchronous, that's why we use a callback function 
// when the user dismiss the alert by pressing the button.
// In Cordova, it's possible to set the title of the popup and the name 
Toolbox.prototype.alert = function(message, callback, title, buttonName)
{
	if(this.isCordova()){
		navigator.notification.alert(message, callback, title, buttonName);
		navigator.notification.vibrate();
	} else {
		alert(message);
		if(callback){
			callback();
		}
	}
};


// Aide à générer un identifiant "unique" en suffixant <baseId> avec
// un nombre (compteur global à toute l'application)
// si baseId est vide, utilise le préfixe "sequence"
Toolbox.prototype.sequentialId = function(baseId)
{
	if(!this.sequence) {
		this.sequence = 0;
	}
	if(!baseId) {
		baseId = "sequence";
	}
	return baseId + "-" + this.sequence++;
};

// not tested yet
// to be integrated in framework with pagehandler notion
// rajoute un bouton de retour en haut de la page si l'on scrolle de plus de 25%
// Toolbox.prototype.initializeScroller = function(){
// 	// On récupère l'élément
// 	var scroller = $("#scrollToTop");

// 	if(!scroller || (scroller instanceof Array && scroller.length == 0))
// 		return;

// 	// On gère le tap sur l'element
// 	scroller.on("tap", function(event){
// 		$("body").animate({
// 			scrollTop:0
// 		}, "slow");
// 		return false;
// 	});
// 	// On detecte lorsqu'il faut afficher ou cacher l'élement
// 	$(document).on("scrollstop", function(){
// 		if (App.activePage) {
// 			if (!App.activePage.SCROLLER_DISABLED) {

// 				// hauteur en pixels de la partie visible du document par rapport au top
// 				var scrollTop = $(window).scrollTop();
// 				// taille en pixels de 25% de la hauteur totale du doucment
// 				var height = $(window).height() / 4;

// 				// nettoyage du timeout du scroller si on interprète un nouvel event scroll avant l'expiration du timer
// 				if(App.scrollerTimeout) {
// 					clearTimeout(App.scrollerTimeout);
// 					delete App.scrollerTimeout;
// 				}

// 				// callback invoqué après 2s. pour cacher le scroller
// 				var onFadeToCompletion = function(){
// 					App.scrollerTimeout = setTimeout(function() {
// 						scroller.hide();
// 						App.scrollerVisible = false;
// 					}, 2000);
// 				};

// 				// si on a scrollé de plus de 25%
// 				if(scrollTop >= height) {
// 					// affichage du scroller
// 					scroller.fadeTo(100, 0.75, onFadeToCompletion);
// 					App.scrollerVisible = true;
// 				}
// 				// si on est retombé en dessous des 25%
// 				else if(App.scrollerVisible && scrollTop < height) {
// 					// suppression du scroller
// 					scroller.fadeOut(100);
// 					App.scrollerVisible = false;
// 				}
// 			}
// 		}
// 	});
// };

