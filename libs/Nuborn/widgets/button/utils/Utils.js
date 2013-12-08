define( "nu.widgets.button.Utils", function ( require, exports, module ) {

	'use strict';

	var $ = jQuery;

	/**
	 * @class nu.widgets.button.Utils
	 * @singleton
	 *
	 * Utility methods for buttons.
	 */
	var Utils = {

		/**
		 * Enable button's press mode.
		 *
		 * {@link #onvmousedown See onvmousedown}
		 */
		enableUniversalPressMode: function ( element ) {
			if ( !element ) return;
			// getting a jQuery reference
			element = $( element );
			// enabling press mode
			element.on( "vmousedown", onvmousedown )
		},

		/**
		 * Disable button's press mode.
		 *
		 * {@link #onvmousedown See onvmousedown}
		 */
		disableUniversalPressMode: function ( element ) {
			if ( !element ) return;
			// getting a jQuery reference
			element = $( element );
			// disabling press mode
			element.off( "vmousedown", onvmousedown );
		}

	};

	/**
	 * Handle active state on button the portable way.
	 * i.e compatible with Android 2.3 and browsers without :active pseudo class support.
	 */

	function onvmousedown() {
		var element = $( this );
		// making the element active
		element.addClass( "pressed" );
		// when touch end, go to normal state
		element.one( "vmouseup vmousemove", function () {
			// making the element normal
			element.removeClass( "pressed" );
		} );
	}

	module.exports = Utils;

} );