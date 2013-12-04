/*
 * @provide app.manager.FakeManager
 */
define( "app.manager.FakeManager", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;

    /**
     * @class app.manager.FakeManager
     * @singleton
     * Fake Manager for demonstration purposes.
     */
    module.exports = {

        init: function () {
            var dfd = $.Deferred();

            window.setTimeout( function () {
                dfd.resolve();
            }, 3000 );

            return dfd.promise();
        }

    };

} );