
// gestion de la configuration de l'application
var Configuration = Object.subClass({
	
	// constructor
	init: function()
	{
		this.defaultSettings = {};
		this.settings = this.defaultSettings;
	},


	// par convention, la clé de l'url pour récupérer les paramètres via un serveur est "config-load"
	// si cette clé est définie, on charge les paramètres en ajax de manière synchrone
	// car cette opération est souvent effectuée au démarrage de l'application
	// le format attendu est un simple JSON avec clé/valeur
	load: function()
	{
		var url = $.it.urls.get("config-load");
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
					var error = new Status(xhr.status, $.it.wordings.msg("config-load-error", [textStatus]));
					dfd.rejectWith(error);
				}
			});
		}
		else {
			// je considère que si l'url n'est pas configurée et qu'on demande quand même le chargement de la
			// configuration, cela correspond à une 404 : configuration introuvable
			var error = new Status(404, $.it.wordings.msg("config-load-invalid"));
			dfd.rejectWith(error);
		}

		return dfd.promise();
	},


	// merge les paramètres actuels avec newSettings
	// si un paramètre existe déjà, il est écrasé
	extend: function(newSettings) {
		if(newSettings) {
			this.settings = $.extend(true, {}, this.settings, newSettings);

			// validation of settings
			this.validate();
		}
	},


	// validating settings after extend
	validate: function()
	{
		// default: nothing to do
	},


	get: function(key)
	{
		if(!key)
			return undefined;

		return this.settings[key];
	}

});

$.it.config = new Configuration();
