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

        },
        services: {

        }
    } );

} )( nu, app );