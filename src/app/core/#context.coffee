define "#context", ( require, exports, module ) ->

    Context = require "nu.core.Context"
    Utils = require "nu.Utils"

    ###*
    @property {nu.core.Context}
    Context instance which holds contextual data.
    @type nu.core.Context
    ###
    context = new Context
        localStorageKey: "app.context"
        synchronizeInLocalStorage: true

    module.exports = context
