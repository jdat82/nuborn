( function ( $, nu, Log, SettingsManager, undefined ) {

    'use strict';

    /**
     * @class app.widgets.Menu
     * @extends nu.widgets.Menu
     *
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

        goToHome: function () {
            app.menu.toggleMenu();
            !app.home.isVisible() && navigate( this.html.menu, app.home );
        },

        goToProfile: function () {
            Log.w( "not implemented yet" );
        },

        goToSettings: function () {
            app.menu.toggleMenu();
            !app.settings.isVisible() && navigate( this.html.menu, app.settings );
        },

        goToHelp: function () {
            app.menu.toggleMenu();
            !app.help.isVisible() && navigate( this.html.menu, app.help );
        },

        goToLegalNotices: function () {
            app.menu.toggleMenu();
            !app.legalNotices.isVisible() && navigate( this.html.menu, app.legalNotices );
        },

    } );

    function navigate( menu, pageHandler ) {
        if ( SettingsManager.animationFriendly() ) {
            menu.one( 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd', function () {
                pageHandler.navigate();
            } );
        }
        else {
            pageHandler.navigate();
        }
    }

} )( jQuery, nu, nu.debug.Log, app.manager.SettingsManager );