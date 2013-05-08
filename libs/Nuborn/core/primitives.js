/* -- Provider -- */
goog.provide("primitives");

/* -- Object -- */

/**
 * @ignore
 * Clone the calling object.
 * @return {Object} The brand new object cloned
 */
Object.prototype.clone = function(){
	return $.extend({}, this);
}

/* -- String -- */

/**
 * @ignore
 * Checks if the string contains the specified string value.
 * @param  {String|Number} 	value    		The value to search for
 * @param  {Boolean} 		caseInsensitive	Make a case insensitive search
 * @return {Boolean}                 		True if the string contains value, false otherwise
 */
String.prototype.contains = function(value, caseInsensitive){
	// if value is null or undefined, return false
	if(!value){
		return false;
	}
	// registering this and value parameter as local variables
	var self = this.toString();
	var val = value.toString();
	// if case insensitive search is asked, transform values to lower case
	if(caseInsensitive){
		self = self.toLowerCase();
		val = val.toLowerCase();
	}
	// if String.indexOf returns -1, the string does not contain the value
	return self.indexOf(val) !== -1;
};

/* -- Array -- */

/**
 * @ignore
 * Clears the array and keep reference.
 */
Array.prototype.clear = function(){
	this.splice(0, this.length);
};

