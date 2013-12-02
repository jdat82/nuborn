( function ( nu, app, undefined ) {

    'use strict';

    /**
     * Declaration of all urls used in the application.
     *
     * @property {nu.core.UriManager} uris
     * @member app
     *
     * @provide app.core.uris
     *
     * @require nu.core.UriManager
     * @require app.core
     */
    app.core.uris = new nu.core.UriManager( {
        networks: {
            "backend": {
                "host": NETWORK,
                "default": true
            },
            "mock": {
                "host": "mock/"
            },
            current: {
                host: getCurrentHost( )
            }
        },
        services: {

        }
    } );

    function getCurrentHost( ) {
        return location.protocol + "//" + location.host;
    }

} )( nu, app );