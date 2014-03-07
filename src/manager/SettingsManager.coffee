define "manager.SettingsManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Constants = require "common.Constants"
    localStorage = require( "cache.LocalStorage" ).instance
    StressTest = require "widgets.StressTest"
    Utils = require "utils.Utils"
    Manager = require "manager.Manager"
    EventsBroker = require "events.EventsBroker"
    context = require "#context"


    html = document.querySelector "html"

    ###*
    @class manager.SettingsManager
    @extends manager.Manager
    @singleton
    Service that manage application settings.
    ###
    class SettingsManager extends Manager

        ###*
        @constructor
        ###
        constructor: ->
            super()

        init: ->
            dfd = $.Deferred()
            # DO things eventually with async operations (not the case today)...
            @initAnimations()
            dfd.resolve()
            return dfd.promise()

        initAnimations: ->
            # Holds the true device value
            @settings.cssanimations = Modernizr.cssanimations

            # Initializing animations property
            if !Modernizr.cssanimations
                context.set "animations", false, true
            else
                # If the context is cleared we need to restore the true value
                EventsBroker.instance.on Constants.Events.Context.CLEAR, =>
                    log.i "Restoring cssanimations true value" if DEBUG
                    @animations @settings.cssanimations

            contextValue = context.get "animations"
            if contextValue == null
                @animations true
            else
                @animations contextValue

        ###*
        Change animations state (enabled or disabled).
        ###
        toggleAnimations: ->
            return if !@settings.cssanimations
            @animations !@animations()

        ###*
        Getter/Setter for animations property which reflect the availability of animations in application.
        ###
        animations: ( newValue ) ->

            # If the device can't handle animations end of story
            return false if not @settings.cssanimations

            # Getter
            if newValue == null
                if context.get( "animations" ) == null
                    context.set "animations", Modernizr.cssanimations, true
                return context.get "animations"
            # Setter
            else
                newValue = !! newValue
                context.set "animations", newValue, true
                Modernizr.cssanimations = newValue
                if newValue
                    html.classList.add "cssanimations"
                    html.classList.remove "no-cssanimations"
                else
                    html.classList.add "no-cssanimations"
                    html.classList.remove "cssanimations"

        ###*
        Getter and Setter for animation friendly setting.
        Historically, this param is handled by Modernizr.
        Unfortunately, there is no mean to update a Modernizr test.
        So we need to fall back to manual handling. That's a shame.
        @param {Boolean} enable (optional).
        If no param, return the current value.
        If true or false, setting is changed.
        ###
        # animationFriendly: ( newValue ) ->

        #     currentValue = Modernizr.animationfriendly
        #     # Getter
        #     return currentValue if newValue is undefined

        #     # If setting unchanged: nothing to do
        #     # newValue = ( newValue is true )
        #     return if currentValue is newValue

        #     # Setter
        #     if currentValue is true
        #         currentCssClass = StressTest.KEY_ANIMATIONFRIENDLY
        #     else
        #         currentCssClass = StressTest.KEY_NO_ANIMATIONFRIENDLY

        #     Modernizr.animationfriendly = newValue

        #     if newValue is true
        #         newCssClass = StressTest.KEY_ANIMATIONFRIENDLY
        #     else
        #         newCssClass = StressTest.KEY_NO_ANIMATIONFRIENDLY

        #     $html = $( "html" )
        #     $html.removeClass currentCssClass
        #     $html.addClass newCssClass

        #     # Saved in localstorage
        #     localStorage.set StressTest.KEY_ANIMATIONFRIENDLY, newValue

        #     log.i "Animation friendly: #{newValue}"

        logsRecording: () ->
            return log.channel( log.CHANNEL_STORAGE ) isnt undefined

        toggleLogsRecording: () ->
            storageChannel = log.channel log.CHANNEL_STORAGE
            storageEnabled = storageChannel isnt undefined
            # Before deactivating the storage channel, I prefer to clear it to avoid an endless growing log
            storageChannel?.clear()
            # Handling change event
            log.channel log.CHANNEL_STORAGE, !storageEnabled
            log.i "Logs recording: #{!storageEnabled}"



    SettingsManager.instance = new SettingsManager

    module.exports = SettingsManager
