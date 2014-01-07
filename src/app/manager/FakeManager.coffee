define "app.manager.FakeManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery

    ###*
    @class app.manager.FakeManager
    @singleton
    Fake Manager for demonstration purposes.
    ###
    class FakeManager

        constructor: () ->
            dfd = $.Deferred()
            window.setTimeout () ->
                dfd.resolve()
            , 3000

            return dfd.promise()

    FakeManager.instance = new FakeManager

    module.exports = FakeManager