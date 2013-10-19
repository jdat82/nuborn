( function ( $, nu, Log, LocalStorage, EventsDispatcher, Constants, Modernizr, undefined ) {

    'use strict';

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
        complete: function ( ) {

            // checking status
            if ( !window.FPSMeter )
                testDone( );

            Log.i( "FPSMeter loaded" );

            var results = [ ];

            var onFPSMeterEvent = function ( evt ) {
                DEBUG && Log.i( "fps:" + evt.fps );
                results.push( evt.fps );
            };

            document.addEventListener( 'fps', onFPSMeterEvent, false );

            FPSMeter.run( );

            // after 5 seconds, stop the meter and analyse the results
            setTimeout( function ( ) {
                FPSMeter.stop( );
                document.removeEventListener( 'fps', onFPSMeterEvent );
                computeResults( results );
                testDone( );
            }, 5000 );
        }

    } ] );

    function computeResults( results ) {
        // computing average FPS
        var sum = results.reduce( function ( previousValue, currentValue, index, array ) {
            return previousValue + currentValue;
        } );
        var avg = sum / results.length;
        // putting the right class to the DOM
        if ( avg > 30 ) {
            $( "html" ).addClass( "animationfriendly" );
            LocalStorage.set( "animationfriendly", true );
            Log.i( "This browser is animation friendly" );
        }
        else {
            $( "html" ).addClass( "not-animationfriendly" );
            LocalStorage.set( "animationfriendly", false );
            Log.i( "This browser is NOT animation friendly" );
        }
    }

    function testDone( ) {
        // notifying listeners that the test is done
        EventsDispatcher.emit( Constants.EVENT_STRESS_TEST_DONE );
    }

} )( jQuery, nu, nu.debug.Log, nu.cache.LocalStorage, nu.events.EventsDispatcher, nu.core.Constants, Modernizr );