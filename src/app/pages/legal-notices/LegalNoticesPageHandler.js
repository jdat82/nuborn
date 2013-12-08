define( "app.pages.LegalNoticesPageHandler", function ( require, exports, module ) {

	'use strict';

	var $ = jQuery;
	var Log = require( "nu.debug.Log" );
	var NubornPageHandler = require( "app.pages.NubornPageHandler" );

	/**
	 * @class app.pages.LegalNoticesPageHandler
	 * @extends app.pages.NubornPageHandler
	 *
	 * The Page Handler of the legalNotices page.
	 */
	var LegalNoticesPageHandler = NubornPageHandler.subClass( {

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function () {
			this._super( {
				id: "legalNotices",
				templateId: "legal-notices"
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
				var menu = require( "#menu" );
				// opening menu panel
				menu.toggleMenu();
				// prevent bubbling
				return false;
			} );
		}
	} );

	module.exports = LegalNoticesPageHandler;

} );