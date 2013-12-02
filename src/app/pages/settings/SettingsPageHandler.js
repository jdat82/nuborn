( function ( $, nu, app, Utils, Log, templates, SettingsManager, undefined ) {

	'use strict';

	/**
	 * @class app.pages.SettingsPageHandler
	 * @extends app.pages.NubornPageHandler
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
			this.html.animateCheckbox = page.find( "#animate" );
			this.html.logsCheckbox = page.find( "#logs" );
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
		handleMenuButton: function ( ) {
			// when tap on menu button, open menu panel
			this.html.menuButton.on( "tap", function ( ) {
				// opening menu panel
				app.menu.toggleMenu( );
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

	/**
	 * @property {app.pages.SettingsPageHandler} settings
	 * @member app
	 * Instance of a page handler for the settings page.
	 */
	app.settings = new app.pages.SettingsPageHandler( );

} )( jQuery, nu, app, nu.Utils, nu.debug.Log, templates, app.manager.SettingsManager )