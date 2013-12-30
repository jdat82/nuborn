define( "app.pages.SettingsPageHandler", function ( require, exports, module ) {

	'use strict';

	var $ = jQuery;
	var log = require( "#log" );
	var SettingsManager = require( "app.manager.SettingsManager" );
	var NubornPageHandler = require( "app.pages.NubornPageHandler" );

	/**
	 * @class app.pages.SettingsPageHandler
	 * @extends app.pages.NubornPageHandler
	 *
	 * The Page Handler of the settings page.
	 */
	var SettingsPageHandler = NubornPageHandler.subClass( {

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function () {
			this._super( {
				id: "settings"
			} );
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		createHtmlElements: function () {
			var page = this.html.page;
			this.html.menuButton = page.find( "div.menu-button" );
			this.html.animateCheckbox = page.find( "#animate" );
			this.html.logsCheckbox = page.find( "#logs" );
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
			this.handleAnimateCheckbox();
			this.handleLogsCheckbox();
		},

		/**
		 * (De)Activate animations in all application.
		 */
		handleAnimateCheckbox: function () {
			// handling change event
			this.html.animateCheckbox.change( function () {
				SettingsManager.toggleAnimationFriendly();
			} );
			// initializing default state
			this.html.animateCheckbox.prop( "checked", SettingsManager.animationFriendly() );
		},

		/**
		 * (De)Activate logs recording in local storage for debugging purposes.
		 */
		handleLogsCheckbox: function () {
			// handling change event
			this.html.logsCheckbox.change( function () {
				SettingsManager.toggleLogsRecording();
			} );
			// initializing default state
			this.html.logsCheckbox.prop( "checked", SettingsManager.logsRecording() );
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
		},

		swipeRight: function ( event ) {
			swipeCheckbox( event, this.html.animateCheckbox, true );
			swipeCheckbox( event, this.html.logsCheckbox, true );
		},

		swipeLeft: function ( event ) {
			swipeCheckbox( event, this.html.animateCheckbox, false );
			swipeCheckbox( event, this.html.logsCheckbox, false );
		}
	} );

	function swipeCheckbox( event, checkbox, check ) {
		if ( event.target.id === checkbox.attr( "id" ) ) {
			checkbox.prop( "checked", check );
			checkbox.change();
		}
	}

	module.exports = SettingsPageHandler;

} );