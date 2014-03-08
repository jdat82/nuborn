define "manager.NewsManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Manager = require "manager.Manager"
    Utils = require "utils.Utils"

    ###
    @class manager.NewsManager
    @extends common.Base
    Implements boot algorithm.
    ###
    class NewsManager extends Manager

        ###
        @constructor
        ###
        constructor: ->

        news: ->

            dfd = $.Deferred()


            return dfd.promise()


    module.exports = NewsManager


###
Shared instance
###
define "#newsManager", ( require, exports, module ) ->

    'use strict'

    NewsManager = require "manager.NewsManager"
    module.exports = new NewsManager()
