(function ($, nu, undefined) {

	/**
	 * @class nu.EventsDispatcher
	 *
	 * Simple events manager to dispatch and listen to custom events.
	 * All events are attached to the same object the sake of simplicity.
	 * Behind the scenes, jQuery events mechanism are used.
	 *
	 * {@link nu#events nu.events is an instance of this class}
	 *
	 * @provide nu.events
	 *
	 * @require nu
	 */
	nu.EventsDispatcher = Object.subClass({
		init: function () {
			this.emitter = $(this)
		},
		/**
		 * Emit an event <name> having the given <target> and <data> as properties.
		 * @param {String} name
		 * @param {Object} target
		 * @param {Mixed} data
		 */
		emit: function (name, target, data) {
			var event = $.Event(name, data)
			if (target)
				event.target = target
			this.emitter.trigger(event)
		},
		/**
		 * Register <callback> for events of type <name>
		 * @param {String} name
		 * @param {Function} callback
		 */
		on: function (name, callback) {
			this.emitter.on(name, callback)
		},
		/**
		 * Unregister <callback> for events of type <name>
		 * @param {String} name
		 * @param {Function} callback
		 */
		off: function (name, callback) {
			if (callback)
				this.emitter.off(name, callback)
			else
				this.emitter.off(name)
		}
	})

	/**
	 * @property {nu.EventsDispatcher} events
	 * @member nu
	 * Instance of the events dispatcher.
	 */
	nu.events = new nu.EventsDispatcher()

})(jQuery, nu)