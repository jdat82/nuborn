define "utils.NetworkUtils", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    BrowserUtils = require "utils.BrowserUtils"

    ###*
    @class utils.NetworkUtils
    @singleton
    Network related utilities method.
    ###
    class NetworkUtils

        ###*
        Checks if Internet is reachable.
        @return {Boolean} The reachability of the internet
        ###
        @isNetworkAvailable = () ->
            if BrowserUtils.isCordova()
                return navigator.connection.type isnt Connection.NONE
            else
                return navigator.onLine

        ###*
        Deserialize the hash part of a URL.
        @param {String} hash Hash part of a URL. If null, window.location.hash is used.
        @return {Object}
        @return {String} return.name Hash name
        @return {Object} return.params Hash parameters
        ###
        @deserializeHash = ( hash ) ->
            result =
                name: null
                params: null

            if not hash?.length then hash = window.location.hash

            # Adding the raw source, can be useful for regexp searchs for instance
            result.hash = hash

            # No hash, no op.
            hashIndex = hash.lastIndexOf "#"
            return result if hashIndex < 0

            # Removing part before hash
            hash = hash.substr hashIndex

            # Is there hash parameters too ?
            questionMarkIndex = hash.indexOf "?"
            if questionMarkIndex < 0
                questionMarkIndex = hash.length
            else
                questionMarkIndex += 1

            # Extracting hash name
            result.name = hash.substr 0, questionMarkIndex
            if result?.name?.length then result.name = result.name.replace /(.*#)|(\?.*)/g, ""

            # Extracting hash parameters
            result.params = @deserializeParameters hash.substr questionMarkIndex

            return result

        ###*
        Create a javascript object from a string hash which contains key/value parameters.
        @param {String} hash Minimum significant pattern is "?key=value"
        @return {Object} Simple key/value object.
        ###
        @deserializeParameters = ( hash ) ->

            result = null
            if not hash?.length then return result

            # Extracting hash parameters substring
            hashParameters = hash.substr hash.indexOf( "?" ) + 1
            if not hashParameters?.length then return result

            # Parsing key=value pairs
            paramsArray = hashParameters.split "&"
            for param in paramsArray
                result = result or {}
                keyValueArray = param.split "="
                if not keyValueArray?.length then return
                result[ keyValueArray[ 0 ] ] = decodeURIComponent keyValueArray[ 1 ]

            return result

        ###*
        Create a new String object from a javascript object.
        @param {Object} parameters Simple key/value object.
        @return {String} following pattern "key1=value[&key2=value&...]"
        ###
        @serializeHashParameters = ( parameters ) ->

            result = ""
            return result if not parameters

            paramsArray = []
            for key, value of parameters
                paramsArray.push "#{key}=#{encodeURIComponent value}"

            result = paramsArray.join "&"
            return result


    module.exports = NetworkUtils