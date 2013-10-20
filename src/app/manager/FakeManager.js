( function ( window, $, app ) {

    'use strict';

    /**
     * @class app.manager.FakeManager
     * @singleton
     *
     * Fake Manager for demonstration purposes.
     *
     * @provide app.manager.FakeManager
     *
     * @require app.manager
     */
    app.manager.FakeManager = {

        init: function ( ) {
            var dfd = $.Deferred( );

            window.setTimeout( function ( ) {
                dfd.resolve( );
            }, 3000 );

            return dfd.promise( );
        }

    };

} )( this, jQuery, app );