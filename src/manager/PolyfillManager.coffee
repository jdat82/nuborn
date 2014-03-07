define "manager.PolyfillManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery

    ###*
    @class manager.PolyfillManager
    @singleton
    Handle everything related to polyfills.
    ###
    class PolyfillManager

        ###*
        Download all mandatory polyfills and notify the caller with a Deferred when done.
        ###
        constructor: () ->


    PolyfillManager.instance = new PolyfillManager

    module.exports = PolyfillManager
