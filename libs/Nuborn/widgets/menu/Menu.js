/*
 * @provide nu.widgets.Menu
 * @require nu.Utils
 */
define( "nu.widgets.Menu", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;
    var Utils = require( "nu.Utils" );

    /**
     * @class nu.widgets.Menu
     * Default behavior of a menu.
     */
    var Menu = Object.subClass( {

        /**
         * @constructor
         * @param  {Object} settings
         */
        init: function ( settings ) {
            // default settings
            this.settings = settings ||  {};
            this.settings.id = this.settings.id || "menu";
            var templateId = this.settings.templateId || this.settings.id;
            this.html = {};
            this.data = {};

            // inflates the menu
            this.html.menu = $( templates[ templateId ].render( this.settings ) );
            $( "body" ).append( this.html.menu );
            this.data.isMenuShown = false;
        },

        toggleMenu: function () {
            this.data.isMenuShown ? this.hide() : this.show();
            this.data.isMenuShown = !this.data.isMenuShown;
        },

        /**
         * Shows the menu.
         */
        show: function () {
            // deactivating scroll capacity during splashscreen
            Utils.disableScroll();
            this.html.menu.addClass( "menu-show" );
        },

        /**
         * Hides the menu.
         */
        hide: function () {
            // reactivating scroll capacity
            Utils.enableScroll();
            this.html.menu.removeClass( "menu-show" );
        }

    } );

    module.exports = Menu;
} );