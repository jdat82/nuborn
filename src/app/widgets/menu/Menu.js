( function ( $, nu, log, undefined ) {

    'use strict';

    /**
     * @class app.widgets.Menu
     * Nuborn general menu.
     *
     * @provide app.widgets.Menu
     *
     * @require app.widgets
     * @require nu.widgets.Menu
     */
    app.widgets.Menu = nu.widgets.Menu.subClass( {

        /**
         * @constructor
         * @param  {Object} settings
         */
        init: function ( settings ) {
            this._super( settings );

            // clicking the overlay close the menu
            this.html.menuOverlay = this.html.menu.find( "div.overlay" );
            this.html.menuOverlay.on( "click", $.proxy( this, "toggleMenu" ) );

            // registering actions for click events
            this.html.menu.find( "#home-menu-item" ).on( "click", $.proxy( this, "goToHome" ) );
            this.html.menu.find( "#profile-menu-item" ).on( "click", $.proxy( this, "goToProfile" ) );
            this.html.menu.find( "#settings-menu-item" ).on( "click", $.proxy( this, "goToSettings" ) );
            this.html.menu.find( "#help-menu-item" ).on( "click", $.proxy( this, "goToHelp" ) );
            this.html.menu.find( "#legal-notices-menu-item" ).on( "click", $.proxy( this, "goToLegalNotices" ) );
        },

        goToHome: function ( ) {
            app.menu.toggleMenu( );
            !app.home.isVisible( ) && app.home.navigate( );
        },

        goToProfile: function ( ) {
            log.w( "not implemented yet" );
        },

        goToSettings: function ( ) {
            app.menu.toggleMenu( );
            !app.settings.isVisible( ) && app.settings.navigate( );
        },

        goToHelp: function ( ) {
            log.w( "not implemented yet" );
        },

        goToLegalNotices: function ( ) {
            log.w( "not implemented yet" );
        },

    } );

    // /**
    //  * Gets the shared instance of app.widgets.Menu class.
    //  * @return {app.widgets.Menu} The shared instance of the general menu.
    //  *
    //  * @static
    //  * @method get
    //  */
    // app.widgets.Menu.get = function ( ) {
    //     if ( !app.widgets.Menu.SINGLETON_INSTANCE ) {
    //         app.widgets.Menu.SINGLETON_INSTANCE = new app.widgets.Menu( );
    //     }
    //     return app.widgets.Menu.SINGLETON_INSTANCE;
    // };

} )( jQuery, nu, nu.debug.Log );