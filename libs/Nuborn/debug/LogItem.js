/**
 * @class nu.debug.LogItem
 * A log item represented by a message, a level and a date
 *
 * @provide nu.debug.LogItem
 *
 * @require nu.debug.LogLevel
 */
nu.debug.LogItem = Object.subClass({

	/**
	 * @constructor
	 * Creates a new LogItem.
	 * @param  {nu.debu.LogLevel} level   The level of the log item.
	 * @param  {String} message The message of the log item.
	 * @param  {Date} date    The date of the log item.
	 */
	init: function(level, message, date){
		/**
		 * The message of the log item.
		 * @type {String}
		 */
		this.message = message;
		/**
		 * The date of the log item.
		 * @type {Date}
		 */
		this.date = date;
		/**
		 * The level of the log item.
		 * @type {nu.debug.LogLevel}
		 */
		this.level = level;
	},

	/**
	 * The string representation of the log item (message).
	 * @return {String} The message of the log item.
	 */
	toString : function(){
		return this.message;
	}
});