
var PageHandler = Object.subClass(
{

	// constructeur
	init: function(settings)
	{
		this.settings = $.extend(true, {}, settings);
		this.html = {};
		this.data = {};
		$.it.pagesManager.registerPageHandler(this);
		console.log("new page handler with id '" + this.settings.ID + "'");
	},


	pageBeforeCreate: function(event, data)
	{
		console.log("page before create of '" + event.currentTarget.id + "'");

		var page = event.currentTarget;

		this.html.page = $(page);

		// inserting wordings on current page
		$.it.wordings.update(page);

		// using right image resolution depending on device
		$.it.rimages.update(page);
	},


	// invoquée par le page manager sur l'event pageinit
	pageInit: function(event, data)
	{
		console.log("page init of " + event.currentTarget.id);

		// invoque automatiquement #createHtmlElements si existe
		if(this.createHtmlElements)
		{
			this.createHtmlElements();
		}

		// invoque automatiquement #createDataElements si existe
		if(this.createDataElements)
		{
			this.createDataElements();
		}
	},


	pageCreate: function(event, data)
	{
		console.log("page create of '" + event.currentTarget.id + "'");
	},


	pageBeforeHide: function(event, data)
	{
		console.log("page before hide of '" + event.currentTarget.id + "'");
	},


	pageHide: function(event, data)
	{
		console.log("page hide of '" + event.currentTarget.id + "'");
	},


	pageBeforeShow: function(event, data)
	{
		console.log("page before show of '" + event.currentTarget.id + "'");
	},


	pageShow: function(event, data)
	{
		console.log("page show of '" + event.currentTarget.id + "'");
	},


	pageBeforeChange: function(event, data)
	{
		console.log("page before change of '" + event.currentTarget.id + "'");
	},


	pageBeforeLoad: function(event, data)
	{
		console.log("page before load of '" + event.currentTarget.id + "'");
	},


	pageRemove: function(event, data)
	{
		console.log("page remove of '" + event.currentTarget.id + "'");

		// cleaning reference on html & data elements not used anymore
		this.deleteHtmlElements();
		this.deleteDataElements();
	},


	// Permet de libérer nos références sur les éléments HTML de la page active pour le garbage collector
	deleteHtmlElements: function()
	{
		if (this.html){
			for(var key in this.html){
				delete this.html[key];
			}
		}
	},


	// Permet de libérer les objets internes de notre controleur pour le garbage collector
	deleteDataElements: function()
	{
		if (this.data){
			for(var key in this.data){
				delete this.data[key];
			}
		}
	},


	// called when application resume
	resume: function(event)
	{
		console.log("resume on '" + this.settings.ID + "'");
	},


	// called when application resume
	pause: function(event)
	{
		console.log("pause on '" + this.settings.ID + "'");
	},


	// called when orientation change on page
	orientationChange: function(event)
	{
		console.log("orientation change of '" + event.currentTarget.id + "'");
	}

});