( function ( $, nu, undefined ) {

	'use strict';

	/**
	 * @class nu.events.EventsDispatcher
	 * @singleton
	 *
	 * Simple events manager to dispatch and listen to custom events.
	 * All events are attached to the same object the sake of simplicity.
	 * Behind the scenes, jQuery events mechanism are used.
	 *
	 * To get an instance, simply do: nu.events.EventsDispatcher.get()
	 *
	 * @provide nu.events.EventsDispatcher
	 *
	 * @require nu.events
	 */
	nu.events.EventsDispatcher = {
		init: function ( ) {
			this.emitter = $( this );
		},
		/**
		 * Emit an event <name> having the given <target> and <data> as properties.
		 * @param {String} name
		 * @param {Object} target
		 *	Event will appears to be triggered by this target
		 * @param {Mixed} data
		 *	Events data
		 */
		emit: function ( name, target, data ) {
			var event = $.Event( name, data );
			if ( target )
				event.target = target;
			this.emitter.trigger( event );
		},
		/**
		 * Register <callback> for events of type <name>
		 * @param {String} name
		 * @param {Function} callback
		 */
		on: function ( name, callback ) {
			this.emitter.on( name, callback );
		},
		/**
		 * Unregister <callback> for events of type <name>
		 * @param {String} name
		 * @param {Function} callback
		 */
		off: function ( name, callback ) {
			if ( callback )
				this.emitter.off( name, callback );
			else
				this.emitter.off( name );
		}
	};

	nu.events.EventsDispatcher.init( );

} )( jQuery, nu )