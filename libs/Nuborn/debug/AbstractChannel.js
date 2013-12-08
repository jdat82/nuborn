define( "nu.debug.AbstractChannel", function ( require, exports, module ) {

	'use strict';

	/**
	 * @class nu.debug.AbstractChannel
	 *
	 * Common behaviors for all loggers.
	 */
	var AbstractChannel = Object.subClass( {

		/**
		 * @constructor
		 */
		init: function ( settings ) {
			this.settings = $.extend( true, {}, settings );
		},

		/**
		 * Log the value parameter with the level specified.
		 * @param {nu.debug.LogItem} logItem Item to log
		 */
		log: function ( logItem ) {

		},

		/**
		 * List logs eventually for a given level.
		 * @param  {String} a {@link nu.debug.LogLevel nu.debug.LogLevel} element.
		 * @returns {Array} Array of {@link nu.debug.LogItem nu.debug.LogItem} elements.
		 */
		list: function ( level ) {},

		/**
		 * Print logs eventually for a given level.
		 * @param  {String} a {@link nu.debug.LogLevel nu.debug.LogLevel} element.
		 *    Some implementations may choose to not implement a filtering level.
		 * @returns {String} Gloabl or per-level log.
		 */
		print: function ( level ) {},

		/**
		 * Clear logs eventually for a given level.
		 * @param  {String} a {@link nu.debug.LogLevel nu.debug.LogLevel} element. Some implementations may choose to not implement a filtering level.
		 */
		clear: function ( level ) {}

	} );

	module.exports = AbstractChannel;

} );