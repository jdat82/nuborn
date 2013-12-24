define( "nu.widgets.Menu", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;
    var Utils = require( "nu.Utils" );
    var Class = require( "nu.core.Class" );

    var defaults = {
        id: "menu",
        templateId: "menu"
    };

    /**
     * @class nu.widgets.Menu
     * @extends nu.core.Class
     * Default behavior of a menu.
     */
    var Menu = Class.subClass( {

        /**
         * @constructor
         * @param  {Object} settings
         * Defaults: {
         * - id: widget id in DOM
         * - templateId: template identifier
         * }
         */
        init: function ( settings ) {

            // Initializing defaults & settings
            this._super( defaults, settings );

            var templateId = this.settings.templateId;

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