/**
 * @provide #settings
 * @require app.pages.SettingsPageHandler
 */
define( "#settings", function ( require, exports, module ) {

    var SettingsPageHandler = require( "app.pages.SettingsPageHandler" );
    /*
     * Instance of a page handler for the settings page.
     */
    module.exports = new SettingsPageHandler();
} );