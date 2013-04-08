
// gestion des chaines de caractères de l'application
var Wordings = Object.subClass(
{

	// constructor
	init: function()
	{
		this.defaultLabels = {
			"back-button": "Back",
			"mandatory-arguments": "Mandatory argument(s) missing: {0}",
			"geolocation-api-missing": "no geolocation API",
			"quit-application": "Do you want to quit application ?",
			"config-load-error": "Failed to load configuration: {0}",
			"config-load-invalid": "Failed to load configuration: url <config-load> not found",
			"wordings-load-error": "Failed to load wordings: {0}",
			"wordings-load-invalid": "Failed to load wordings: url <wording-load> not found",
			"loading": "Loading...",
			"cancel-loading": "tap to cancel",
			"geolocation-permission-denied": "Geolocation was forbidden",
			"geolocation-position-unavailable": "Geolocation unavailable",
			"connectivity-error": "Network unavailable. Please check your connectivity and try later.",
			"connectivity-error-header": "Network error",
			"init-fatal-error": "Application failed to initialize. Please check your connectivity and try later.",
			"Error": "Error",
			"customer": "ALD Automotive",
			"menu-title": "Menu"
		};
		this.labels = $.it.toolbox.clone(this.defaultLabels);
	},


	// update : Permet d'insérer le wording de l'élément sur détection de l'attribut "data-wording-key"
	// element : élément HTML
	update: function(element)
	{
		var self = this;
		var id = element.id ? element.id : "'no id'";
		console.log("updating wordings of : " + id);
		var updateElement = function(index, element){
			element = $(element);
			var key = element.attr("data-wording-key");
			var attribute = element.attr("data-wording-attribute");
			if(attribute){
				element.attr(attribute, self.msg(key));
			} else{
				element.append(self.msg(key));
			}
		};
		$(element).find('[data-wording-key]').each(updateElement);
	},


	// contrairement à msg, cette fonction retourne la valeur associée à la clé directement sans traitement particulier
	// pratique pour retourner un graphe de clé/valeur
	get: function(key)
	{
		return this.labels[key];
	},


	// retourne la valeur associée à "key" en remplaçant les placeholders de type {X} à partir de params
	msg: function(key, params)
	{
		return $.it.toolbox.fillParams(this.labels[key], params);
	},


	// merge les wordings actuels avec newLabels
	// si un wording existe déjà, il est écrasé
	extend: function(newLabels)
	{
		if(!newLabels) return;
		this.labels = $.extend(true, {}, this.labels, newLabels);
	},


	// par convention, la clé de l'url pour récupérer le wording via un serveur est "wording-load"
	// si cette clé est définie, on charge le wording en ajax de manière synchrone
	// car cette opération est souvent effectuée au démarrage de l'application
	// le format attendu est un simple JSON avec clé/valeur
	// @return si l'url n'est pas définie, retourne undefined
	// @return si l'url est définie, un objet Promise de jQuery avec les données reçues en contexte
	load: function(params)
	{
		var url = $.it.urls.get("wording-load");
		if(params)
			url = $.it.toolbox.fillParams(url, [params]);

		var dfd = $.Deferred();

		if(url)
		{
			var self = this;
			$.it.ajax.call({
				url: url,
				connectivityError:false,
				type: 'GET',
				async: false,
				isCancelable : false,
				successCallback: function(data, textStatus, xhr) {
					self.extend(data);
					dfd.resolve();
				},
				errorCallback: function(data, xhr, textStatus, errorThrown) {
					// le serveur ne retourne pas de JSON dans le format attendu mais du html, donc je créé
					// moi même un objet JS d'erreur
					var error = new Status(xhr.status, $.it.wordings.msg("wordings-load-error", [textStatus]));
					dfd.rejectWith(error);
				}
			});
		}
		else {
			// je considère que si l'url n'est pas configurée et qu'on demande quand même le chargement du
			// wordings, cela correspond à une 404 : wordings introuvable
			var error = new Status(404, $.it.wordings.msg("wordings-load-invalid"));
			dfd.rejectWith(error);
		}

		return dfd.promise();
	}

});

// enregistrement dans le namespace IT&L@bs
$.it.wordings = new Wordings();