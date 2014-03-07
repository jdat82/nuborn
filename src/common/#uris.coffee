define "#uris", ( require, exports, module ) ->

    'use strict'

    UriManager = require "manager.UriManager"

    getCurrentHost = () ->
        return "#{location.protocol}//#{location.host}"

    ###*
    Declaration of all urls used in the application.
    @property {manager.UriManager} uris
    @member app
    ###
    uris = new UriManager
        networks:
            "backend":
                "host": BACKEND
                "default": true
            "mock":
                "host": "mock"
            "current":
                "host": getCurrentHost()
        services: {}
            # Sample
            # "get-game":
            #     path: "/?cogit_webservice=getcurrentgame&userToken={0}"
            #     useMocks: true
            #     mocks: [
            #         "/game-winner.json"
            #         "/game-looser.json"
            #         "/no-game.json"
            #         "/bad-parameters.json"
            #     ]


    module.exports = uris