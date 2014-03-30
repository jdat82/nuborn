
define "manager.UriManager", ( require, exports, module ) ->

    'use strict'

    # Defaults
    defaults =
        networks: {}
        services: {}
        mocks: false

    $ = jQuery
    log = require "#log"
    Base = require "common.Base"
    Utils = require "utils.Utils"
    StringUtils = require "utils.StringUtils"
    Base = require "common.Base"
    context = require "#context"


    ###*
    @class manager.UriManager
    Manage all URI in the entire application.
    Functionnalities :
    - Allows to declare several hosts which can be used singularly per service
    - Allows to declare a default network which will be used when no one is specified on a service
    - Allows to declare service urls network independent
    - Allows to handle several configurations on the same application like local services, remote services and mock services.
    ###
    class UriManager extends Base

        ###*
        Initialize network and services properties.
        @param {Object} settings
        ###
        constructor: ( settings ) ->
            super defaults, settings
            @findDefaultNetwork()
            @mocks context.get "mocks"

        ###*
        Return a service url built by concatenating the right host and the service path.
        Fill with parameters if provided.
        @param {String} id Service path key
        @param {Object} params Parameters to use when replacing placeholders
        @param {String} networkName Network to use. Overrides configuration (default or specific).
        ###
        get: ( id, params, networkName ) ->

            log.d "Searching a url for the service '#{id}' with these parameters: #{Utils.toJSON params}" if DEBUG

            return if !id

            return if !@settings.services?[id]

            host = ""
            value = @settings.services[ id ]
            mocksEnabled = @settings.mocks

            # When specifying a service path, you can use the shortand notation with a simple string
            # or an object with a url and network properties.
            path = ""
            if value instanceof Object
                if value.path and not mocksEnabled && not value.useMocks
                    if value.network && !networkName
                        host = @getHost value.network
                        log.d "Found a declared host: #{host}" if DEBUG
                    path = value.path
                else if mocksEnabled or value.useMocks
                    # Choosing a random mock
                    path = Utils.randomItemFromArray value.mocks
                    host = this.getHost "mocks"
                    log.d "Found a mock host: #{host}" if DEBUG
            else
                path = value

            # If a network was provided to override the declared one
            if not host && networkName
                nwk = @getNetwork networkName
                if nwk?.host
                    host = nwk.host
                    log.d "Found the given host: #{host}" if DEBUG
                else
                    log.d "No host for this network: #{networkName}" if DEBUG

            # if no explicit host, using the default one
            if not host and not networkName && @defaultNetwork && @defaultNetwork.host
                host = @defaultNetwork.host
                log.d "Found a default host: #{host}" if DEBUG

            service = StringUtils.replaceWith path, params

            url = host + service
            log.d "Service url for '#{id}' is: #{url}" if DEBUG
            return url;

        ###*
        Returns <name>'s' host.
        @param {String} name name of the network
        ###
        getHost: ( name ) ->
            return if not name
            network = @settings.networks?[ name ]
            return network.host

        ###*
        Returns <name>'s network configuration.
        @param {String} name name of the network
        ###
        getNetwork: ( name ) ->
            return if not name
            return @settings.networks?[ name ]

        ###*
        Returns <name>'s service configuration.
        @param {String} name name of the service
        ###
        getService: (name) ->
            return if not name
            return @settings.services?[name]

        ###*
        Add a new network.
        @param {String} name Network name (key in networks section)
        @param {String} url Network host
        @param {Boolean} isDefaultNetwork Is this the default network ?
        ###
        addNetwork: ( name, url, isDefaultNetwork ) ->
            # "name" is mandatory
            return if not name
            # You can't have a network without a url
            return if not url
            # Adding a new network
            network =
                "host": url
                "default": !! isDefaultNetwork
            @settings.networks[ name ] = network
            @findDefaultNetwork()

        ###*
        To add new configurations.
        @param {Object} settings.
        ###
        tune: ( settings ) ->
            super settings, true
            @findDefaultNetwork()

        ###*
        Search and return default network.
        You can have only one default network of course.
        If several, the first one is used.
        ###
        findDefaultNetwork: () ->
            # Sinon on regarde si un réseau possède le flag "default"
            for name, nwk of @settings.networks
                if nwk[ "default" ]
                    @defaultNetwork = nwk
                    return nwk

        ###*
        Getter/Setter for mocks.
        @param {Boolean} status true or false
        ###
        mocks: ( status ) ->
            if not status?
                return @settings.mocks
            @settings.mocks = !! status
            if @settings.mocks
                log.d "Mocks ON" if DEBUG
            else
                log.d "Mocks OFF" if DEBUG
            context.set "mocks", @settings.mocks, true



    module.exports = UriManager

