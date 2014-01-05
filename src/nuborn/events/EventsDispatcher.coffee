define "nu.events.EventsDispatcher", ( require, exports, module ) ->

	'use strict'

	$ = jQuery

	###*
	@class nu.events.EventsDispatcher
	@singleton
	Simple events manager to dispatch and listen to custom events.<br>
	Behind the scene, jQuery events mechanism is used.
	###
	class EventsDispatcher

		###*
		@constructor
		###
		constructor: () ->
			@emitter = $( this )

		###*
		Emit an event <name> having the given <target> and <data> as properties.
		@param {Object} data
		@param {String} data.name
		@param {Object} data.target Event will appears to be triggered by this target
		@param {Mixed} data.settings Events data
		###
		emit: ( data ) ->
			return if not data?.name?

			event = $.Event data.name,
				settings: data.settings

			if data.target then event.target = data.target

			@emitter.trigger event

		###*
		Register <callback> for events of type <name>
		@param {String} name
		@param {Function} callback
		###
		on: ( name, callback ) ->
			@emitter.on name, callback

		###*
		Unregister <callback> for events of type <name>
		@param {String} name
		@param {Function} callback
		###
		off: ( name, callback ) ->
			if callback then @emitter.off name, callback else @emitter.off name


	EventsDispatcher.instance = new EventsDispatcher()

	module.exports = EventsDispatcher

