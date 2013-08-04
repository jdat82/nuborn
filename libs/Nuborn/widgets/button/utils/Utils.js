(function ($, nu, undefined) {

	/**
	 * @class nu.widgets.button.Utils
	 * @singleton
	 *
	 * Utility methods for buttons.
	 *
	 * @provide nu.widgets.button.Utils
	 *
	 * @require nu.widgets.button
	 */
	nu.widgets.button.Utils = {

		/**
		 * Handle active state on button the portable way.
		 * i.e compatible with Android 2.3 and browsers without :active pseudo class support.
		 */
		onvmousedown: function () {
			var button = $(this)
			// making the button active
			button.addClass("pressed")
			// when touch end, go to normal state
			button.one("vmouseup vmousemove", function () {
				// making the button normal
				button.removeClass("pressed")
			})
		},

		/**
		 * Enable button's press mode.
		 *
		 * {@link #onvmousedown See onvmousedown}
		 */
		enableUniversalPressMode: function (button) {
			if (!button) return;
			// getting a jQuery reference
			if (!button.context) button = $(button)
			// enabling press mode	
			button.on("vmousedown", this.onvmousedown)
		},

		/**
		 * Disable button's press mode.
		 *
		 * {@link #onvmousedown See onvmousedown}
		 */
		disableUniversalPressMode: function (button) {
			if (!button) return;
			// getting a jQuery reference
			if (!button.context) button = $(button)
			// disabling press mode
			button.off("vmousedown", this.onvmousedown)
		}

	}

})(jQuery, nu)