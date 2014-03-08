define "events.EventsBroker", ( require, exports, module ) ->

	'use strict'

	$ = jQuery

	###*
	@class events.EventsBroker
	@singleton
	Simple events manager to dispatch and listen to custom events.<br>
	Simple wrapper for jQuery Events.
	###
	class EventsBroker

		###*
		@constructor
		###
		constructor: () ->
			@emitter = $( this )

		###*
		Emit an event <name> having the given <data> as properties.
		@param {Object} data
		###
		dispatch: ( data ) ->
			return if not data
			@emitter.trigger $.Event data

		###*
		Register <callback> for events of type <name>
		@param {String} name
		@param {Function} callback
		###
		on: ( name, callback ) ->
			return if not name
			@emitter.on name, callback

		###*
		Unregister <callback> for events of type <name>
		@param {String} name
		@param {Function} callback
		###
		off: ( name, callback ) ->
			return if not name
			@emitter.off name, callback


	module.exports = EventsBroker


###
Shared instance
###
define "#eventsBroker", ( require, exports, module ) ->

	'use strict'

	EventsBroker = require "events.EventsBroker"
	module.exports = new EventsBroker()