define "common.Constants", ( require, exports, module ) ->

    'use strict'

    ###*
    App constants.
    @enum Constants
    ###
    module.exports =

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
