
// Modal loader which takes all available space in jquery mobile page (identified by [data-role=page]).
var PageLoader = Loader.subClass(
{
	// constructeur
	// @param settings : Format :
	// {
	//		showLoadingMsg: boolean (default true)
	//		showCancelMsg: boolean (default false)
	//		beforeShowHandler: callback function which receive the html element and the params given to #show,	
	//		clickHandler: callback function which receive the event and the params given to #show,
	//		backButtonHandler: callback function which receive the event and the params given to #show,
	//		beforeHideHandler: callback function which receive the html element
	// }
	init: function(settings)
	{
		this._super(settings);
	},


	createHtmlElements: function()
	{
		// chargement du template
		var loader = $.it.toolbox.getTemplate("loader/page-loader.html", "html", true);

		// génération d'un identifiant unique pour l'élément racine
		var newId = $.it.toolbox.sequentialId(loader.attr("id"));
		loader.attr("id", newId);

		// ajout au DOM
		$("body").append(loader);

		// création des références sur les noeuds HTML qu'on réutilisera
		this.html = {};
		this.html.loader = $("#"+newId);
		this.html.container = this.html.loader.find(".container");
		this.html.spinnerContainer = this.html.container.find(".spinner-container");

		// forçage de la width et de la height du loader en fonction de la taille du viewport
		var width = $(window).width();
		var height = $(window).height();
		this.html.container.css("width", width+"px");
		this.html.container.css("height", height+"px");

		// sur demande, on cache le message de chargement
		if(this.settings.showLoadingMsg === false) {
			this.html.container.find(".title").hide();
		}

		// sur demande on affichhe le message d'annulation qui n'est pas affiché par défaut
		if(this.settings.showCancelMsg) {
			this.html.container.find(".message").show();
		}
	},


	// callback qui désactive le scrolling
	touchMoveCallback: function(event)
	{
		return false;
	},


	// affiche le loader sur toute la page
	show: function(params)
	{
		this._super(params);

		if(!this.html) {
			this.createHtmlElements();
		}

		var that = this;

		// champs texte qui ont le focus
		var inputsInPage = $("input[type=text]:focus, input[type=password]:focus", $.mobile.activePage);
		if(inputsInPage && inputsInPage.length) {
			// hack pour cacher le clavier natif pour éviter qu'il décale la window
			inputsInPage.blur();
		}

		// hack pour faire en sorte que le Loader prenne touours la totalité de l'écran
		// en replaçant silencieusement le scroll tout en haut
		var scrollTop = $(window).scrollTop();
		$.mobile.silentScroll(scrollTop);

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

			// on désactive le scrolling
			$(document).on("touchmove", that.touchMoveCallback);
		};

		setTimeout(realShow, 100);
	},


	// cache le loader
	hide: function()
	{
		this._super();

		// si l'appelant à défini une callback pour beforeHide
		if(this.settings && this.settings.beforeHideHandler) {
			this.settings.beforeHideHandler(this.html.loader);
		}

		// on réactive le scrolling
		$(document).off("touchmove", this.touchMoveCallback);

		this.html.loader.hide();
	},


	// remove loader from DOM and internal objects
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
