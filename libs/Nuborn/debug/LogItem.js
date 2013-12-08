define( "nu.debug.LogItem", function ( require, exports, module ) {

	'use strict';

	var LogLevel = require( "nu.debug.LogLevel" );

	/**
	 * Default settings.<br>
	 * <ul><li>pattern: [%d]    %m</li></ul>
	 */
	var defaults = {
		pattern: "[%d]    %m"
	};

	/**
	 * @class nu.debug.LogItem
	 *
	 * A log item represented by a message, a level and a date
	 */
	var LogItem = Object.subClass( {

		/**
		 * @constructor
		 * Creates a new LogItem.
		 * @param  {nu.debu.LogLevel} level   The level of the log item.
		 * @param  {String} message The message of the log item.
		 * @param  {Date} date    The date of the log item.
		 */
		init: function ( level, message, date ) {

			// The message of the log item.
			this.message = message;

			// The date of the log item.
			this.date = date;

			// The level of the log item.
			this.level = level;

			if ( this.level === LogLevel.ERROR ) {
				// Error instance which is practical because it gives us the stack trace
				this.error = new Error( this.message ).stack;
			}
		},

		/**
		 * The string representation of the log item (message).
		 * @param {String} format to use to create the toString representation.
		 *     tokens : %d : message / %m : message / %l : level
		 * @return {String} The message of the log item.
		 */
		toString: function ( pattern ) {

			if ( !pattern )
				pattern = defaults.pattern;

			pattern = pattern.replace( "%d", this.date );
			pattern = pattern.replace( "%m", this.message );
			pattern = pattern.replace( "%l", this.level );
			return pattern;
		}
	} );

	/**
	 * Allows to override some defaults like the string pattern.
	 * @static
	 */
	LogItem.defaults = function ( settings ) {
		defaults = settings;
	};

	module.exports = LogItem;

} );