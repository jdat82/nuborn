define "manager.BootManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Manager = require "manager.Manager"
    Utils = require "utils.Utils"
    UIUtils = require "utils.UIUtils"
    messageWidget = require "widgets#message"
    StressTest = require "widgets.StressTest"
    settingsManager = require "manager#settings"

    ###*
    @class manager.BootManager
    @extends common.Base
    Implements boot algorithm.
    ###
    class BootManager extends Manager

        constructor: ->

        boot: ->

            dfd = $.Deferred()

            # Initializing global settings
            settingsPromise = settingsManager.init()

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
        log.i "All asynchronous tasks at startup are done. Loading first page." if INFO
        deferred.resolve()

    # Boot failed
    fail = ( deferred, result ) ->
        messageWidget.error()
        log.e "Oops... Something went wrong: ", result
        UIUtils.hideSplashScreen()
        deferred.rejectWith( result )


    module.exports = BootManager


###
Shared instance
###
define "manager#boot", ( require, exports, module ) ->

    'use strict'

    BootManager = require "manager.BootManager"
    module.exports = new BootManager()