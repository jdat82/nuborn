define( "app.core.uris", function ( require, exports, module ) {

    'use strict';

    var UriManager = require( "nu.core.UriManager" );

    /**
     * Declaration of all urls used in the application.
     *
     * @property {nu.core.UriManager} uris
     * @member app
     */
    module.exports = new UriManager( {
        networks: {
            "backend": {
                "host": NETWORK,
                "default": true
            },
            "mock": {
                "host": "mock/"
            },
            current: {
                host: getCurrentHost()
            }
        },
        services: {

        }
    } );

    function getCurrentHost() {
        return location.protocol + "//" + location.host;
    }

} );