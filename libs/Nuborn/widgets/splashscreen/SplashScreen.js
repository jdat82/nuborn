/* -- Provider -- */
goog.provide("nu.widgets.SplashScreen");

/* -- Imports -- */
goog.require("nu.widgets");

/**
 * @class nu.widgets.SplashScreen
 * Controls the splashscreen of the application.
 */
nu.widgets.SplashScreen = Object.subClass({

	/**
	 * @constructor
	 * @param  {Object} settings 
	 */
	init: function(settings){
		// registering settings as a Class member
		this.settings = settings || {};
		
		// if the id is not provided, use the default id
		if(!this.settings.id){
			this.settings.id = nu.widgets.SplashScreen.DEFAULT_ID;
		}

		// if url is provided, initialize with url
		if(this.settings.url){
			this.initWithUrl();
		} 
		// else, initialize with id
		else {
			this.initWithId();
		}
	},

	/**
	 * Initialize the splashscreen with the id provided in settings.
	 */
	initWithId: function(){
		// create the div element with the id provided in settings
		var element = $("<div>");
		element.prop("id", this.settings.id);
		// adding class fullscreen
		element.addClass("fullscreen");
		// registering the div element as a Class member
		this.element = element;
	},

	/**
	 * Initialize the splashscreen with the url provided in settings.
	 */
	initWithUrl: function(){
		// retrieving the data from the url
		var xhr = $.ajax({
			async: false,
			url: this.settings.url
		});
		// defining the success callback
		xhr.done(function(data){
			// convert the data into jQuery Element
			var element = $(data);
			// getting the id
			var id = element.prop("id");
			if(id !== ""){
				this.settings.id = id;
			}
			// adding class fullscreen
			element.addClass("fullscreen");
			// registering the element as a Class member
			this.element = element;
		});
		// defining th error callback
		xhr.fail(function(){
			// initialize with id
			this.initWithId();
		});
	},

	/**
	 * Shows the splashscreen.
	 * @param  {Boolean} animated Defines if the transition should be animated
	 */
	show: function(animated){
		// if a splashscreen with the same id exists, remove it
		var existing = $("#"+this.settings.id);
		if(existing.length > 0){
			this.element = existing;
		}
		// getting the element member as a local variable
		var element = this.element;
		// hiding the splashscreen before adding it to the document body
		element.hide();
		// adding the splashscreen at the end of the document body
		$("body").append(element);
		// if animated is false, set duration to 0
		var duration = animated ? 400 : 0;
		// showing the splashscreen with a fade effect
		element.fadeIn(duration);
	},

	/**
	 * Hides the splashscreen.
	 * @param  {Boolean} animated Defines if the transition should be animated
	 */
	hide: function(animated){
		// getting the element member as a local variable
		var element = this.element;
		// if animated is false, set duration to 0
		var duration = animated ? 400 : 0;
		// hiding the splashscreen with a fade effect
		element.fadeOut(duration, function(){
			// remove the element from the document
			element.remove();
		});
	}
});

/**
 * Defining the splashscreen default id constant.
 * @static
 * @type {String}
 */
nu.widgets.SplashScreen.DEFAULT_ID = "splashscreen";
