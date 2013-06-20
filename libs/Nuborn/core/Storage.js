/**
 * @class nu.Storage
 * Help for saving objects into the local storage memory.
 * @singleton
 * @provide nu.Storage
 * @require nu
 */
nu.Storage = {};

/**
 * Saves the object with the specified key.
 * @param {String} key    The key for the saved object 
 * @param {Object|String|Number} object The object to save
 */
nu.Storage.set = function(key, object){
	// stringifying the object as JSON
	var string = JSON.stringify(object);
	// saving the stringify result into local storage
	localStorage.setItem(key, string);
};

/**
 * Gets the previously saved object with the specified key.
 * @param  {String} key The key for the saved object
 * @return {Object|String|Number}     The previously saved object with the specified key
 */
nu.Storage.get = function(key){
	// getting previously saved object with the specified key from local storage
	var string = localStorage.getItem(key);
	// if string is not null, proceed
	if(string){
		// declaring the resulting object
		var object = null;
		try{
			// parsing the string as JSON to get the object
			object = JSON.parse(string);
		} catch(error){
			// if an error occured during parsing JSON, set result object as the string
			object = string;
		}
		// returning the object
		return object;
	}
	return null;
};
