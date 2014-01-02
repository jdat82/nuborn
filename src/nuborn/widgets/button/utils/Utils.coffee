define "nu.widgets.button.Utils", ( require, exports, module ) ->

	'use strict'

	$ = jQuery

	###*
	@class nu.widgets.button.Utils
	@singleton
	Utility methods for buttons.
	###
	class Utils

		###*
		Enable button's press mode.
		{@link #onvmousedown See onvmousedown}
		###
		enableUniversalPressMode: ( element ) ->
			return if not element
			# Getting a jQuery reference
			$element = $( element )
			# Enabling press mode
			$element.on "vmousedown", onvmousedown

		###*
		Disable button's press mode.
		{@link #onvmousedown See onvmousedown}
		###
		disableUniversalPressMode: ( element ) ->
			return if not element
			# Getting a jQuery reference
			$element = $( element )
			# Disabling press mode
			$element.off "vmousedown", onvmousedown


	###
	Handle active state on button the portable way.
	i.e compatible with Android 2.3 and browsers without : active pseudo class support.
	###
	onvmousedown = () ->

		$element = $( this )

		# Making the element active
		$element.addClass "pressed"

		# When touch end, go to normal state
		$element.one "vmouseup vmousemove", () ->
			# Making the element normal
			$element.removeClass "pressed"



	# Creating a singleton
	Utils.instance = new Utils() ;

	# Exporting class
	module.exports = Utils
