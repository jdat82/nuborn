( function () {

    'use strict';

    var $ = jQuery;
    var Log = require( "nu.debug.Log" );
    var LocalStorage = require( "nu.cache.LocalStorage" );
    var EventsDispatcher = require( "nu.events.EventsDispatcher" );
    var StressTest = require( "nu.widgets.StressTest" );

    // load template
    // insert in DOM
    // add CSS class to start animation
    // wait for end of animation while collecting FPS mesures
    // compute medium FPS
    // add css class to html tag: either animable or not-animable
    // resolve promise

    // loading script asynchronously
    Modernizr.load( [ {
        load: [ "js/fpsmeter-async.min.js" ],
        complete: function () {

            // checking status
            if ( !window.FPSMeter )
                testDone();

            Log.i( "FPSMeter loaded" );

            var results = [];

            var onFPSMeterEvent = function ( evt ) {
                DEBUG && Log.i( "fps:" + evt.fps );
                results.push( evt.fps );
                if ( !this.meterStarted ) {
                    this.meterStarted = true;
                    // after N seconds, stop the meter and analyse the results
                    stopMeterAfterDelay( onFPSMeterEvent, results );
                }
            };

            document.addEventListener( 'fps', onFPSMeterEvent, false );

            FPSMeter.run();
        }

    } ] );

    function stopMeterAfterDelay( eventHandler, results ) {
        setTimeout( function () {
            FPSMeter.stop();
            document.removeEventListener( 'fps', eventHandler );
            computeResults( results );
            testDone();
        }, 10000 );
    }

    function computeResults( results ) {
        // computing average FPS
        var sum = results.reduce( function ( previousValue, currentValue, index, array ) {
            return previousValue + currentValue;
        } );
        var avg = sum / results.length;
        Log.i( "Average FPS: " + avg );
        // putting the right class to the DOM
        Modernizr.addTest( StressTest.KEY_ANIMATIONFRIENDLY, function () {
            var isAnimationFriendly = avg >= 30;
            LocalStorage.set( StressTest.KEY_ANIMATIONFRIENDLY, isAnimationFriendly );
            return isAnimationFriendly;
        } );
    }

    function testDone() {
        // notifying listeners that the test is done
        EventsDispatcher.emit( {
            name: StressTest.EVENT_STRESS_TEST_DONE
        } );
    }

} )();