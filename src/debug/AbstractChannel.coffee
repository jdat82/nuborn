define "debug.AbstractChannel", ( require, exports, module ) ->

	'use strict'

	Base = require "common.Base"


	###*
	@class debug.AbstractChannel
	Common behaviors for all loggers.
	###
	class AbstractChannel extends Base

		###*
		@constructor
		###
		constructor: ( defaults, settings ) ->
			super defaults, settings

		###*
		Log the value parameter with the level specified.
		@param {debug.LogItem} logItem Item to log
		###
		log: ( logItem ) ->

		###*
		List logs eventually for a given level.
		@param  {String} a {@link debug.LogLevel debug.LogLevel} element.
		@returns {Array} Array of {@link debug.LogItem debug.LogItem} elements.
		###
		list: ( level ) ->

		###*
		Print logs eventually for a given level.
		@param  {String} a {@link debug.LogLevel debug.LogLevel} element.
		   Some implementations may choose to not implement a filtering level.
		@returns {String} Gloabl or per-level log.
		###
		print: ( level ) ->

		###*
		Clear logs eventually for a given level.
		@param  {String} a {@link debug.LogLevel debug.LogLevel} element.
		Some implementations may choose to not implement a filtering level.
		###
		clear: ( level ) ->


	module.exports = AbstractChannel

