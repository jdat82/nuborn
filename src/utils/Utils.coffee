define "utils.Utils", ( require, exports, module ) ->

	'use strict'

	$ = jQuery

	###*
	@class utils.Utils
	@singleton
	Utilities class.
	###
	class Utils

		###*
		Clone a javascript object.
		###
		@clone = ( objectToClone ) ->
			return JSON.parse JSON.stringify objectToClone

		###*
		Shortcut for JSON.stringify(object, null, "    ")
		###
		@toJSON = ( object ) ->
			clone = $.extend true, {}, object
			return JSON.stringify clone, null, "    "

		###*
		Install remote debugging scripts based on build based variables (uglify compilation).
		debug : true if compiling for development
		weinre : true if you want weinre support
		livereload : true if you want livereload support
		###
		@installDebugScripts = () ->

			log = require "#log"

			###*
			Adding livereload support for development only.
			Refresh page automatically in conjunction with grunt watcher.
			Generate something like this in body :
			  <script src="http://<hostname>:35729/livereload.js"></script>
			###
			if DEBUG && LIVERELOAD
				lr = document.createElement 'script'
				hostname = DEBUG_HOST || window.location.hostname
				if 'https:' == window.location.protocol then protocol = 'https' else protocol = 'http'
				lr.src = "#{protocol}://#{hostname}:#{LIVERELOAD_PORT}/livereload.js"

				log.d "Installing Livereload script at: #{lr.src}" if DEBUG

				lr.type = 'text/javascript'
				lr.async = 'true'
				s = document.getElementsByTagName( 'script' )[ 0 ]
				s.parentNode.insertBefore lr, s

			###*
			Adding weinre support for development only.
			Allows remote debugging with Android default browser.
			Generate something like this in body :
			  <script src="http://<hostname>::8080/target/target-script-min.js#weinre"></script>
			###
			if DEBUG && WEINRE
				lr = document.createElement 'script'
				hostname = DEBUG_HOST || window.location.hostname
				if 'https:' == window.location.protocol then protocol = 'https' else protocol = 'http'
				lr.src = "#{protocol}://#{hostname}:#{WEINRE_PORT}/target/target-script-min.js#weinre"

				log.d "Installing Weinre script at: #{lr.src}" if DEBUG

				lr.type = 'text/javascript'
				lr.async = 'true'
				s = document.getElementsByTagName( 'script' )[ 0 ]
				s.parentNode.insertBefore lr, s

		###*
		Return a random item from an array.
		###
		@randomItemFromArray = ( array ) ->
			return array[ Math.floor( Math.random() * array.length ) ]


	module.exports = Utils

