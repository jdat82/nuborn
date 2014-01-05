define "app.pages.DefaultPageHandler", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    Utils = require "nu.Utils"
    log = require "#log"
    PageHandler = require "nu.pages.PageHandler"

    ###*
    @class app.pages.DefaultPageHandler
    @extends nu.pages.PageHandler
    The default Page Handler when no other page handler was found.
    ###
    class DefaultPageHandler extends PageHandler

        constructor: () ->
            super
                id: "default"
                default: true

        ###*
        Override default behavior.
        ###
        load: ( pageParams ) ->

            log.i "Using default page handler" if DEBUG

            hash = utils.deserializeHash()

            # If the default page handler is invoke, it means nuborn hasn't found any page handler for the current hash name.
            # ph = find the right page handler eventually

            # transferring first page properties to the right page handler
            # ph.data.isFirst = @data.isFirst
            # ph.load pageParams

        ###*
        Override default behavior.
        ###
        navigate: ( options ) ->
            # app dependant


    module.exports = DefaultPageHandler

