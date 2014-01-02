define "#log", ( require, exports, module ) ->

    Log = require "nu.debug.Log"

    ###
    Creating a default logger.
    ###
    module.exports = new Log()