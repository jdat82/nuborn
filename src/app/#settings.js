define( "#settings", function ( require, exports, module ) {

    var SettingsPageHandler = require( "app.pages.SettingsPageHandler" );
    /*
     * @property {app.pages.SettingsPageHandler} settings
     * Instance of a page handler for the settings page.
     */
    module.exports = new SettingsPageHandler();
} );