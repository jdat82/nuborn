( function ( $, nu, undefined ) {

	'use strict';

	/**
	 * @class nu.events.EventsDispatcher
	 * @singleton
	 *
	 * Simple events manager to dispatch and listen to custom events.<br>
	 * Behind the scene, jQuery events mechanism is used.
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
		 * @param {Object} settings
		 * @param {String} settings.name
		 * @param {Object} settings.target Event will appears to be triggered by this target
		 * @param {Mixed} settings.data Events data
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

	nu.events.EventsDispatcher.init( );

} )( jQuery, nu )