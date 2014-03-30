define "manager.NotificationManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Manager = require "manager.Manager"
    Utils = require "utils.Utils"

    ###*
    @class manager.NotificationManager
    @extends manager.Manager
    Generic notification manager.
    ###
    class NotificationManager extends Manager

        constructor: ->
            super()


    module.exports = NotificationManager


###
The shared instance
###
define "manager#notification", ( require, exports, module ) ->

    'use strict'

    NotificationManager = require "manager.NotificationManager"
    module.exports = new NotificationManager()