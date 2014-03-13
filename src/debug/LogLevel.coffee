define "debug.LogLevel", ( require, exports, module ) ->

	'use strict'

	###*
	@enum
	Enumeration of log levels.
	###
	LogLevel =
		TRACE: "TRACE"
		DEBUG: "DEBUG"
		INFO: "INFO"
		WARN: "WARN"
		ERROR: "ERROR"
		NOLOG: "NOLOG"

	module.exports = LogLevel

