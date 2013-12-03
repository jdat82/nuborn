/*
 * @provide nu.debug.LogLevel
 */
define( "nu.debug.LogLevel", function ( require, exports, module ) {

	'use strict';

	/**
	 * @enum
	 *
	 * Enumeration of log levels.
	 */
	var LogLevel = {
		INFO: "INFO",
		WARN: "WARN",
		ERROR: "ERROR",
		NOLOG: "NOLOG"
	};

	module.exports = LogLevel;

} );