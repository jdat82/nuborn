define "#context", ( require, exports, module ) ->

    Context = require "common.Context"

    ###*
    @property {common.Context}
    Context instance which holds contextual data.
    @type common.Context
    ###
    context = new Context

    module.exports = context
