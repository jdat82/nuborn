/*
 * @provide app.pages.DetailPageHandler
 * @require app.pages.NubornPageHandler
 * @require nu.debug.Log
 * @require nu.widgets.button.Utils
 */
define( "app.pages.DetailPageHandler", function ( require, exports, module ) {

	'use strict';
	var $ = jQuery;
	var Log = require( "nu.debug.Log" );
	var ButtonUtils = require( "nu.widgets.button.Utils" );
	var NubornPageHandler = require( "app.pages.NubornPageHandler" );

	/**
	 * @class app.pages.DetailPageHandler
	 * @extends app.pages.NubornPageHandler
	 *
	 * The Page Handler of the detail page
	 */
	var DetailPageHandler = NubornPageHandler.subClass( {

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
			ButtonUtils.enableUniversalPressMode( this.html.backButton );

			// when tap on back button, go back home
			this.html.backButton.on( "tap", this.goBackToHomePage );
		},


		goBackToHomePage: function () {
			var homePage = require( "#home" );
			homePage.navigate( {
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
			ButtonUtils.disableUniversalPressMode( this.html.backButton );
		},


		swipeRight: function ( event ) {
			this._super( event );
			this.goBackToHomePage();
		}
	} );

	module.exports = DetailPageHandler;

} );