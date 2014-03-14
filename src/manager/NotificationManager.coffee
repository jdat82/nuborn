define "manager.NotificationManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Manager = require "manager.Manager"
    Utils = require "utils.Utils"

    ###*
    @class manager.NotificationManager
    @extends common.Base
    Urban Airship notification manager.
    TODO: if needs be, change NotificationManager to be an abstract class for specific implementations.
        There would be a UrbanAirshipNotificationManager, etc.
    ###
    class NotificationManager extends Manager

        constructor: ->
            super()
            @reset()

        reset: ->

            if !window.PushNotification
                log.i "Detected zero push mechanism" if INFO
                return

            log.i "Detected Urban Airship push mechanism" if INFO

            # Handle resume
            document.removeEventListener "resume", onResume
            document.addEventListener "resume", onResume

            # Handle pause
            document.removeEventListener "pause", onPause
            document.addEventListener "pause", onPause

            # Register for any urban airship events
            document.removeEventListener "urbanairship.registration", onRegistration
            document.addEventListener "urbanairship.registration", onRegistration

            document.removeEventListener "urbanairship.push", handleIncomingPush
            document.addEventListener "urbanairship.push", handleIncomingPush

            PushNotification.setVibrateEnabled true, ( status ) ->
                if status is "OK"
                    log.d "Enabled vibration for incoming push" if DEBUG
                else
                    log.d "Vibration not enabled for incoming push " if DEBUG

            # Register for notification types
            PushNotification.registerForNotificationTypes(
                PushNotification.notificationType.badge |
                PushNotification.notificationType.sound |
                PushNotification.notificationType.alert )

            registerTags()

            PushNotification.enablePush()

            # Get any incoming push from device ready open
            PushNotification.getIncoming( handleIncomingPush )



    # Incoming message callback
    handleIncomingPush = ( event ) ->
        if event.message
            log.d "Incoming push with message: #{event.message} and extras: #{Utils.toJSON event.extras}" if DEBUG
        else
            log.d "No incoming push" if DEBUG

    # Registration callback
    onRegistration = ( event ) ->
        if !event.error
            log.d "Urban Airship registration succeeded: #{event.pushID}" if DEBUG
        else
            log.d "Urban Airship registration failed with error: #{event.error}" if DEBUG

    registerTags = ->
        # someTag = "someTag"
        # PushNotification.setTags [ someTag ], ->

    onResume = ->
        log.d "Application has gone to foreground" if DEBUG
        PushNotification.resetBadge()
        PushNotification.getIncoming handleIncomingPush
        # Reregister for urbanairship events if they were removed in pause event
        document.addEventListener "urbanairship.registration", onRegistration
        document.addEventListener "urbanairship.push", handleIncomingPush
        registerTags()

    onPause = ->
        log.d "Application has gone to background" if DEBUG
        # Remove urbanairship events.  Important on android to not receive push in the background.
        document.removeEventListener "urbanairship.registration", onRegistration
        document.removeEventListener "urbanairship.push", handleIncomingPush


    module.exports = NotificationManager


###
The shared instance
###
define "manager#notification", ( require, exports, module ) ->

    'use strict'

    NotificationManager = require "manager.NotificationManager"
    module.exports = new NotificationManager()