( function ( $, nu, app, templates, log, undefined ) {

	'use strict';

	/**
	 * @class app.pages.DetailPageHandler
	 * @extends app.pages.NubornPageHandler
	 *
	 * The Page Handler of the detail page
	 *
	 * {@link app#detail app.detail is an instance of this page handler}
	 *
	 * @provide app.pages.DetailPageHandler
	 *
	 * @require app.pages.NubornPageHandler
	 */
	app.pages.DetailPageHandler = app.pages.NubornPageHandler.subClass( {

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function () {
			this._super( {
				id: "detail",
			} );
		},


		createHtmlElements: function () {
			// getting a local reference of the back button
			this.html.backButton = this.html.page.find( ".back-button" );
		},


		/**
		 * @override
		 * @inheritdoc
		 */
		pageBeforeShow: function ( event, data ) {
			this._super( event, data );
			this.prepareBackButton();
		},


		prepareBackButton: function () {
			// when touch start, go to active state
			nu.widgets.button.Utils.enableUniversalPressMode( this.html.backButton );

			// when tap on back button, go back home
			this.html.backButton.on( "tap", this.goBackToHomePage );
		},


		goBackToHomePage: function () {
			app.home.navigate( {
				jqmOptions: {
					reverse: true
				}
			} );
			// prevent bubbling
			return false;
		},


		pageBeforeHide: function ( event, data ) {
			this._super( event, data );
			this.html.backButton.off( "tap", this.goBackToHomePage );
			nu.widgets.button.Utils.disableUniversalPressMode( this.html.backButton );
		},


		swipeRight: function ( event ) {
			this._super( event );
			this.goBackToHomePage();
		}
	} );

	/**
	 * @property {app.pages.DetailPageHandler} detail
	 * @member app
	 * Instance of a page handler for the detail page.
	 */
	app.detail = new app.pages.DetailPageHandler();

} )( jQuery, nu, app, templates, nu.debug.Log );