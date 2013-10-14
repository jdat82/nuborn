( function ( $, nu, app, utils, log, templates, undefined ) {

	'use strict';

	/**
	 * @class app.pages.SettingsPageHandler
	 * @extends nu.pages.PageHandler
	 *
	 * The Page Handler of the settings page.
	 *
	 * {@link app#settings app.settings is an instance of this page handler}
	 *
	 * @provide app.pages.SettingsPageHandler
	 *
	 * @require app.pages.NubornPageHandler
	 */
	app.pages.SettingsPageHandler = app.pages.NubornPageHandler.subClass( {

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function ( ) {
			this._super( {
				id: "settings"
			} );
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		createHtmlElements: function ( ) {
			var page = this.html.page;
			this.html.menuButton = page.find( "div.menu-button" );
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		createDataElements: function ( ) {},

		/**
		 * @override
		 * @inheritdoc
		 */
		pageInit: function ( event, data ) {
			this._super( event, data );
			this.handleMenuButton( );
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		pageShow: function ( event, data ) {
			this._super( event, data );
		},

		/**
		 * Handle the menu button.
		 */
		handleMenuButton: function ( ) {
			// getting a local reference of the menu button
			var menuButton = this.html.menuButton;

			// when tap on menu button, open menu panel
			menuButton.on( "tap", function ( ) {
				// opening menu panel
				app.menu.toggleMenu( );
				// prevent bubbling
				return false;
			} );
		}
	} );

	/**
	 * @property {app.pages.SettingsPageHandler} settings
	 * @member app
	 * Instance of a page handler for the settings page.
	 */
	app.settings = new app.pages.SettingsPageHandler( );

} )( jQuery, nu, app, nu.Utils, nu.debug.Log, templates )