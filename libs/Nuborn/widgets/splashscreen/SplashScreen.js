(function ($, nu, undefined) {

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
		init: function (settings) {
			this.settings = settings ||  {};
			this.settings.id = "splash";
			// inflates the splashscreen
			var element = $(templates.SplashScreen.render(this.settings));
			// registering the div element as a Class member
			this.element = element;
		},

		/**
		 * Shows the splashscreen.
		 * @param  {Boolean} animated Defines if the transition should be animated
		 */
		show: function () {

			// if a splashscreen with the same id exists, remove it
			var existing = $("#" + this.settings.id);
			if (existing.length > 0) {
				this.element = existing;
			}

			// adding the splashscreen at the end of the document body
			$("body").append(this.element);
		},

		/**
		 * Hides the splashscreen.
		 * @param  {Boolean} animated Defines if the transition should be animated
		 */
		hide: function (animated) {
			// getting the element member as a local variable
			var element = this.element;
			// remove the element from the document
			var period = animated ? 1 : 0
			var tl = new TimelineLite()
			tl.to(element, period, {
				opacity: 0,
				onComplete: function () {
					element.remove()
				},
				ease: Back.easeIn
			})
			tl.play()
		}
	});

})(jQuery, nu)