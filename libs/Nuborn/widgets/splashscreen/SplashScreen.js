(function($, nu, undefined) {

	/**
	 * @class nu.widgets.SplashScreen
	 * Controls the splashscreen of the application.
	 *
	 * @provide nu.widgets.SplashScreen
	 *
	 * @require nu.widgets
	 */
	nu.widgets.SplashScreen = Object.subClass({

		/**
		 * @constructor
		 * @param  {Object} settings
		 */
		init: function(settings) {
			// registering settings as a Class member
			this.settings = settings ||  {};

			// if the id is not provided, use the default id
			if (!this.settings.id) {
				this.settings.id = nu.widgets.SplashScreen.DEFAULT_ID;
			}

			// if url is provided, initialize with url
			if (this.settings.url) {
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
		initWithId: function() {
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
		initWithUrl: function() {
			// retrieving the data from the url
			var promise = $.ajax({
				async: false,
				url: this.settings.url
			});
			// defining the success callback
			promise.done(function(data) {
				// convert the data into jQuery Element
				var element = $(data);
				// getting the id
				var id = element.prop("id");
				if (id !== "") {
					this.settings.id = id;
				}
				// adding class fullscreen
				element.addClass("fullscreen");
				// registering the element as a Class member
				this.element = element;
			});
			// defining th error callback
			promise.fail(function() {
				// initialize with id
				this.initWithId();
			});
		},

		/**
		 * Shows the splashscreen.
		 * @param  {Boolean} animated Defines if the transition should be animated
		 */
		show: function() {
			// if a splashscreen with the same id exists, remove it
			var existing = $("#" + this.settings.id);
			if (existing.length > 0) {
				this.element = existing;
			}
			// getting the element member as a local variable
			var element = this.element;
			// adding the splashscreen at the end of the document body
			$("body").append(element);
			// showing the splashscreen
		},

		/**
		 * Hides the splashscreen.
		 * @param  {Boolean} animated Defines if the transition should be animated
		 */
		hide: function(animated) {
			// getting the element member as a local variable
			var element = this.element;
			// remove the element from the document
			var period = animated ? 1 : 0
			var tl = new TimelineLite()
			tl.to(element, period, {
				opacity: 0,
				onComplete: function() {
					element.remove()
				},
				ease: Back.easeIn
			})
			tl.play()
		}
	});

	/**
	 * Defining the splashscreen default id constant.
	 * @static
	 * @type {String}
	 */
	nu.widgets.SplashScreen.DEFAULT_ID = "splashscreen";

})(jQuery, nu)