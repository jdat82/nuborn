
var OtherPH = PageHandler.subClass(
{

	// constructeur
	init: function()
	{
		this._super({
			ID: "other-page",
			URL: "other.html"
		});

	},

	// surcharge de l'évènement pageinit
	pageInit: function(event, data)
	{
		this._super(event, data);

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

$.app.otherPH = new OtherPH();