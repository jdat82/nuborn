define "manager.SettingsManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    localStorage = require "#localStorage"
    StressTest = require "widgets.StressTest"
    Utils = require "utils.Utils"
    Manager = require "manager.Manager"
    eventsBroker = require "#eventsBroker"
    context = require "#context"
    Context = require "common.Context"

    html = document.querySelector "html"

    KEY_ANIMATION_FRIENDLY = "animationfriendly"

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
            # If the context is cleared we need to restore the initial value
            onContextCleared = =>
                @initAnimations()
            eventsBroker.off Context.EVENT_CLEARED, onContextCleared
            eventsBroker.on Context.EVENT_CLEARED, onContextCleared

            dfd.resolve()
            return dfd.promise()

        initAnimations: ->

            savedValue = context.get KEY_ANIMATION_FRIENDLY
            if savedValue
                @animations savedValue
            else
                # Initializing animations property
                @animations Modernizr.cssanimations && Modernizr.csstransitions

        ###*
        Change animations state (enabled or disabled).
        ###
        toggleAnimations: ->
            @animations !@animations()

        ###*
        Getter/Setter for animations property which reflect the availability of animations in application.
        ###
        animations: ( newValue ) ->

            # Getter
            if not newValue?
                return context.get KEY_ANIMATION_FRIENDLY
            # Setter
            else
                newValue = !! newValue
                context.set KEY_ANIMATION_FRIENDLY, newValue, true
                Modernizr.animationfriendly = newValue
                if newValue
                    html.classList.add KEY_ANIMATION_FRIENDLY
                    html.classList.remove "no-#{KEY_ANIMATION_FRIENDLY}"
                else
                    html.classList.add "no-#{KEY_ANIMATION_FRIENDLY}"
                    html.classList.remove KEY_ANIMATION_FRIENDLY


    module.exports = SettingsManager


###
Shared instance.
###
define "manager#settings", ( require, exports, module ) ->

    'use strict'

    SettingsManager = require "manager.SettingsManager"
    module.exports = new SettingsManager()