define "cache.XML", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Utils = require "utils.Utils"
    localStorage = require "cache#local"
    Base = require "common.Base"

    defaults =
        skipDownload: false
        headers:
            "Cache-Control": "public, max-age=2592000" # Caching : max 1 month

    ###*
     @class cache.XML
     @singleton
     Helper class to download and cache XML content in local storage.
    ###
    class XML extends Base

        constructor: () ->
            super()
            @data.xml = new XMLSerializer()

        ###*
         Donwload and save in local storage a remote XML.
         @return the local storage key of the resource (either it was already in cache or was downloaded).
         @param {String} url Remote adress
         @param {Object} settings Options :
         - skipDownload: if true, do not try to download, just check existence, even if not in cache
         - key: to override the default name strategy which is to replace all ":"" and "/" characters with "_"
        ###
        cache: ( url, settings ) ->

            dfd = $.Deferred()

            if not url
                errorMsg = "Missing URL"
                Log.w errorMsg if WARN
                dfd.rejectWith @, [errorMsg]
                return dfd.promise()

            settings = $.extend true, {}, defaults, settings

            url = encodeURI url
            key = settings.key or url.replace( /[:\/]/g, "_" )

            log.t "key: #{key}" if TRACE

            if settings.skipDownload
                if localStorage.get(key) isnt null
                    dfd.resolveWith @, [key]
                    return dfd.promise()
                else
                    dfd.rejectWith @, ["Not in cache"]
                    return dfd.promise()

            # Not in cache
            if localStorage.get(key) is null
                log.d "Resource with key '#{key}' not in local storage" if DEBUG

                $.ajax
                    url: url,
                    dataType: 'xml'

                .done (data) =>
                    localStorage.set key, @data.xml.serializeToString(data.documentElement), false
                    dfd.resolveWith @, [key]

                .fail (error) =>
                    log.e "Failed to load #{url} with error: #{error}" if ERROR
                    dfd.rejectWith @, [error]

                return dfd.promise()

            else
                # Already in cache
                log.d "A copy of #{key} already in local storage" if DEBUG
                dfd.resolveWith @, [key]
                return dfd.promise()


    module.exports = XML

###
The shared instance
###
define "cache#xml", ( require, exports, module ) ->

    'use strict'

    XML = require "cache.XML"
    module.exports = new XML()