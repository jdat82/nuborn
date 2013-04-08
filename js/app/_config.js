
var AppConfiguration = Configuration.subClass(
{
	// constructor
	init: function()
	{
		this._super();
	},


	validate: function()
	{
		this._super();
		// custom validation process
		// here ...
	}

});

$.it.config = new AppConfiguration();