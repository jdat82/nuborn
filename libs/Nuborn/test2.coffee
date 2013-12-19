define "coffee2", (require, module, exports) ->

    Log = require "nu.debug.Log"
    DEBUG && Log.i "coffee rocks 2"

    coffee2 = require "coffee"

    module.exports =
        somekey: "someothervalue"