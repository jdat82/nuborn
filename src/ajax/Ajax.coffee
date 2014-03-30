define "ajax.Ajax", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Base = require "common.Base"
    uris = require "ajax#uris"

    ###
    @class ajax.Ajax
    @extends common.Base
    Very simple wrapper for jQuery Ajax methods.
    Allows compatibility with UriManager and mocks.
    ###
    class Ajax extends Base

        ###
        @constructor
        ###
        constructor: ->

        ###
        Search a url in the UriManager and invoke jQuery GET method.
        ###
        get: (urlName, urlParams) ->
            return if not urlName
            url = uris.get urlName, urlParams
            return $.get url

        ###
        Search a url in the UriManager and invoke jQuery POST method.
        If useMocks is enabled on this url, switch method to GET instead.
        ###
        post: (urlName, urlParams, data) ->
            return if not urlName
            url = uris.get urlName, urlParams
            serviceConf = uris.getService urlName
            if serviceConf?.useMocks
                return $.get url
            else
                return $.post url, data

    module.exports = Ajax

###
Shared instance
###
define "ajax#ajax", ( require, exports, module ) ->

    'use strict'

    Ajax = require "ajax.Ajax"
    module.exports = new Ajax()