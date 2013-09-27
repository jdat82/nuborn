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

/**
 * Add Array#filter support if any.
 */
if (!Array.prototype.filter) {
	Array.prototype.filter = function (fun /*, thisp*/ ) {
		'use strict';

		if (!this) {
			throw new TypeError();
		}

		var objects = Object(this);
		var len = objects.length >>> 0;
		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var res = [];
		var thisp = arguments[1];
		for (var i in objects) {
			if (objects.hasOwnProperty(i)) {
				if (fun.call(thisp, objects[i], i, objects)) {
					res.push(objects[i]);
				}
			}
		}

		return res;
	};
}

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
})();


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

// (function (window) {
// 	var lastTime = 0;
// 	var vendors = ['ms', 'moz', 'webkit', 'o'];
// 	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
// 		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
// 		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
// 	}

// 	if (!window.requestAnimationFrame)
// 		window.requestAnimationFrame = function (callback, element) {
// 			var currTime = new Date().getTime();
// 			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
// 			var id = window.setTimeout(function () {
// 					callback(currTime + timeToCall);
// 				},
// 				timeToCall);
// 			lastTime = currTime + timeToCall;
// 			return id;
// 		};

// 	if (!window.cancelAnimationFrame)
// 		window.cancelAnimationFrame = function (id) {
// 			clearTimeout(id);
// 		};
// })(this)