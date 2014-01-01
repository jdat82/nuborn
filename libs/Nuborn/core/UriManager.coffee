
define "nu.core.UriManager", ( require, exports, module ) ->

    'use strict'

    # Defaults
    defaults =
            networks: {}
            services: {}

    $ = jQuery
    log = require "#log"
    Base = require "nu.core.Base"

    ###*
    @class nu.core.UriManager
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
            @services = @settings.services
            @networks = @settings.networks
            @findDefaultNetwork()

        ###*
        Return a service url built by concatenating the right host and the service path.
        Fill with parameters if provided.
        @param {String} id Service path key
        @param {Object} params Parameters to use when replacing placeholders
        ###
        get: ( id, params ) ->

            return if !id

            return if !@services?[id]

            host = ""
            value = @services[ id ]

            # When specifying a service path, you can use the shortand notation with a simple string
            # or an object with a url and network properties.
            path = ""
            if value instanceof Object
                if value && value.path
                    if value.network
                        host = @getHost value.network
                    path = value.path
            else
                path = value

            # If no explicit host, using the default one
            if host is "" && @defaultNetwork && @defaultNetwork.host
                host = @defaultNetwork.host

            Utils = require "nu.Utils"
            service = Utils.replaceWith path, params

            # Revoir la gestion du mock pour fonctionner par url sans passer par le contexte.
            # en mode mock on remplace le point d'interrogation par un underscore plus filesystem friendly
            # if ($.it.context.ajaxMock) {
            #     service = service.replace(/\?/gi, "_")
            # }

            return host + service

        ###*
        Returns <networkName>'s' host.
        @param {String} networkName name of the network to use
        ###
        getHost: ( networkName ) ->
            return if not networkName
            return @networks?[networkName]?.host

        ###*
        Returns <networkName>'s network object.
        @param {String} networkName name of the network to use
        ###
        getNetwork: ( networkName ) ->
            return if not networkName
            return @networks?[networkName]

        ###*
        To add new configurations.
        @param {Object} settings.
        ###
        tune: ( settings ) ->
            super settings
            @services = @settings.services
            @networks = @settings.networks
            @findDefaultNetwork()

        ###*
        Search and return default network.
        You can have only one default network of course.
        If several, the first one is used.
        ###
        findDefaultNetwork: () ->
            # en mode mock, le réseau par défaut, c'est le mock
            # if ($.it.context.ajaxMock) {
            #     nwk = @getNetwork("mock")
            #     if (nwk) {
            #         @settings.defaultNetwork = nwk
            #         return nwk
            #     }
            # }
            # sinon on regarde si un réseau possède le flag "default"
            for name, nwk of @networks
                if nwk[ "default" ]
                    @defaultNetwork = nwk
                    return nwk

        ###*
        Returns raw data used as settings.
        ###
        raw: () ->
            Utils = require "nu.Utils"
            return Utils.clone @settings

        # Active le moke local
        # pratique pour tester sans connexion
        # @TODO intégrer en mode webapp (impliquerait d'utiliser la notion de cache local (mode offline) apparu avec HTML5)
        # launch an "ajaxmockon" event on document
        # enableAjaxMock: () ->
        #     # backup des urls
        #     @urlsBackup = $.it.urls.raw()
        #     # pour autoriser les urls de type file:
        #     $.it.ajax.settings.enableFileUrl = true
        #     # flag pour savoir qu'on est en mode mock
        #     $.it.context.ajaxMock = true
        #     # création d'un "network" spécial pour ne plus pointer sur un serveur distant mais sur notre répertoire local de mock
        #     $.it.urls.extend({
        #         network: {
        #             "mock": {
        #                 "host": "mock/"
        #             }
        #         }
        #     })
        #     $(document).trigger($.Event("ajaxmockon"))
        # },


        # désactive le moke local
        # launch an "ajaxmockoff" event on document
        # disableAjaxMock: () ->
        #     $.it.ajax.settings.enableFileUrl = false
        #     $.it.context.ajaxMock = false
        #     # restauration de l'hôte
        #     $.it.urls.extend(@urlsBackup)
        #     # le backup n'est plus nécessaire
        #     delete @urlsBackup
        #     $(document).trigger($.Event("ajaxmockoff"))
        # },

        # isAjaxMockEnabled: () ->
        #     return $.it.context.ajaxMock
        # }



    module.exports = UriManager

