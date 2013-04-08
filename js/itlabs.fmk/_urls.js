
// gestion des Urls utilisées dans l'application
//
// Pour travailler sereinement en mode webapp/hybride et partager les urls des services, il est préférable de configurer
// son fichier host pour travailler avec des noms de domaines plutôt que localhost.
//
// Pour mettre à jour son fichier host : http://blog.grapii.com/2012/08/how-to-edit-the-hosts-file-in-mac-os-x-10-8-mountain-lion/
// Pour le projet par exemple : <ip> <nom projet>.dev.itlabs.fr
//
// Pour pouvoir travailler avec la même configuration sur plusieurs projets web, les virtuals hosts d'Apache peuvent aider.
// Dans httpd.conf, par exemple :
//		NameVirtualHost <nom projet>.dev.itlabs.fr
//		<VirtualHost <nom projet>.dev.itlabs.fr>
//			DocumentRoot <path to www folder>
//			ServerName <nom projet>.dev.itlabs.fr
//		</VirtualHost>
//
// Reproduire la manipulation plusieurs fois s'il y a plusieurs projets
//
// Si la clause Directory et le DocumentRoot était précédemment configuré spécifiquement pour un projet, il est peut-être
// préférable de pointer dorénavant sur un dossier commun à tous les projets de plus haut niveau

var Urls = Object.subClass(
{

	// constructor
	init: function(settings)
	{
		this.defaultSettings = {
			network: {
				// <name>: {host: <host>, default: <bool>}
			},
			services: {
				//config-load: <url pour récupérer les paramètres via un serveur>
				//wording-load: <url pour récupérer le wording via un serveur>
			}
		};
		this.settings = this.defaultSettings;
		this.extend(settings);
	},


	// pour récupérer l'url absolue ou relative d'un service
	// @param id : clé de l'url
	// @param params : paramètres complémentaires à renseigner dans l'url
	// @param relative : indique si l'url doit contenir le nom d'hôte ou pas
	get: function(id, params) {

		if(!id)
			return;

		if(!this.settings && !this.settings.services && !this.settings.services[id])
			return;

		var host = "";

		var value = this.settings.services[id];

		// mais si c'est un objet et qu'on à spécifié un réseau, alors
		// il faut prendre le bon hôte
		var url = "";
		if(value instanceof Object)
		{
			if(value && value.url) {
				if(value.network) {
					host = this.getHost(value.network);
				}
				url = value.url;
			}
		}
		// si value est un string, il n'y a rien à faire
		else {
			url = value;
		}

		// si pas de host explicite, on prend celui par défaut
		if(host === "" && this.settings.defaultNetwork && this.settings.defaultNetwork.host) {
			host = this.settings.defaultNetwork.host;
		}

		var service = $.it.toolbox.fillParams(url, params);

		// en mode mock on remplace le point d'interrogation par un underscore plus filesystem friendly
		if($.it.context.ajaxMock) {
			service = service.replace(/\?/gi, "_");
		}

		return host + service;
	},


	// retourne l'hôte associé au nom de réseau donné
	// @param name of the network to use
	getHost: function(networkName)
	{
		if(networkName && this.settings && this.settings.network && this.settings.network[networkName]) {
			return this.settings.network[networkName].host;
		}
	},


	// retourne le réseau associé au nom <networkName>
	// @param name of the network to use
	getNetwork: function(networkName)
	{
		if(networkName && this.settings && this.settings.network && this.settings.network[networkName]) {
			return this.settings.network[networkName];
		}
	},


	// pour ajouter de nouvelles urls
	extend: function(settings) {
		if(!settings)
			return;
		this.settings = $.extend(true, {}, this.settings, settings);
		this.findDefaultNetwork();
	},


	// search and return default network
	findDefaultNetwork: function()
	{
		var nwk;
		// en mode mock, le réseau par défaut, c'est le mock
		if($.it.context.ajaxMock) {
			nwk = this.getNetwork("mock");
			if(nwk) {
				this.settings.defaultNetwork = nwk;
				return nwk;
			}
		}
		// sinon on regarde si un réseau possède le flag "default"
		for(var name in this.settings.network) {
			nwk = this.settings.network[name];
			if(nwk["default"]) {
				this.settings.defaultNetwork = nwk;
				return nwk;
			}
		}
	},


	// retourne une copie du jeu complet d'urls
	raw: function()
	{
		return $.it.toolbox.clone(this.settings);
	},


	// active le moke local
	// pratique pour tester sans connexion
	// @TODO intégrer en mode webapp (impliquerait d'utiliser la notion de cache local (mode offline) apparu avec HTML5)
	// launch an "ajaxmockon" event on document
	enableAjaxMock: function()
	{
		// backup des urls
		this.urlsBackup = $.it.urls.raw();
		// pour autoriser les urls de type file:
		$.it.ajax.settings.enableFileUrl = true;
		// flag pour savoir qu'on est en mode mock
		$.it.context.ajaxMock = true;
		// création d'un "network" spécial pour ne plus pointer sur un serveur distant mais sur notre répertoire local de mock
		$.it.urls.extend({
			network: {
				"mock": {
					"host": "mock/"
				}
			}
		});
		$(document).trigger($.Event("ajaxmockon"));
	},


	// désactive le moke local
	// launch an "ajaxmockoff" event on document
	disableAjaxMock: function()
	{
		$.it.ajax.settings.enableFileUrl = false;
		$.it.context.ajaxMock = false;
		// restauration de l'hôte
		$.it.urls.extend(this.urlsBackup);
		// le backup n'est plus nécessaire
		delete this.urlsBackup;
		$(document).trigger($.Event("ajaxmockoff"));
	},


	isAjaxMockEnabled: function()
	{
		return $.it.context.ajaxMock;
	}

});

// enregistrement dans le namespace IT&L@bs
$.it.urls = new Urls();