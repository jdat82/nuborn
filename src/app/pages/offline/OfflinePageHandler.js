( function ( $, nu, app, templates, log, undefined ) {

	'use strict';

	/**
	 * @class app.pages.OfflinePageHandler
	 * @extends app.pages.NubornPageHandler
	 *
	 * The Page Handler of the offline page
	 *
	 * {@link app#offline app.offline is an instance of this page handler}
	 *
	 * @provide app.pages.OfflinePageHandler
	 *
	 * @require app.pages.NubornPageHandler
	 */
	app.pages.OfflinePageHandler = app.pages.NubornPageHandler.subClass( {

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function ( ) {
			this._super( {
				id: "offline",
			} );
		},


		createHtmlElements: function ( ) {},


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

	/**
	 * @property {app.pages.OfflinePageHandler} offline
	 * @member app
	 * Instance of a page handler for the offline page.
	 */
	app.offline = new app.pages.OfflinePageHandler( );

} )( jQuery, nu, app, templates, nu.debug.Log );