define "manager.PolyfillManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    Manager = require "manager.Manager"

    ###*
    @class manager.PolyfillManager
    @singleton
    Handle everything related to polyfills.
    ###
    class PolyfillManager extends Manager

        ###*
        Download all mandatory polyfills and notify the caller with a Deferred when done.
        ###
        constructor: () ->


    module.exports = PolyfillManager


###
The shared instance
###
define "#polyfillManager", ( require, exports, module ) ->

    'use strict'

    PolyfillManager = require "manager.PolyfillManager"
    module.exports = new PolyfillManager()