
var AjaxLoader = Loader.subClass(
{

	// constructeur
	init: function(settings)
	{
		// action commune par défaut lors du clic sur le loader
		var cancelAction = function(ajaxSettings)
		{
			if(ajaxSettings.isCancelable && ajaxSettings.cancel) {
				ajaxSettings.cancel();
			}
		};

		this.settings = this.settings || {};
		this.data = this.data || {};

		// settings par défaut pour le page loader
		this.settings.defaultPageLoaderSettings = {

			// traitement avant l'affichage du loader
			beforeShowHandler: function(el$, ajaxSettings)
			{
				console.log("loader before show");
				if(ajaxSettings.isCancelable) {
					el$.find(".message").removeClass("hidden");
				}
				else {
					el$.find(".message").addClass("hidden");
				}
			},

			// permet d'annuler la requête ajax en cours sur un tap
			clickHandler: function(event, ajaxSettings)
			{
				console.log("loader click handler");
				cancelAction(ajaxSettings);
				return false;
			},


			// permet d'annuler la requête ajax en cours sur un back
			backButtonHandler: function(event, ajaxSettings)
			{
				console.log("loader back button");
				cancelAction(ajaxSettings);
				// pas de prevent default car on laisse le comportement naturel ou surchargé du back button s'appliquer
			},


			beforeHideHandler: function(el$)
			{
				console.log("loader before hide");
			}

		};

		// settings par défault pour les éléments loader
		this.settings.defaultElementLoaderSettings = {
			showLoadingMsg: false
		};

		// va merger les settings passés en paramètre du constructeur et celles définies ici
		this._super(settings);
	},


	// affiche le bon loader selon les paramètres ajax de la requête
	// soit le page loader, soit un nouvel élément loader
	show: function(ajaxSettings)
	{
		if(!ajaxSettings || !ajaxSettings.enableAjaxLoader) {
			return;
		}

		if(ajaxSettings.showAjaxLoaderOn) {

			this.data.elementLoaders = this.data.elementLoaders || {};

			// récupération de l'élément html sur lequel on affiche le loader
			var elt$ = $(ajaxSettings.showAjaxLoaderOn);

			// on a besoin d'un id sur cet élément obligatoirement pour pouvoir le retrouver plus tard
			if(!elt$.attr("id")) {
				elt$.attr("id", $.it.toolbox.sequentialId());
			}

			// merge des settings par défaut et des settings courantes
			var newSettings = $.extend(true, {}, this.settings.defaultElementLoaderSettings, {
				element: elt$
			});

			// création d'un nouveau loader pour chaque requête
			var el = new ElementLoader(newSettings);

			// enregistrement du loader dans la liste des loaders en cours en se basant sur l'id
			// de l'élément html pour lequel on affiche un loader car c'est cette info que l'on retrouvera
			// ensuite dans le hide qui nous permettra de le retrouver
			this.data.elementLoaders[elt$.attr("id")] = el;

			// affichage du loader
			el.show(ajaxSettings);
		}
		else {
			// on ne peut avoir qu'un seul page loader pour toute l'application
			this.data.pageLoader = this.data.pageLoader || new PageLoader(this.settings.defaultPageLoaderSettings);

			// affichage du loader
			this.data.pageLoader.show(ajaxSettings);
		}
	},


	// cache le bon loader en fonction des paramètres ajax de la requête
	// soit le page loader, soit l'élément loader concerné par la requête
	hide: function(ajaxSettings)
	{
		if(!ajaxSettings || !ajaxSettings.enableAjaxLoader) {
			return;
		}

		// si c'est pour un element loader
		if(ajaxSettings.showAjaxLoaderOn) {

			// récupération de l'élément html sur lequel on affiche le loader
			var elt$ = $(ajaxSettings.showAjaxLoaderOn);

			// récupération du loader associé à notre élément html
			var loader = this.data.elementLoaders[elt$.attr("id")];

			// on cache et on supprime le loader
			loader.hide();

			// on le supprime des références en cours
			delete this.data.elementLoaders[elt$.attr("id")];
		}
		// si c'est pour un page loader
		else {

			// on cache le page loader
			this.data.pageLoader.hide();
		}
	},


	destroy: function()
	{
		this._super();
		this.data.pageLoader.destroy();
		for(var key in this.data.elementLoaders) {
			this.data.elementLoaders[key].destroy();
		}
		for(key in this.data) {
			delete this.data[key];
		}
		delete this.data;
	}

});

$.it.loader = $.it.loader || {};
$.it.loader.ajaxLoader = new AjaxLoader();
