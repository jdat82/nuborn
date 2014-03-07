define "manager.Manager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Base = require "common.Base"


    ###*
    @class manager.Manager
    @extends common.Base
    A simple parent class for all managers.
    ###
    class Manager extends Base

        ###*
        @constructor
        ###
        constructor: ->
            super()



    module.exports = Manager

