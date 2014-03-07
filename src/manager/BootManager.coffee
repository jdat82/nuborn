define "manager.BootManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Base = require "common.Base"
    Utils = require "utils.Utils"
    UIUtils = require "utils.UIUtils"
    Message = require "widgets.Message"
    StressTest = require "widgets.StressTest"
    SettingsManager = require "manager.SettingsManager"

    ###*
    @class manager.BootManager
    @extends common.Base
    Implements boot algorithm.
    ###
    class BootManager extends Base

        constructor: ->

        boot: ->

            dfd = $.Deferred()

            # Initializing global settings
            settingsPromise = SettingsManager.instance.init()

            # Widget that stress the device to check if it is capable of playing animations smoothly
            # stressTestPromise = new StressTest().play()

            # Others promises
            # ... App dependant

            # Deactivated the stressTestPromise as it doesn't works in Android 4.2.2
            $.when( settingsPromise )
            .done ->
                done(dfd)
            .fail ->
                fail(dfd, this)


            return dfd.promise()


    # When all promises are resolved, we can go ahead
    done = ( deferred ) ->
        log.i "All asynchronous tasks at startup are done. Loading first page." if DEBUG
        deferred.resolve()

    # Boot failed
    fail = ( deferred, result ) ->
        Message.instance.error()
        log.e "Oops... Something went wrong: #{Utils.toJSON result}"
        UIUtils.hideSplashScreen()
        deferred.rejectWith( result )


    BootManager.instance = new BootManager()

    module.exports = BootManager

