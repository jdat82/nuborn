define( "app.widgets.Menu", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;
    var Log = require( "nu.debug.Log" );
    var BaseMenu = require( "nu.widgets.Menu" );

    /**
     * @class app.widgets.Menu
     * @extends nu.widgets.Menu
     *
     * Nuborn general menu.
     */
    var Menu = BaseMenu.subClass( {

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
            var homePage = require( "#home" );
            this.toggleMenu();
            !homePage.isVisible() && navigate( this.html.menu, homePage );
        },

        goToProfile: function () {
            Log.w( "not implemented yet" );
        },

        goToSettings: function () {
            var settingsPage = require( "#settings" );
            this.toggleMenu();
            !settingsPage.isVisible() && navigate( this.html.menu, settingsPage );
        },

        goToHelp: function () {
            var helpPage = require( "#help" );
            this.toggleMenu();
            !helpPage.isVisible() && navigate( this.html.menu, helpPage );
        },

        goToLegalNotices: function () {
            var legalNoticesPage = require( "#legalNotices" );
            this.toggleMenu();
            !legalNoticesPage.isVisible() && navigate( this.html.menu, legalNoticesPage );
        }

    } );

    function navigate( menu, pageHandler ) {
        var SettingsManager = require( "app.manager.SettingsManager" );
        if ( SettingsManager.animationFriendly() ) {
            menu.one( 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd', function () {
                pageHandler.navigate();
            } );
        }
        else {
            pageHandler.navigate();
        }
    }

    module.exports = Menu;

} );