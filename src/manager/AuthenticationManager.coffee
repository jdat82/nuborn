define "manager.AuthenticationManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    localStorage = require "cache#local"
    Utils = require "utils.Utils"
    Manager = require "manager.Manager"
    context = require "#context"
    ajax = require "ajax#ajax"
    Constants = require "common.Constants"

    ###*
    @class manager.AuthenticationManager
    @extends manager.Manager
    @singleton
    Service that manage everything related to authentication (facebook, sign-in, sign-up).
    ###
    class AuthenticationManager extends Manager

        ###*
        @constructor
        ###
        constructor: ->
            super()

        ###
        Is there a user logged in.
        ###
        authenticated: ->
            return context.get("user")?

        userInfo: ->
            return context.get "user"

        ###
        Register a new user.
        ###
        signup: (model) ->
            dfd = new $.Deferred()
            ajax.post("signup", {})
            .done (data) ->
                # Functional error
                if data?.functionalcode
                    log.e "Sign up failed with error: #{data.status}" if ERROR
                    setTimeout ->
                        dfd.rejectWith data.functionalcode
                    , 3000
                    return
                # Success
                log.t "Sign up ajax response: #{Utils.toJSON data}" if TRACE
                # Simulating network latency
                setTimeout dfd.resolve, 3000
            .fail (error) ->
                log.e "Sign up failed with error: #{Utils.toJSON error}" if ERROR
                dfd.rejectWith error
            return dfd.promise()

        ###
        Connect a user.
        ###
        signin: (model) ->
            dfd = new $.Deferred()
            ajax.post("signin", {})
            .done (data) ->
                # Functional error
                if data?.functionalcode
                    log.e "Sign in failed with error: #{data.functionalcode}" if ERROR
                    setTimeout ->
                        dfd.rejectWith data.functionalcode
                    , 3000
                    return
                # Success
                log.t "Sign in ajax response: #{Utils.toJSON data}" if TRACE
                # Saving user info
                context.set "user", data, true
                # Simulating network latency
                setTimeout dfd.resolve, 3000
            .fail (error) ->
                log.e "Sign in failed with error: #{Utils.toJSON error}" if ERROR
                dfd.rejectWith error
            return dfd.promise()


    module.exports = AuthenticationManager


###
Shared instance.
###
define "manager#authentication", ( require, exports, module ) ->

    'use strict'

    AuthenticationManager = require "manager.AuthenticationManager"
    module.exports = new AuthenticationManager()