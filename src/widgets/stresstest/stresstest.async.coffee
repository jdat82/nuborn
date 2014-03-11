###
Self executing code.
###
( ->

    'use strict'

    $ = jQuery
    log = require "#log"
    localStorage = require "#localStorage"
    eventsBroker = require "#eventsBroker"
    StressTest = require "widgets.StressTest"

    results = []
    meterStarted = false

    ###
    Aggregate fps values.
    ###
    onFPSMeterEvent = ( evt ) ->
        DEBUG && log.i "fps: #{evt.fps}"
        results.push evt.fps
        if not meterStarted
            meterStarted = true
            # after N seconds, stop the meter and analyse the results
            stopMeterAfterDelay()


    ###
    Loading FPSMeter library asynchronously, then starting test.
    ###
    Modernizr.load [ {
        load: [ "js/fpsmeter.min.js" ],
        complete: () ->

            # If Library FPSMeter not present in window, aborting test
            if !window.FPSMeter
                log.i "FPSMeter not loaded"
                return testDone()

            log.i "FPSMeter loaded"

            document.addEventListener 'fps', onFPSMeterEvent, false

            FPSMeter.run()
    } ]



    ###
    Test last 10 seconds max.
    ###
    stopMeterAfterDelay = ( ) ->
        stop = () ->
            FPSMeter.stop()
            document.removeEventListener 'fps', onFPSMeterEvent
            computeResults()
            testDone()

        setTimeout stop, 10000



    ###
    Compute test results.
    ###
    computeResults = () ->

        # Computing average FPS
        sum = results.reduce ( previousValue, currentValue, index, array ) ->
            return previousValue + currentValue

        avg = sum / results.length

        log.i "Average FPS: #{avg}"

        # Putting the right class to the DOM
        Modernizr.addTest StressTest.KEY_ANIMATIONFRIENDLY, ->
            isAnimationFriendly = avg >= 30
            localStorage.set StressTest.KEY_ANIMATIONFRIENDLY, isAnimationFriendly
            return isAnimationFriendly



    ###
    Notify listeners when done.
    ###
    testDone = () ->
        # Notifying listeners that the test is done
        eventsBroker.dispatch StressTest.EVENT_DONE

)()