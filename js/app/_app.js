
$.app.version = "1.0";

$.app.status = {
	INITIALIZED:0,
	NOT_INITIALIZED:1
};


$.app.ready = function()
{
	// on ajoute nos traitements à la fin de la boucle d'évènements pour ne pas bloquer le DOM
	setTimeout(function(){
		// si l'on est en mode web, on s'initialise de manière classique
		if(!$.it.toolbox.isCordova()) {
			console.log("HTML5 webapp");
			$.app.init();
		}
		// sinon on attend le GO de Cordova
		else {
			document.addEventListener("deviceready", $.app.init, false);
		}
	}, 100);
};

$.app.init = function() {

	// gestion de l'effet de transition de page par défaut
	$.app.setDefaultPageTransition();

	$.app.setCurrentLocale();

	// pour pouvoir appliquer des styles propres à Android 2.x
	if($.it.toolbox.isOldAndroid()) {
		$(document.body).addClass("old-android");
	}

	$.it.toolbox.handleTargetBlankUrls();

	var error;
	// executed if initialization process is not successful (wordings or configuration failed)
	var initializationFailed = function()
	{
		if(!$.it.toolbox.networkAvailable()) {
			error = $.it.wordings.msg("connectivity-error");
		}
		else {
			error = $.it.wordings.msg("init-fatal-error");
		}

		console.log(error);

		// flag global conservé dans le contexte pour savoir si on a démarré normalement
		$.it.context.appStatus = new Status($.app.status.NOT_INITIALIZED, error);

		$.app.splashscreenPH.hideLoaderIcon();

		// le splashcreen natif est caché manuellement lorsque l'$.application est prête
		if(navigator.splashscreen && navigator.splashscreen.hide) {
			navigator.splashscreen.hide();
		}

		// TODO on webapp replace with a beautiful popup
		if(!$.it.toolbox.networkAvailable()) {
			$.it.error.showConnectivityError();
		}
		else {
			$.it.error.showInitFatalError();
		}
	};

	// executed if initialization process is done completely
	var initializationDone = function()
	{
		// flag global conservé dans le contexte pour savoir si a démarré normalement
		$.it.context.appStatus = new Status($.app.status.INITIALIZED);

		// on cache la page du splashscreen (utile uniquement sur le web) pour aller vers la page d'accueil
		$.app.splashscreenPH.hideSplashscreen();

		// le splashcreen natif est caché manuellement lorsque l'application est prête
		if(navigator.splashscreen && navigator.splashscreen.hide) {
			navigator.splashscreen.hide();
		}

		console.log("ready");

		$.mobile.initializePage();
	};

	// chargement du wordings de manière synchrone
	// chargement de la configuration de manière synchrone
	$.when($.it.config.load(), $.it.wordings.load($.it.context.locale)).fail(initializationFailed).done(initializationDone);
};

// définition de la transition par défaut
$.app.setDefaultPageTransition = function()
{
	if($.it.toolbox.isOldAndroid()) {
		// par défaut jQuery Mobile utilise fade si le navigateur est trop peu performant en 3D
		// par expérience, il vaut mieux carrément désactiver les animations jQuery Mobile
		// sur les terminaux Android en dessous de 4.0
		$.mobile.defaultPageTransition = "none";
	}
	else {
		$.mobile.defaultPageTransition = "slide";
	}
};


// definition de la locale
$.app.setCurrentLocale = function()
{
	var callback = function() {
		// do something...
	};
	// default locale is en-US
	$.it.toolbox.getCurrentLocale("en-US").done(callback).fail(callback);
};


// traitement générique à appliquer sur l'event resume
// c'est le PagesManager qui invoque cette méthode automatiquement
// si elle est définie
$.app.resume = function()
{
	// si l'application n'a pas été initialisée correctement
	// on retente...
	if(!$.it.toolbox.isInitialized()) {
		$.app.init();
	}
};


// définition en dur du contexte du mock
$.app.useMock = function()
{
	// traitements spécifiques en mode mock
	$(document).on("ajaxmockon", function(){
		console.log("mock on");
		// do something...
	});

	// traitements spécifiques lorsque l'on quitte le mode mock
	$(document).on("ajaxmockoff", function(){
		console.log("mock off");
		// do something...
	});

	// activation du mode mock
	$.it.urls.enableAjaxMock();
};


