define "nu.cache.LocalStorage", ( require, exports, module ) ->

	'use strict'

	$ = jQuery

	###*
	@class nu.cache.LocalStorage
	@singleton
	Help for saving objects into the local storage memory.
	###
	class LocalStorage

		###*
		Saves the object with the specified key.
		@param {String} key    The key for the saved object
		@param {Object|String|Number} object The object to save
		###
		set: ( key, object ) ->
			# Stringifying the object as JSON
			string = JSON.stringify object
			# Saving the stringify result into local storage
			localStorage.setItem key, string

		###*
		Gets the previously saved object with the specified key.
		@param  {String} key The key for the saved object
		@return {Object|String|Number}     The previously saved object with the specified key
		###
		get: ( key ) ->

			return if !key

			# Getting previously saved object with the specified key from local storage
			string = localStorage.getItem key

			return if not string?

			# If string is not null, proceed
			object = null
			try
				# Parsing the string as JSON to get the object
				object = JSON.parse string
			catch error
				# If an error occured during parsing JSON, set result object as the string
				object = string

			# Returning the object
			return object

		###*
		If key, remove the associated item if any.
		###
		remove: ( key ) ->
			return if !key
			localStorage.removeItem key


	LocalStorage.instance = new LocalStorage()

	module.exports = LocalStorage

