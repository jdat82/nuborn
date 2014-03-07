define "#log", ( require, exports, module ) ->

    Log = require "debug.Log"

    ###
    Creating a default logger.
    ###
    module.exports = new Log()