/**
 * @provide primitives
 */

/* -- String -- */

/**
 * @ignore
 * Checks if the string contains the specified string value.
 * @param  {String|Number} 	value    		The value to search for
 * @param  {Boolean} 		caseInsensitive	Make a case insensitive search
 * @return {Boolean}                 		True if the string contains value, false otherwise
 */
String.prototype.contains = function (value, caseInsensitive) {
	// if value is null or undefined, return false
	if (!value) {
		return false;
	}
	// registering this and value parameter as local variables
	var self = this.toString();
	var val = value.toString();
	// if case insensitive search is asked, transform values to lower case
	if (caseInsensitive) {
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
Array.prototype.clear = function () {
	this.splice(0, this.length);
};

/* -- Object -- */

/**
 * Allows writing of pseudo classes as in POO languages.
 * var Parent = Object.subClass({
 *		// constructor called automatically when doing new MonObjet()
 * 		init: function(name) {
 *  		this.name = name
 * 		},
 *      someFunc: function(){
 * 			//
 * 		}
 * })
 * var Child = Parent.subClass({
 *		// constructor called automatically when doing new MonObjet()
 * 		init: function(name) {
 *  		this._super(name)
 * 		},
 *      otherFunc: function(){
 * 			this.someFunc()
 * 		}
 * })
 * var child = new Child("Bobby")
 */
(function () {

	var initializing = false,
		superPattern = /xyz/.test(function () {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	Object.subClass = function (properties) {

		var _super = this.prototype;

		initializing = true;
		var proto = new this();
		initializing = false;

		for (var name in properties) {

			proto[name] = typeof properties[name] == "function" && typeof _super[name] == "function" && superPattern.test(properties[name]) ?
				(function (name, fn) {
				return function () {
					var tmp = this._super;
					this._super = _super[name];
					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret;
				};
			})(name, properties[name]) : properties[name];
		}

		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}

		Class.prototype = proto;

		Class.constructor = Class;

		Class.subClass = arguments.callee;

		return Class;
	};
})()