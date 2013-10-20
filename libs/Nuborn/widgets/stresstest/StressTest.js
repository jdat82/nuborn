( function ( $, nu, Log, LocalStorage, EventsDispatcher, undefined ) {

    'use strict';

    var defaults = {
        localStorageKey: "animationfriendly"
    };

    /**
     * @class nu.widgets.StressTest
     *
     * Play a css animation to evaluate device performances.
     * When done, add a CSS class to html tag: either animationfriendly or not-animationfriendly.
     *
     * @provide nu.widgets.StressTest
     *
     * @require nu.widgets
     */
    nu.widgets.StressTest = Object.subClass( {

        /**
         * @constructor
         */
        init: function ( settings ) {
            this.settings = $.extend( true, defaults, settings );
        },

        /**
         *
         */
        play: function ( ) {

            var dfd = $.Deferred( );

            // if no local storage on device, we face an old browser, so we make a safety choice : no animation for this device
            if ( !Modernizr.localstorage ) {
                declareNotAnimationFriendly( );
                setTimeout( dfd.resolve, 50 );
                return dfd.promise( );
            }

            var alreadyInDom = $( "html" ).hasClass( "animationfriendly" ) || $( "html" ).hasClass( "not-animationfriendly" ) || false;
            if ( !alreadyInDom ) {
                // getting local storage value to define right css class on html tag
                var animationFriendly = LocalStorage.get( this.settings.localStorageKey );
                // if we found a value and it is true,
                if ( animationFriendly ) {
                    declareAnimationFriendly( );
                    setTimeout( dfd.resolve, 50 );
                    return dfd.promise( );
                }
                // if we found a value and it is false
                if ( animationFriendly !== undefined && animationFriendly !== null && !animationFriendly ) {
                    declareNotAnimationFriendly( );
                    setTimeout( dfd.resolve, 50 );
                    return dfd.promise( );
                }
            }

            // if no value in local storage, we never executed it, so we go ahead with the test
            Modernizr.load( [ {
                load: [ "js/stresstest-async.min.js" ],
                complete: function ( ) {
                    // when notified of the test termination, we can notify the caller
                    EventsDispatcher.on( nu.widgets.StressTest.EVENT_STRESS_TEST_DONE, function ( ) {
                        Log.i( "Stress test executed" );
                        dfd.resolve( );
                    } );
                }
            } ] );

            return dfd.promise( );
        }

    } );

    function declareAnimationFriendly( ) {
        Log.i( "This browser is animation friendly" );
        $( "html" ).addClass( "animationfriendly" );
    }

    function declareNotAnimationFriendly( ) {
        Log.i( "This browser is NOT animation friendly" );
        $( "html" ).addClass( "not-animationfriendly" );
    }

    /**
     * @event
     * Fired when stress test is done.
     */
    nu.widgets.StressTest.EVENT_STRESS_TEST_DONE = "stresstest/done";

} )( jQuery, nu, nu.debug.Log, nu.cache.LocalStorage, nu.events.EventsDispatcher );