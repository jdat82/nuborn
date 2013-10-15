( function ( nu ) {

	'use strict';

	/**
	 * @enum
	 * Enumeration of log levels.
	 *
	 * @provide nu.debug.LogLevel
	 *
	 * @require nu.debug
	 */
	nu.debug.LogLevel = {
		INFO: "INFO",
		WARN: "WARN",
		ERROR: "ERROR",
		NOLOG: "NOLOG"
	};

} )( nu );