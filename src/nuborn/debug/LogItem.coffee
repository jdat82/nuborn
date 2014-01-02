define "nu.debug.LogItem", ( require, exports, module ) ->

	'use strict'

	LogLevel = require "nu.debug.LogLevel"



	###*
	Default settings.<br>
	<ul><li>pattern: [%d]    %m</li></ul>
	###
	defaults =
		pattern: "[%d]    %m"



	###*
	@class nu.debug.LogItem
	A log item represented by a message, a level and a date
	###
	class LogItem

		###*
		@constructor
		Creates a new LogItem.
		@param  {nu.debu.LogLevel} level   The level of the log item.
		@param  {String} message The message of the log item.
		@param  {Date} date    The date of the log item.
		###
		constructor: ( @level, @message, @date ) ->
			# Error instance which is practical because it gives us the stack trace
			@error = new Error( @message ).stack if @level is LogLevel.ERROR

		###*
		The string representation of the log item (message).
		@param {String} format to use to create the toString representation.
		    tokens : %d : message / %m : message / %l : level
		@return {String} The message of the log item.
		###
		toString: ( pattern = defaults.pattern ) ->
			pattern = pattern.replace "%d", @date
			pattern = pattern.replace "%m", @message
			pattern = pattern.replace "%l", @level
			return pattern



	###*
	Allows to override some defaults like the string pattern.
	@static
	###
	LogItem.defaults = defaults



	module.exports = LogItem

