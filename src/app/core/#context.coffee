define "#context", ( require, exports, module ) ->

    Context = require "nu.core.Context"
    Constants = require "app.Constants"
    Utils = require "nu.Utils"

    ###*
    @property {nu.core.Context}
    Context instance which holds contextual data.
    @type nu.core.Context
    ###
    context = new Context
        localStorageKey: "nuborn.context"
        synchronizeInLocalStorage: true

    # Creating a user ID
    userId = context.get Constants.USER_ID
    if !userId then context.set Constants.USER_ID, Utils.guid()

    module.exports = context
