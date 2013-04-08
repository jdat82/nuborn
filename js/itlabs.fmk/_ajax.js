
/***** AJAX SETTINGS ******/

var AjaxSettings =
{
	// Timeout des requetes Ajax
	timeout: 10000,


	// On reçoit du JSON
	dataType: 'json',


	// On désactive le cache sur les requêtes Ajax
	cache: false,


	// On force la webview a supprimer le cache à chaque requête
	headers: { "cache-control": "no-cache" },


	// Par défaut, les requête sont envoyées en tant que formulaire encodés en UTF-8
	contentType: "application/x-www-form-urlencoded; charset=UTF-8",


	// enable file: url (useful for phonegap app)
	enableFileUrl: false,


	// Par défaut, on n'affiche pas le loader d'activité pour les requêtes ajax
	enableAjaxLoader: false,


	// délai minimum d'affichage du loader ajax pour éviter un effet blink
	minAjaxLoaderDelay: 500,


	// objet sur lequel positionner le loader si ce n'est pas l'intégralité de la page
	//showAjaxLoaderOn: ...,


	// par défaut, on affiche un message d'erreur lorsque le device n'est pas connecté à Internet
	connectivityError: true,


	// Par défaut, les requêtes Ajax ne peuvent être annulées
	isCancelable: false,


	// avant d'envoyer une requête, ...
	beforeSend: function(xhr, mySettings)
	{
		// on teste la connectivité du device
		if(!$.it.toolbox.networkAvailable() && !$.it.context.ajaxMock)
		{
			// si on a autorisé l'affichage d'un message générique en cas d'erreur de connectivité
			if(mySettings.connectivityError) {
				$.it.error.showConnectivityError();
			}
			// on execute la méthode errorCallback() de l'appelant si fournie
			var textStatus = "No Conectivity";
			var errorThrown = "The device is not connected to the internet, the request is aborted";
			if(mySettings.errorCallback) {
				var data = new Status(GenericStatus.NOK, textStatus, [], errorThrown);
				mySettings.errorCallback(data, xhr, textStatus, errorThrown);
			}
			// on retourne false pour stopper la requête ajax
			return false;
		}

		// On enregistre la date à laquelle la requete est appelée
		mySettings.startTime = new Date().getTime();

		// on ajoute la requete a la liste des requetes actives
		$.it.context.ajax.addToActiveRequests(mySettings);

		// par défaut pour toute requête ajax on affiche un loader :
		// - soit sur l'intégralité de la page
		// - soit sur un élément HTML précis
		// - sauf si le paramètre "disableLoader" est positionné à false
		if(mySettings.enableAjaxLoader) {
			$.it.loader.ajaxLoader.show(mySettings);
		}

		// on garde le xhr en mémoire pour pouvoir annuler la requête plus tard
		mySettings.currentXHR = xhr;

		// si on a une callback pour le before send, on l'invoque
		if(mySettings.beforeSendCallback) {
			mySettings.beforeSendCallback(xhr, mySettings);
		}

		// si il n'y a pas de probleme de connectivite, on retourne true pour continuer l'envoi de
		// la requête ajax
		return true;
	},


	// traitement générique pour les requêtes ajax en succès
	success: function(data, textStatus, xhr)
	{
		console.log("ajax success");

		// sauvegarde du this pour réutilisation dans la fonction next
		var that = this;

		var next = function(){
			$.it.context.ajax.removeFromActiveRequests(that);
			if(that.enableAjaxLoader) {
				$.it.loader.ajaxLoader.hide(that);
			}
			// traitement spécifique de l'appelant quand la requête ajax à réussi
			that.successCallback(data, textStatus, xhr);
			that.completeCallback(data, xhr, textStatus);
		};

		// next sera appelé après un petit délai pour ne pas avoir d'effet blink
		// le délai est calculé pour que l'affichage du loader dure au moins autant que
		// la propriété "minAjaxLoaderDelay" des settings ajax
		var duration = new Date().getTime() - this.startTime;
		console.log("Duree requete ajax : " + duration + "ms");

		if(duration >= this.minAjaxLoaderDelay) {
			next();
		}
		else {
			var timeout = setTimeout(next, this.minAjaxLoaderDelay - duration);
			// enregistrement dans le loader du timeout courant pour l'exécution du code métier de l'appelant
			// car si l'utilisateur annule la requête, il ne peut plus annuler la requête ajax
			// mais seulement le traitement qui en découle
			this.timeoutForAlreadyReceivedResponse = timeout;
		}
	},


	// Traitement des erreurs génériques en reponse aux appels ajax.
	//
	// On part du principe que le serveur peut retourner un JSON dans le cadre d'une erreur.
	// Cela peut-être le contexte de l'erreur et son explication.
	// Le minimum attendu est par exemple :
	//		{
	//			code: 400,
	//			message: "paramètre ID ne peut être nul"
	//		}
	//
	// Dans l'idéal le serveur devrait toujours retourner les paramètres reçu dans sa réponse
	// pour faciliter le débogage.
	// Ex:
	//		{
	//			code: 400,
	//			message: "paramètre ID ne peut être nul",
	//			args: { "arg1":"value1","arg2":"value2" }
	//		}
	//
	// Si le retour du serveur est un JSON, il est fourni tel quel à errorCallback
	// Si ce n'est pas un JSON, l'objet data fourni à errorCallback est un object
	// avec un champ "rawMessage" qui contient le retour du serveur (xhr.responseText)
	//
	// "errorCallback" recevra toujours un objet javascript représentant le retour du serveur
	// en premier paramètre.
	//
	// Néanmoins, le serveur devrait toujours retourner des codes de status HTTP représentatif
	// même si l'info est déjà dans le JSON
	//		Ex: 400 pour BAD REQUEST quand les données entrées sont invalides
	// Retourner un 200 quand la requête n'a pas été traitée par le serveur est un non sens.
	// http://tools.ietf.org/html/rfc2616
	error: function(xhr, textStatus, errorThrown)
	{
		var data;
		try {
			data = JSON.parse(xhr.responseText);
		}
		catch(e) {
			data = new Status(xhr.status, xhr.responseText);
		}

		console.log("ajax error - textStatus: " + textStatus);
		console.log("ajax error - http code: " + xhr.status);
		console.log("ajax error - errorThrown: " + errorThrown);
		if(data && data.message) {
			console.log("ajax error - server message: " + data.message);
		}

		// si la requête est locale (file:), on ne fait rien en cas d'erreur
		// n'a de sens que dans les applications phonegap si les fichiers html sont hébergés localement
		if(this.enableFileUrl && !this.crossDomain) {
			return;
		}

		var that = this;

		var next = function(){
			// on supprime la requete du contexte global
			$.it.context.ajax.removeFromActiveRequests(that);
			if(that.enableAjaxLoader) {
				$.it.loader.ajaxLoader.hide(that);
			}
			// si la requête à été annulé on squeeze les callbacks
			if(textStatus !== "abort") {
				that.errorCallback(data, xhr, textStatus, errorThrown);
				that.completeCallback(data, xhr, textStatus);
			}
		};
		// next sera appelé après un petit délai pour ne pas avoir d'effet blink
		// le délai est calculé pour que l'affichage du loader dure au moins autant que
		// la propriété "minAjaxLoaderDelay" des settings ajax
		var duration = new Date().getTime() - this.startTime;
		console.log("Duree requete ajax : " + duration + "ms");

		if(duration >= this.minAjaxLoaderDelay) {
			next();
		}
		else {
			var timeout = setTimeout(next, this.minAjaxLoaderDelay - duration);
			// enregistrement dans le loader du timeout courant pour l'exécution du code métier de l'appelant
			// car si l'utilisateur annule la requête, il ne peut plus annuler la requête ajax
			// mais seulement le traitement qui en découle
			this.timeoutForAlreadyReceivedResponse = timeout;
		}
	},


	// comportement si la requête est annulée avant ou après la réception des données
	cancel: function()
	{
		console.log("ajax cancel");

		// si la requete ne peut pas etre annulée, on ne fait rien
		if(!this.isCancelable) {
			return false;
		}

		// on supprime la requete du contexte global
		$.it.context.ajax.removeFromActiveRequests(this);

		// on cache le loader lié à la requête
		if(this.enableAjaxLoader) {
			$.it.loader.ajaxLoader.hide(this);
		}

		// cas où l'on a déjà reçu la réponse du serveur
		if(this.timeoutForAlreadyReceivedResponse) {
			// empêche l'execution de la callback associé à la reception de la réponse ajax
			clearTimeout(this.timeoutForAlreadyReceivedResponse);
			this.cancelCallback(true);
		}
		// cas où l'on à vraiment annulé la requête ajax avant d'avoir reçu la réponse du serveur
		else {
			this.currentXHR.abort();
			this.cancelCallback(false);
			this.completeCallback(null, this.currentXHR, "cancel");
		}
	},


	// Ne fait rien par défaut
	complete: function(xhr, textStatus)
	{
		// console.log("ajax complete");
	},


	// Méthode à surcharger
	successCallback: function(data, textStatus, xhr)
	{
	},


	// Méthode à surcharger
	// data : le retour du serveur
	errorCallback: function(data, xhr, textStatus, errorThrown)
	{
	},


	// Méthode à surcharger
	completeCallback: function(data, xhr, textStatus)
	{
	},


	// Méthode à surcharger
	cancelCallback: function(responseReceived)
	{
	}

};


/***** AJAX CONTEXT ******/

var AjaxContext = Object.subClass(
{
	init: function()
	{
		this.activeRequests = {};
	},


	// permet d'annuler toutes les requetes actives
	cancelAllActiveRequests: function()
	{
		for(var key in this.activeRequests){
			this.activeRequests[key].cancel();
		}
	},


	// ajouter un requete aux requetes actives
	addToActiveRequests: function(request)
	{
		this.activeRequests[request.startTime] = request;
	},


	// supprimer un requête des requetes actives
	removeFromActiveRequests: function(request)
	{
		delete this.activeRequests[request.startTime];
	}

});

$.it.context.ajax = new AjaxContext();


/***** AJAX MANAGER ******/

// Permet de gérer les paramètres des requêtes Ajax
var AjaxManager = Object.subClass(
{

	// constructeur
	init: function(settings)
	{
		// settings par défaut pour les appels ajax
		this.settings = $.extend(true, {}, AjaxSettings, settings);
	},


	// Lancer un appel Ajax à partir des paramètres définis ci dessus
	call: function(settings)
	{
		console.log("Ajax: " + settings.url);
		var mergedSettings = $.extend(true, {}, this.settings, settings);
		return $.ajax(mergedSettings);
	}

});

// enregistrement dans le namespace IT&L@bs
$.it.ajax = new AjaxManager();

