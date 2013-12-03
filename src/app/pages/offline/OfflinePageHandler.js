/*
 * @provide app.pages.OfflinePageHandler
 * @require app.pages.NubornPageHandler
 */
define( "app.pages.OfflinePageHandler", function ( require, exports, module ) {

	'use strict';

	var NubornPageHandler = require( "app.pages.NubornPageHandler" );

	/**
	 * @class app.pages.OfflinePageHandler
	 * @extends app.pages.NubornPageHandler
	 *
	 * The Page Handler of the offline page
	 */
	var OfflinePageHandler = NubornPageHandler.subClass( {

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function () {
			this._super( {
				id: "offline",
			} );
		},


		createHtmlElements: function () {},


		/**
		 * @override
		 * @inheritdoc
		 */
		pageBeforeShow: function ( event, data ) {
			this._super( event, data );
		},


		pageBeforeHide: function ( event, data ) {
			this._super( event, data );
		},

	} );

	module.exports = OfflinePageHandler;

} );