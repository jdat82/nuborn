define "nu.widgets.Offline", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Message = require "nu.widgets.Message"
    Utils = require "nu.Utils"



    ###
    @class nu.widgets.Offline
    A fullscreen widget which add an overlay above the current page with a network issue message.
    ###
    class Offline

        ###
        Watching some events for connectivy checks.
        ###
        watch: () ->
            $( document ).on "online offline", checkConnectivity

        unwatch: () ->
            $( document ).off "online offline", checkConnectivity



    checkConnectivity = ( event ) ->

        isNetworkAvailable = Utils.isNetworkAvailable()

        DEBUG && log.i "Is Network Available : #{isNetworkAvailable}"
        DEBUG && log.i "Event: #{event.type}"

        if isNetworkAvailable then Message.instance.hide() else Message.instance.offline()


    # Singleton
    Offline.instance = new Offline()

    module.exports = Offline


$ ->
    Offline = require( "nu.widgets.Offline" )
    Offline.instance.watch()
