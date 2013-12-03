/*
 * @provide nu.widgets.StressTest
 * @require nu.cache.LocalStorage
 * @require nu.events.EventsDispatcher
 */
define( "nu.widgets.StressTest", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;
    var Log = require( "nu.debug.Log" );
    var LocalStorage = require( "nu.cache.LocalStorage" );
    var EventsDispatcher = require( "nu.events.EventsDispatcher" );

    /**
     * @class nu.widgets.StressTest
     *
     * Play a css animation to evaluate device performances.
     * When done, add a CSS class to html tag: either animationfriendly or no-animationfriendly.
     */
    var StressTest = Object.subClass( {

        /**
         * @constructor
         */
        init: function ( settings ) {
            this.settings = $.extend( true, defaults, settings );
        },

        /**
         *
         */
        play: function () {

            var dfd = $.Deferred();

            // if no local storage on device, we face an old browser, so we make a safety choice : no animation for this device
            if ( !Modernizr.localstorage ) {
                declareNotAnimationFriendly();
                setTimeout( dfd.resolve, 50 );
                return dfd.promise();
            }

            // checking local storage and dom
            var alreadyInDom = $( "html" ).hasClass( StressTest.KEY_ANIMATIONFRIENDLY ) || $( "html" ).hasClass( StressTest.KEY_NO_ANIMATIONFRIENDLY ) || false;
            if ( !alreadyInDom ) {
                // getting local storage value to define right css class on html tag
                var animationFriendly = LocalStorage.get( this.settings.localStorageKey );
                // if we found a value and it is true,
                if ( animationFriendly ) {
                    declareAnimationFriendly();
                    setTimeout( dfd.resolve, 50 );
                    return dfd.promise();
                }
                // if we found a value and it is false
                if ( animationFriendly !== undefined && animationFriendly !== null && !animationFriendly ) {
                    declareNotAnimationFriendly();
                    setTimeout( dfd.resolve, 50 );
                    return dfd.promise();
                }
            }

            // checking transform support
            if ( !Modernizr.csstransforms3d || !Modernizr.cssanimations ) {
                Log.i( "No transform or animation support !" );
                declareNotAnimationFriendly();
                setTimeout( dfd.resolve, 50 );
                return dfd.promise();
            }

            // if no value in local storage, we never executed it, so we go ahead with the test
            Modernizr.load( [ {
                load: [ "js/stresstest-async.min.js" ],
                complete: function () {
                    // when notified of the test termination, we can notify the caller
                    EventsDispatcher.on( StressTest.EVENT_STRESS_TEST_DONE, function () {
                        Log.i( "Stress test executed" );
                        dfd.resolve();
                    } );
                }
            } ] );

            return dfd.promise();
        }

    } );

    /**
     * @event
     * Fired when stress test is done.
     */
    StressTest.EVENT_STRESS_TEST_DONE = "stresstest/done";

    /**
     * CSS class name that mean "this browser is animation frienldy".
     */
    StressTest.KEY_ANIMATIONFRIENDLY = "animationfriendly";

    /**
     * CSS class name that mean "this browser is NOT animation frienldy".
     */
    StressTest.KEY_NO_ANIMATIONFRIENDLY = "no-animationfriendly";


    /*
     * Private variables.
     */
    var defaults = {
        localStorageKey: StressTest.KEY_ANIMATIONFRIENDLY
    };

    function declareAnimationFriendly() {
        Log.i( "This browser is animation friendly" );
        Modernizr.addTest( StressTest.KEY_ANIMATIONFRIENDLY, function () {
            return true;
        } );
    }

    function declareNotAnimationFriendly() {
        Log.i( "This browser is NOT animation friendly" );
        Modernizr.addTest( StressTest.KEY_ANIMATIONFRIENDLY, function () {
            return false;
        } );
    }

    module.exports = StressTest;

} );