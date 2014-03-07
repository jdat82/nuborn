define "common.Constants", ( require, exports, module ) ->

    'use strict';

    ###*
    App constants.
    @enum Constants
    ###
    module.exports =

        ###
        User's contants.
        ###
        User:
            ###
            Key used to store the user id in context.
            ###
            USER_ID: "userId"

        ###
        Event's constants.
        ###
        Events:
            ###
            Context events.
            ###
            Context:
                ###
                Invoked when the whole context is cleared.
                ###
                CLEAR: "context/clear"
            ###
            Splashscreen events.
            ###
            Splashscreen:
                ###
                Invoking this event show the splashscreen.
                ###
                SHOW: "splashscreen/show"
                ###
                Invoking this event hide the splashscreen.
                ###
                HIDE: "splashscreen/hide"
            ###
            StressTest widget events.
            ###
            StressTest:
                ###
                When the stresstest is done.
                ###
                DONE: "stresstest/done"

        ###
        Ajax constants.
        ###
        Ajax:
            ###
            Success.
            ###
            OK: "OK"
            ###
            Generic error when parsing a backend response which is not in any expected format.
            ###
            UNKNOWN_ERROR: "UNKNOWN_ERROR"
