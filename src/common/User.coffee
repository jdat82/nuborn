define "common.User", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Base = require "common.Base"

    ###
    @class common.User
    @extends common.Base
    User class.
    ###
    class User extends Base

        ###
        Key used to store the user id in context.
        @static
        ###
        @KEY_ID: "userId"

        ###
        @constructor
        ###
        constructor: ->


    module.exports = User