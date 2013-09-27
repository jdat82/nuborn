(function (nu, app, undefined) {

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
    app.core.uris = new nu.core.UriManager({
        networks: {
            // back office
            "wifi": {
                "host": "http://jdat-dev.mbp:9000/"
            },
            "usb": {
                "host": "http://mbp:9000/"
            },
            "mock": {
                "host": "mock/"
            }
        },
        services: {
            "load-survey": {
                path: "survey/get?sid={0}",
                network: "usb"
            }
        }
    });

})(nu, app);