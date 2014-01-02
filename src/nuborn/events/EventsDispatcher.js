define( "nu.events.EventsDispatcher", function ( require, exports, module ) {

	'use strict';

	var $ = jQuery;

	/**
	 * @class nu.events.EventsDispatcher
	 * @singleton
	 *
	 * Simple events manager to dispatch and listen to custom events.<br>
	 * Behind the scene, jQuery events mechanism is used.
	 */
	var EventsDispatcher = {
		init: function () {
			this.emitter = $( this );
		},
		/**
		 * Emit an event <name> having the given <target> and <data> as properties.
		 * @param {Object} data
		 * @param {String} data.name
		 * @param {Object} data.target Event will appears to be triggered by this target
		 * @param {Mixed} data.settings Events data
		 */
		emit: function ( data ) {
			if ( !data || !data.name )
				return;

			var event = $.Event( data.name, {
				settings: data.settings
			} );

			data.target && ( event.target = data.target );

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

	EventsDispatcher.init();

	module.exports = EventsDispatcher;

} );