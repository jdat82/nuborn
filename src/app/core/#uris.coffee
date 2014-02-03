define "#uris", ( require, exports, module ) ->

    'use strict'

    UriManager = require "nu.core.UriManager"

    getCurrentHost = () ->
        return "#{location.protocol}//#{location.host}"

    ###*
    Declaration of all urls used in the application.
    @property {nu.core.UriManager} uris
    @member app
    ###
    uris = new UriManager
        networks:
            "backend":
                "host": BACKEND
            "mock":
                "host": "mock/"
            current:
                host: getCurrentHost()
                "default": true
        services: {}
            # "test": "/service?{0}"
            # "test2":
            #     path: "/service?{0}"
            #     network: "backend"


    module.exports = uris