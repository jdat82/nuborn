define "nu.widgets.StressTest", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    localStorage = require( "nu.cache.LocalStorage" ).instance
    events = require( "nu.events.EventsDispatcher" ).instance
    Base = require "nu.core.Base"

    ###*
    @class nu.widgets.StressTest
    Play a css animation to evaluate device performances.
    When done, add a CSS class to html tag: either animationfriendly or no-animationfriendly.
    ###
    class StressTest extends Base

        ###*
        @constructor
        ###
        constructor: ( settings ) ->
            super defaults, settings

        ###*
        Play the stress test.
        ###
        play: () ->

            dfd = $.Deferred()

            # If no local storage on device, we face an old browser, so we make a safety choice : no animation for this device
            if not Modernizr.localstorage
                log.w "No local storage, assuming it is an old device. Deactivated animations"
                declareNotAnimationFriendly()
                localStorage.set StressTest.KEY_ANIMATIONFRIENDLY, false
                dfd.resolve()
                return dfd.promise()

            # Checking local storage and dom

            # Getting local storage value to define right css class on html tag
            animationFriendly = localStorage.get this.settings.localStorageKey
            log.i "Animation friendly saved value is: #{animationFriendly}"

            # If we found a value and it is true,
            if animationFriendly != null && animationFriendly is true
                declareAnimationFriendly()
                dfd.resolve()
                return dfd.promise()

            # If we found a value and it is false
            if animationFriendly != null && animationFriendly is false
                declareNotAnimationFriendly()
                dfd.resolve()
                return dfd.promise()

            # Checking transform support
            if !Modernizr.csstransforms3d or !Modernizr.cssanimations
                log.w "CSS animations not supported. Animations deactivated."
                localStorage.set StressTest.KEY_ANIMATIONFRIENDLY, false
                declareNotAnimationFriendly()
                dfd.resolve()
                return dfd.promise()

            # If no value in local storage, we never executed it, so we go ahead with the test
            Modernizr.load [ {
                load: [ "js/stresstest-async.min.js" ],
                complete: () ->
                    DEBUG && log.i "File stresstest-async.min.js loaded"
                    # When notified of the test termination, we can notify the caller
                    events.on StressTest.EVENT_STRESS_TEST_DONE, () ->
                        log.i "Stress test executed"
                        dfd.resolve()
            } ]

            return dfd.promise()



    ###*
    @event
    Fired when stress test is done.
    ###
    StressTest.EVENT_STRESS_TEST_DONE = "stresstest/done"

    ###*
    @static
    CSS class name that mean "this browser is animation frienldy".
    ###
    StressTest.KEY_ANIMATIONFRIENDLY = "animationfriendly"

    ###*
    @static
    CSS class name that mean "this browser is NOT animation frienldy".
    ###
    StressTest.KEY_NO_ANIMATIONFRIENDLY = "no-animationfriendly"

    ###
    Defaults.
    ###
    defaults =
        localStorageKey: StressTest.KEY_ANIMATIONFRIENDLY



    declareAnimationFriendly = () ->
        log.i "This browser is animation friendly"
        Modernizr.addTest StressTest.KEY_ANIMATIONFRIENDLY, () ->
            return true

    declareNotAnimationFriendly = () ->
        log.i "This browser is NOT animation friendly"
        Modernizr.addTest StressTest.KEY_ANIMATIONFRIENDLY, () ->
            return false



    module.exports = StressTest

