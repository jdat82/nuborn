define "manager.UrbanAirshipNotificationManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    NotificationManager = require "manager.NotificationManager"
    Utils = require "utils.Utils"

    ###*
    @class manager.UrbanAirshipNotificationManager
    @extends manager.NotificationManager
    Urban Airship notification manager.
    ###
    class UrbanAirshipNotificationManager extends NotificationManager

        ###
        Event triggered when tags are modified.
        ###
        @EVENT_TAGS_UPDATED: "notification/tags/update"

        ###
        @constructor
        Predicat: push is enabled at startup.
        ###
        constructor: ->
            super()

            if !window.PushNotification
                log.i "Detected zero push mechanism" if INFO
                return

            log.i "Detected Urban Airship push mechanism" if INFO

            document.addEventListener "resume", onResume
            document.addEventListener "pause", onPause
            document.addEventListener "urbanairship.registration", onRegistration
            document.addEventListener "urbanairship.push", handleIncomingPush

        ###
        Notification settings reset.
        ###
        reset: ->

            if not window.PushNotification
                return

            PushNotification.isPushEnabled ( hasPush ) ->
                if hasPush
                    log.i "Push is enabled" if INFO
                    configure()
                    registerTags()
                else
                    log.i "Push is disabled" if INFO

    # Incoming message callback
    handleIncomingPush = ( event ) ->
        if event.message
            log.d "Incoming push with message: #{event.message} and extras: #{Utils.toJSON event.extras}" if DEBUG
            if navigator.notification?.alert then dialog = navigator.notification.alert else dialog = alert
            dialog event.message, null, "Message"
        else
            log.d "No incoming push" if DEBUG

    # Registration callback
    onRegistration = ( event ) ->

        if not event.error
            log.d "Urban Airship registration succeeded: #{event.pushID}" if DEBUG
        else
            log.d "Urban Airship registration failed with error: #{event.error}" if DEBUG

        PushNotification.isPushEnabled ( hasPush ) ->
            if hasPush
                log.i "Push is enabled" if INFO
                configure()
                PushNotification.getIncoming handleIncomingPush
            else
                log.i "Push is disabled" if INFO

    configure =  ->

        PushNotification.getPushID ( pushId ) ->
            log.d "Push identifier: #{pushId}" if DEBUG

        PushNotification.setVibrateEnabled true, ( status ) ->
            if status is "OK"
                log.d "Vibration enabled for incoming push" if DEBUG
            else
                log.d "Vibration not enabled for incoming push " if DEBUG

        # Register for notification types
        if IOS
            PushNotification.registerForNotificationTypes(
                PushNotification.notificationType.badge |
                PushNotification.notificationType.sound |
                PushNotification.notificationType.alert )

    registerTags = ->
        # someTag = "someTag"
        # PushNotification.setTags [ someTag ], ->
            # PushNotification.getTags ( obj ) ->
            #     log.d "Listening to notification tags: #{Utils.toJSON obj.tags}" if DEBUG
            #     broker = require "events#broker"
            #     broker.dispatch UrbanAirshipNotificationManager.TAGS_UPDATED

    onResume = ->
        log.d "Application has gone to foreground" if DEBUG
        # Reregister for urbanairship events if they were removed in pause event
        document.addEventListener "urbanairship.registration", onRegistration
        document.addEventListener "urbanairship.push", handleIncomingPush
        PushNotification.getPushID ( pushId ) ->
            log.d "Push identifier:  #{pushId}" if DEBUG
        PushNotification.getIncoming handleIncomingPush

    onPause = ->
        log.d "Application has gone to background" if DEBUG
        # Remove urbanairship events.  Important on android to not receive push in the background.
        document.removeEventListener "urbanairship.registration", onRegistration
        document.removeEventListener "urbanairship.push", handleIncomingPush


    module.exports = UrbanAirshipNotificationManager


###
The shared instance
###
define "manager#urbanAirshipNotification", ( require, exports, module ) ->

    'use strict'

    UrbanAirshipNotificationManager = require "manager.UrbanAirshipNotificationManager"
    module.exports = new UrbanAirshipNotificationManager()