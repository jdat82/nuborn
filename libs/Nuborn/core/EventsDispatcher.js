/**
 * Simple events manager to dispatch and listen to custom events.
 * All events are attached to the same object the sake of simplicity.
 * Behind the scenes, jQuery events mechanism are used.
 *
 * @provide nu.events
 * @require nu
 */
var EventsDispatcher = Object.subClass({
 	init: function(){
 		this.emitter = $(this)
 	},
 	/**
 	 * Emit an event of name <name> for which the target of the event is <target> and whose data are <data>.
 	 */
 	emit: function(name, target, data){
 		var event = $.Event(name, data)
 		if(target)
 			event.target = target
 		this.emitter.trigger(event)
 	},
 	on: function(name, callback){
 		this.emitter.on(name, callback)
 	},
 	off: function(name, callback){
 		if(callback)
 			this.emitter.off(name, callback)
 		else
 			this.emitter.off(name)
 	}
})

nu.events = new EventsDispatcher()