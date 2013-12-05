define( "nu.widgets.Menu", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;
    var Utils = require( "nu.Utils" );
    var Base = require( "nu.core.Base" );

    /**
     * @class nu.widgets.Menu
     * Default behavior of a menu.
     */
    var Menu = Base.subClass( {

        /**
         * @constructor
         * @param  {Object} settings
         */
        init: function ( settings ) {

            // Initializing defaults & settings
            this._super( {
                id: "menu",
                templateId: "menu"
            }, settings );

            var templateId = this.settings().templateId;

            // Inflates the menu
            this.html.menu = $( templates[ templateId ].render( this.settings ) );
            $( "body" ).append( this.html.menu );

            // Storing menu state
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