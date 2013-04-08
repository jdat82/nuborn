
// "Abstract" class for loaders
var Loader = Object.subClass(
{
	init: function(settings)
	{
		this.settings = this.settings || {};
		this.settings = $.extend(true, this.settings, settings);
	},


	show: function(params)
	{

	},


	hide: function()
	{

	},


	destroy: function()
	{
		for(var key in this.settings) {
			delete this.settings[key];
		}
		delete this.settings;
	}

});