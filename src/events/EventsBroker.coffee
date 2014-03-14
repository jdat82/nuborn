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

		###*
		Emit an event <name> having the given <data> as properties.
		@param {Object} data
		###
		dispatch: ( type, data ) ->
			return if not type
			if window.CustomEvent
				event = new CustomEvent type, {detail: data}
			else
				event = document.createEvent 'CustomEvent'
				event.initCustomEvent type, true, true, data
			document.dispatchEvent event

		###*
		Register <callback> for events of type <type>
		@param {String} type
		@param {Function} callback
		###
		on: ( type, callback ) ->
			return if not type
			document.addEventListener type, callback

		###*
		Unregister <callback> for events of type <type>
		@param {String} type
		@param {Function} callback
		###
		off: ( type, callback ) ->
			return if not type
			document.removeEventListener type, callback


	module.exports = EventsBroker


###
Shared instance
###
define "#eventsBroker", ( require, exports, module ) ->

	'use strict'

	EventsBroker = require "events.EventsBroker"
	module.exports = new EventsBroker()