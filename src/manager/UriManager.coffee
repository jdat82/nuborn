
define "manager.UriManager", ( require, exports, module ) ->

    'use strict'

    # Defaults
    defaults =
        networks: {}
        services: {}
        mock: false

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
            @mock context.get "mock"

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
            mockEnabled = @settings.mock

            # When specifying a service path, you can use the shortand notation with a simple string
            # or an object with a url and network properties.
            path = ""
            if value instanceof Object
                if value.path and not mockEnabled && not value.useMocks
                    if value.network && !networkName
                        host = @getHost value.network
                        log.d "Found a declared host: #{host}" if DEBUG
                    path = value.path
                else if mockEnabled or value.useMocks
                    # Choosing a random mock
                    path = Utils.randomItemFromArray value.mocks
                    host = this.getHost "mock"
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
        Returns <networkName>'s' host.
        @param {String} networkName name of the network to use
        ###
        getHost: ( networkName ) ->
            if networkName && @settings.networks?[ networkName ]
                return @settings.networks[ networkName ].host

        ###*
        Returns <networkName>'s network object.
        @param {String} networkName name of the network to use
        ###
        getNetwork: ( networkName ) ->
            if networkName && @settings.networks?[ networkName ]
                return @settings.networks[ networkName ]

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
        mock: ( status ) ->
            if not status?
                return @settings.mock
            @settings.mock = !! status
            if @settings.mock
                log.d "Mocks ON" if DEBUG
            else
                log.d "Mocks OFF" if DEBUG
            context.set "mock", @settings.mock, true



    module.exports = UriManager

