define "cache.LocalStorage", ( require, exports, module ) ->

	'use strict'

	$ = jQuery
	Base = require "common.Base"
	# Can't reference Log in here as it will create a cyclic dependency

	###*
	@class cache.LocalStorage
	@singleton
	Help for saving objects into the local storage memory.
	###
	class LocalStorage extends Base

		###*
		Saves the object with the specified key.
		@param {String} key    The key for the saved object
		@param {Object|String|Number} object The object to save
		###
		set: ( key, object, stringify = true ) ->
			return if !Modernizr.localstorage
			# Stringifying the object as JSON
			if stringify
				string = JSON.stringify object
			# Saving the stringify result into local storage
			localStorage.setItem key, string || object
			log = require "#log"
			log.d "Key '#{key}' saved in local storage" if DEBUG

		###*
		Gets the previously saved object with the specified key.
		@param  {String} key The key for the saved object
		@return {Object|String|Number}     The previously saved object with the specified key
		###
		get: ( key ) ->
			return if !Modernizr.localstorage
			return if !key
			# Returning the object
			return loadKey key

		###*
		@return An object containing all key/value pairs in local storage matching <pattern>.
		###
		getFromPattern: ( pattern ) ->
			return if !Modernizr.localstorage
			return if !pattern
			matchingKeys = Object.keys( localStorage ).filter ( key ) ->
				return key.match( pattern ) != null
			if matchingKeys?.length
				result = {}
				matchingKeys.forEach ( key ) ->
					result[ key ] = loadKey key
			return result

		###*
		If key, remove the associated item if any.
		###
		remove: ( key ) ->
			return if !Modernizr.localstorage
			return if !key
			localStorage.removeItem key
			log = require "#log"
			log.d "Key '#{key}' removed from local storage" if DEBUG

		###*
		Search all keys matching <pattern> for removal.
		###
		removeFromPattern: ( pattern ) ->
			return if !Modernizr.localstorage
			return if !pattern
			matchingKeys = Object.keys( localStorage ).filter ( key ) ->
				return key.match( pattern ) != null
			if matchingKeys?.length
				matchingKeys.forEach ( key ) ->
					localStorage.removeItem( key )
					log = require "#log"
					log.d "Removed key '#{key}' in local storage" if DEBUG



	loadKey = ( key, parse = true ) ->

		# Getting previously saved object with the specified key from local storage
		string = localStorage.getItem key

		return string if string is null

		# If string is not null, proceed
		if parse
			object = null
			try
				# Parsing the string as JSON to get the object
				object = JSON.parse string
			catch error
				# If an error occured during parsing JSON, set result object as the string
				object = string

		log = require "#log"
		log.d "Found key '#{key}' in local storage" if DEBUG

		return object || string



	module.exports = LocalStorage


###
The shared instance
###
define "cache#local", ( require, exports, module ) ->

	'use strict'

	LocalStorage = require "cache.LocalStorage"
	module.exports = new LocalStorage()