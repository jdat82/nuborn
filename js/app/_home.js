
var HomePH = PageHandler.subClass(
{
	// constructeur
	init: function()
	{
		this._super({
			ID: "home-page",
			URL: "home.html"
		});

		// création du namespace categories
		$.it.context.search = $.it.context.search || { point: {} };
	},


	// surcharge de l'évènement pageinit
	pageInit: function(event, data)
	{
		this._super(event, data);

		// le code qui suit est appelé après #createHtmlElements et #createDataElements

		// sauvegarde d'une référence vers son contrôleur javascript dans data
		this.data.menu = new Menu(this.html.page);
	},


	// invoquée automatiquement lors de l'event pageInit
	// surcharger la méthode #pageInit au besoin
	//
	// la méthode en elle même n'est pas très importante
	// mais il est important de stocker ses références vers les éléments du DOM sous un objet commun
	// pour permettre leur libération automatique et améliorer la lisibilité et les performances
	// la classe parente PageHandler créé automatiquement un attribut "html" dans ce but
	createHtmlElements: function()
	{
		this.html.pageContent = this.html.page.find(".page-content");
	},


	// invoquée automatiquement lors de l'event pageInit
	// surcharger la méthode #pageInit au besoin
	//
	// la méthode en elle même n'est pas très importante
	// mais il est important de stocker ses références vers des objets javascripts divers et variés sous un même objet
	// pour permettre leur libération automatique et améliorer la lisibilité et les performances
	// la classe parente PageHandler créé automatiquement un attribut "data" dans ce but
	createDataElements: function()
	{
		// this.data.xyz = ...;
	}

});

$.app.homePH = new HomePH();
