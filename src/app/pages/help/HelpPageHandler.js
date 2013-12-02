( function ( $, nu, app, utils, log, templates, undefined ) {

	'use strict';

	/**
	 * @class app.pages.HelpPageHandler
	 * @extends app.pages.NubornPageHandler
	 *
	 * The Page Handler of the help page.
	 *
	 * {@link app#help app.help is an instance of this page handler}
	 *
	 * @provide app.pages.HelpPageHandler
	 *
	 * @require app.pages.NubornPageHandler
	 */
	app.pages.HelpPageHandler = app.pages.NubornPageHandler.subClass( {

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function () {
			this._super( {
				id: "help"
			} );
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		createHtmlElements: function () {
			var page = this.html.page;
			this.html.menuButton = page.find( "div.menu-button" );
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		createDataElements: function () {},

		/**
		 * @override
		 * @inheritdoc
		 */
		pageInit: function ( event ) {
			this._super( event );
			this.handleMenuButton();
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
		handleMenuButton: function () {
			// when tap on menu button, open menu panel
			this.html.menuButton.on( "tap", function () {
				// opening menu panel
				app.menu.toggleMenu();
				// prevent bubbling
				return false;
			} );
		}
	} );

	/**
	 * @property {app.pages.HelpPageHandler} help
	 * @member app
	 * Instance of a page handler for the help page.
	 */
	app.help = new app.pages.HelpPageHandler();

} )( jQuery, nu, app, nu.Utils, nu.debug.Log, templates )