(function ($, nu, app, utils, log, undefined) {

    'use strict';

    /**
     * @class app.pages.DefaultPageHandler
     * @extends nu.pages.PageHandler
     *
     * The default Page Handler when no other page handler was found.
     *
     * {@link app#default app.default is an instance of this page handler}
     *
     * @provide app.pages.DefaultPageHandler
     *
     * @require app.pages
     */
    app.pages.DefaultPageHandler = nu.pages.PageHandler.subClass({

        init: function () {
            this._super({
                id: "default",
                "default": true
            });
        },

        /**
         * Override default behavior.
         */
        load: function (pageParams) {

            var hash = utils.deserializeHash();

            // If the default page handler is invoke, it means nuborn hasn't found any page handler for the current hash name.
            var ph; // = <find the right page handler>;

            // transferring first page properties to the right page handler
            ph.data.isFirst = this.data.isFirst;
            ph.data.splashscreen = this.data.splashscreen;
            ph.load(pageParams);
        },

        /**
         * Override default behavior.
         */
        navigate: function (options) {
            // app dependant
        }

    });

    /**
     * @property {app.pages.SubmitPageHandler} submit
     * @member app
     * Instance of a page handler for the submit page.
     */
    app["default"] = new app.pages.DefaultPageHandler();

})(jQuery, nu, app, nu.Utils, nu.debug.Log);