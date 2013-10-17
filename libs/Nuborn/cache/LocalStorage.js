( function ( $, nu, localStorage, undefined ) {

	'use strict';

	/**
	 * @class nu.cache.LocalStorage
	 * @singleton
	 *
	 * Help for saving objects into the local storage memory.
	 *
	 * @provide nu.cache.LocalStorage
	 *
	 * @require nu.cache
	 */
	nu.cache.LocalStorage = {

		/**
		 * Saves the object with the specified key.
		 * @param {String} key    The key for the saved object
		 * @param {Object|String|Number} object The object to save
		 */
		set: function ( key, object ) {
			// stringifying the object as JSON
			var string = JSON.stringify( object );
			// saving the stringify result into local storage
			localStorage.setItem( key, string );
		},

		/**
		 * Append object to the specified key.
		 * @param {String} key    The key for the saved object
		 * @param {Object} object The object to save
		 */
		append: function ( key, object ) {
			// stringifying the object as JSON
			var string = JSON.stringify( object );
			// getting existing value
			var item = localStorage.getItem( key );
			// appending to existing value
			item += string;
			// saving the stringify result into local storage
			localStorage.setItem( key, string );
		},


		/**
		 * Gets the previously saved object with the specified key.
		 * @param  {String} key The key for the saved object
		 * @return {Object|String|Number}     The previously saved object with the specified key
		 */
		get: function ( key ) {

			if ( !key ) return;

			// getting previously saved object with the specified key from local storage
			var string = localStorage.getItem( key );

			if ( !string || !string.length ) return string;

			// if string is not null, proceed
			var object = null;
			try {
				// parsing the string as JSON to get the object
				object = JSON.parse( string );
			}
			catch ( error ) {
				// if an error occured during parsing JSON, set result object as the string
				object = string;
			}

			// returning the object
			return object;
		},

		/**
		 * If key, remove the associated item if any.
		 */
		remove: function ( key ) {
			if ( !key ) return;
			localStorage.removeItem( key );
		}

	};

} )( jQuery, nu, localStorage )