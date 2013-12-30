define( "nu.core.UriManager", function ( require, exports, module ) {

    'use strict';

    function initNetworksAndServices( instance, settings ) {
        var defaults = {
            networks: {},
            services: {}
        };
        settings = $.extend( true, defaults, settings );
        instance.networks = settings.networks;
        instance.services = settings.services;
    }

    var $ = jQuery;
    var log = require( "#log" );

    /**
     * @class nu.core.UriManager
     *
     * Manage all URI in the entire application.
     * Functionnalities :
     * - Allows to declare several hosts which can be used singularly per service
     * - Allows to declare a default network which will be used when no one is specified on a service
     * - Allows to declare service urls network independent
     * - Allows to handle several configurations on the same application like local services, remote services and mock services.
     */
    var UriManager = Object.subClass( {

        /**
         * Initialize network and services properties.
         *
         * @param {Object} settings
         */
        init: function ( settings ) {
            this.extend( settings );
        },

        /**
         * Return a service url built by concatenating the right host and the service path.
         * Fill with parameters if provided.
         * @param {String} id Service path key
         * @param {Object} params Parameters to use when replacing placeholders
         */
        get: function ( id, params ) {

            if ( !id )
                return;

            if ( !this.services && !this.services[ id ] )
                return;

            var host = "";
            var value = this.services[ id ];

            // When specifying a service path, you can use the shortand notation with a simple string
            // or an object with a url and network properties.
            var path = "";
            if ( value instanceof Object ) {
                if ( value && value.path ) {
                    if ( value.network ) {
                        host = this.getHost( value.network );
                    }
                    path = value.path;
                }
            }
            else {
                path = value;
            }

            // if no explicit host, using the default one
            if ( host === "" && this.defaultNetwork && this.defaultNetwork.host ) {
                host = this.defaultNetwork.host;
            }

            var service = nu.Utils.replaceWith( path, params );

            // Revoir la gestion du mock pour fonctionner par url sans passer par le contexte.
            // en mode mock on remplace le point d'interrogation par un underscore plus filesystem friendly
            // if ($.it.context.ajaxMock) {
            //     service = service.replace(/\?/gi, "_");
            // }

            return host + service;
        },

        /**
         * Returns <networkName>'s' host.
         * @param {String} networkName name of the network to use
         */
        getHost: function ( networkName ) {
            if ( networkName && this.networks && this.networks[ networkName ] ) {
                return this.networks[ networkName ].host;
            }
        },

        /**
         * Returns <networkName>'s network object.
         * @param {String} networkName name of the network to use
         */
        getNetwork: function ( networkName ) {
            if ( networkName && this.networks && this.networks[ networkName ] ) {
                return this.networks[ networkName ];
            }
        },


        /**
         * To add new configurations.
         * @param {Object} settings.
         */
        extend: function ( settings ) {
            if ( !settings )
                return;
            initNetworksAndServices( this, settings );
            this.findDefaultNetwork();
        },


        /**
         * Search and return default network.
         * You can have only one default network of course.
         * If several, the first one is used.
         */
        findDefaultNetwork: function () {
            var nwk;
            // en mode mock, le réseau par défaut, c'est le mock
            // if ($.it.context.ajaxMock) {
            //     nwk = this.getNetwork("mock");
            //     if (nwk) {
            //         this.settings.defaultNetwork = nwk;
            //         return nwk;
            //     }
            // }
            // sinon on regarde si un réseau possède le flag "default"
            for ( var name in this.networks ) {
                nwk = this.networks[ name ];
                if ( nwk[ "default" ] ) {
                    this.defaultNetwork = nwk;
                    return nwk;
                }
            }
        },


        /**
         * Returns raw data used as settings.
         */
        raw: function () {
            return nu.Utils.clone( this.settings );
        },


        // active le moke local
        // pratique pour tester sans connexion
        // @TODO intégrer en mode webapp (impliquerait d'utiliser la notion de cache local (mode offline) apparu avec HTML5)
        // launch an "ajaxmockon" event on document
        // enableAjaxMock: function () {
        //     // backup des urls
        //     this.urlsBackup = $.it.urls.raw();
        //     // pour autoriser les urls de type file:
        //     $.it.ajax.settings.enableFileUrl = true;
        //     // flag pour savoir qu'on est en mode mock
        //     $.it.context.ajaxMock = true;
        //     // création d'un "network" spécial pour ne plus pointer sur un serveur distant mais sur notre répertoire local de mock
        //     $.it.urls.extend({
        //         network: {
        //             "mock": {
        //                 "host": "mock/"
        //             }
        //         }
        //     });
        //     $(document).trigger($.Event("ajaxmockon"));
        // },


        // désactive le moke local
        // launch an "ajaxmockoff" event on document
        // disableAjaxMock: function () {
        //     $.it.ajax.settings.enableFileUrl = false;
        //     $.it.context.ajaxMock = false;
        //     // restauration de l'hôte
        //     $.it.urls.extend(this.urlsBackup);
        //     // le backup n'est plus nécessaire
        //     delete this.urlsBackup;
        //     $(document).trigger($.Event("ajaxmockoff"));
        // },

        // isAjaxMockEnabled: function () {
        //     return $.it.context.ajaxMock;
        // }

    } );

    module.exports = UriManager;

} );