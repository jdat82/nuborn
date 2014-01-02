define "nu.debug.AbstractChannel", ( require, exports, module ) ->

	'use strict'

	Base = require "nu.core.Base"


	###*
	@class nu.debug.AbstractChannel
	Common behaviors for all loggers.
	###
	class AbstractChannel extends Base

		###*
		@constructor
		###
		constructor: ( settings ) ->
			super {}, settings

		###*
		Log the value parameter with the level specified.
		@param {nu.debug.LogItem} logItem Item to log
		###
		log: ( logItem ) ->

		###*
		List logs eventually for a given level.
		@param  {String} a {@link nu.debug.LogLevel nu.debug.LogLevel} element.
		@returns {Array} Array of {@link nu.debug.LogItem nu.debug.LogItem} elements.
		###
		list: ( level ) ->

		###*
		Print logs eventually for a given level.
		@param  {String} a {@link nu.debug.LogLevel nu.debug.LogLevel} element.
		   Some implementations may choose to not implement a filtering level.
		@returns {String} Gloabl or per-level log.
		###
		print: ( level ) ->

		###*
		Clear logs eventually for a given level.
		@param  {String} a {@link nu.debug.LogLevel nu.debug.LogLevel} element.
		Some implementations may choose to not implement a filtering level.
		###
		clear: ( level ) ->


	module.exports = AbstractChannel

