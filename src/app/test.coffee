define "coffee", (require, module, exports) ->

    Log = require "nu.debug.Log"
    DEBUG && Log.i "coffee rocks"

    module.exports =
        somekey: "somevalue"