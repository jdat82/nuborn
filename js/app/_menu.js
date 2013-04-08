
// gère un panel (composant jQuery Mobile) pour une page donnée
var Menu = Object.subClass(
{

	// constructeur
	// @param page: html element holding the menu
	init: function(page)
	{
		if(!page) {
			throw $.it.wordings.msg("mandatory-arguments", ["page"]);
		}
		this.html = {};
		this.html.page = $(page);

		this.load();
	},


	createHtmlElements: function()
	{
		this.html.menu = this.html.page.find("#menu");
	},


	open: function()
	{
		if(!this.html.menu) {
			this.load();
		}

		this.html.menu.panel("open");
	},


	close: function()
	{
		if(!this.html.menu) {
			this.load();
		}

		this.html.menu.panel("close");
	},


	load: function()
	{
		if(this.html.menu) {
			return; // already loaded
		}

		this.createHtmlElements();

		if(!this.html.menu) {
			throw "no menu found";
		}

		// injection du menu latéral gauche
		var menuContent = $.it.toolbox.getTemplate("menu/menu.html", "html", true);
		this.html.menu.append(menuContent);
		this.html.menu.trigger("updatelayout");

		// quand on clique sur un item du menu, on ferme le menu
		var that = this;
		var itemSelectionCallback = function(event)
		{
			that.html.menu.panel("close");
			// event.stopPropagation();
		};
		this.html.menu.find("a").click(itemSelectionCallback);
	}

});