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
        services:
            "get-news":
                path: "some service path..."
                useMocks: true
                mocks: [
                    "/news.json"
                    # "/no-news.json"
                    # "/error.json"
                ]


    module.exports = uris