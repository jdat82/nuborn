( function ( window, $, nu, undefined ) {

	'use strict';

	/**
	 * Common behaviors for all loggers.
	 * @class nu.debug.AbstractChannel
	 *
	 * @provide nu.debug.AbstractChannel
	 *
	 * @require nu.debug.LogLevel
	 *
	 * @require nu.debug.LogItem
	 */
	nu.debug.AbstractChannel = Object.subClass( {

		init: function ( settings ) {

		},

		/**
		 * Log the value parameter with the level specified.
		 * @param  {nu.debug.LogItem} item to log
		 */
		log: function ( logItem ) {

		}

	} );

} )( this, jQuery, nu );