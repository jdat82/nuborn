( function ( window, $, app ) {

    'use strict';

    /**
     * Fake Manager for demonstration purposes.
     * @Class app.manager.FakeManager
     * @Singleton
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