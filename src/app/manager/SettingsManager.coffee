define "app.manager.SettingsManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Constants = require "app.Constants"
    localStorage = require( "nu.cache.LocalStorage" ).instance
    StressTest = require "nu.widgets.StressTest"

    ###
    Private data.
    ###
    data = {}

    ###*
    @class app.manager.SettingsManager
    @singleton
    Service that manage application settings.
    ###
    class SettingsManager

        ###*
        @constructor
        ###
        constructor: () ->

        ###*
        Inverse animation friendly value.
        ###
        toggleAnimationFriendly: () ->
            @animationFriendly !@animationFriendly()

        ###*
        Getter and Setter for animation friendly setting.
        Historically, this param is handled by Modernizr.
        Unfortunately, there is no mean to update a Modernizr test.
        So we need to fall back to manual handling. That's a shame.
        @param {Boolean} enable (optional).
        If no param, return the current value.
        If true or false, setting is changed.
        ###
        animationFriendly: ( newValue ) ->

            currentValue = Modernizr.animationfriendly
            # Getter
            return currentValue if newValue is undefined

            # If setting unchanged: nothing to do
            # newValue = ( newValue is true )
            return if currentValue is newValue

            # Setter
            if currentValue is true
                currentCssClass = StressTest.KEY_ANIMATIONFRIENDLY
            else
                currentCssClass = StressTest.KEY_NO_ANIMATIONFRIENDLY

            Modernizr.animationfriendly = newValue

            if newValue is true
                newCssClass = StressTest.KEY_ANIMATIONFRIENDLY
            else
                newCssClass = StressTest.KEY_NO_ANIMATIONFRIENDLY

            $html = $( "html" )
            $html.removeClass currentCssClass
            $html.addClass newCssClass

            # Saved in localstorage
            localStorage.set StressTest.KEY_ANIMATIONFRIENDLY, newValue

            log.i "Animation friendly: #{newValue}"

        logsRecording: () ->
            return log.channel( log.CHANNEL_STORAGE ) isnt undefined

        toggleLogsRecording: () ->
            storageChannel = log.channel log.CHANNEL_STORAGE
            storageEnabled = storageChannel isnt undefined
            # Before deactivating the storage channel, I prefer to clear it to avoid an endless growing log
            if storageEnabled && storageChannel then storageChannel.clear()
            # Handling change event
            log.channel log.CHANNEL_STORAGE, !storageEnabled
            log.i "Logs recording: #{!storageEnabled}"



    SettingsManager.instance = new SettingsManager

    module.exports = SettingsManager
