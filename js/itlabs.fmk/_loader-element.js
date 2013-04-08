
// Loader which appears above an HTML element
var ElementLoader = Loader.subClass(
{
	// constructeur
	// @param settings: {
	//		element: html element on which we apply an overlay
	//		showLoadingMsg: boolean (default true)
	//		beforeShowHandler: callback function which receive the html element and the params given to #show,	
	//		clickHandler: callback function which receive the event and the params given to #show,
	//		backButtonHandler: callback function which receive the event and the params given to #show,
	//		beforeHideHandler: callback function which receive the html element
	// }
	init: function(settings)
	{
		this._super(settings);

		// il faut obligatoirement spécifier un élément html pour utiliser un ElementLoader
		if(!this.settings.element) {
			throw $.it.wordings.msg("mandatory-arguments", ["element"]);
		}

		// transformation de l'élément sur lequel on applique l'overlay en objet jQuery si nécessaire
		if(!(this.settings.element instanceof jQuery)) {
			this.settings.element = $(this.settings.element);
		}
	},


	createHtmlElements: function()
	{
		// chargement du template
		var loader = $.it.toolbox.getTemplate("loader/element-loader.html", "html", true);

		// génération d'un identifiant unique pour l'élément racine
		var newId = $.it.toolbox.sequentialId(loader.attr("id"));
		loader.attr("id", newId);

		// calcul des propriétés css du loader calquées sur celles de l'élément html par dessus lequel on s'affiche
		var container = loader.find(".container");
		loader.css("width", this.settings.element.outerWidth()+"px");
		loader.css("height", this.settings.element.outerHeight()+"px");
		loader.offset(this.settings.element.offset());
		container.css("width", this.settings.element.outerWidth()+"px");
		container.css("height", this.settings.element.outerHeight()+"px");
		container.css("border-radius", this.settings.element.css("border-radius"));

		// sur demande, on cache le message de chargement
		if(this.settings.showLoadingMsg === false) {
			container.find(".title").hide();
		}

		// ajout au DOM
		$("body").append(loader);

		// création des références sur les noeuds HTML qu'on réutilisera
		this.html = {};
		this.html.loader = $("#"+newId);
		this.html.container = this.html.loader.find(".container");
		this.html.spinnerContainer = this.html.container.find(".spinner-container");
	},


	// affiche le loader
	show: function(params)
	{
		this._super(params);

		if(!this.html) {
			this.createHtmlElements();
		}

		var that = this;

		// si l'appelant à défini une callback pour beforeShow
		if(this.settings && this.settings.beforeShowHandler) {
			that.settings.beforeShowHandler(this.html.loader, params);
		}

		var realShow = function()
		{
			// si l'appelant à défini une callback pour le click
			if(that.settings && that.settings.clickHandler) {
				that.html.spinnerContainer.one("tap", function(event) {
					return that.settings.clickHandler(event, params);
				});
			}

			// si l'appelant à défini une callback pour le back button d'Android
			if(that.settings && that.settings.backButtonHandler) {
				$(document).on("backbutton", function(event) {
					return that.settings.backButtonHandler(event, params);
				});
			}

			// on affiche le loader
			that.html.loader.show();
		};

		setTimeout(realShow, 100);
	},


	// contrairement au page loader qui reste en mémoire, l'element loader n'a pas vocation à rester en mémoire
	hide: function()
	{
		this._super();

		// si l'appelant à défini une callback pour beforeHide
		if(this.settings && this.settings.beforeHideHandler) {
			this.settings.beforeHideHandler(this.html.loader);
		}

		this.destroy();
	},


	destroy: function()
	{
		this._super();

		this.html.loader.remove();
		for(var key in this.html) {
			delete this.html[key];
		}
		delete this.html;
	}

});