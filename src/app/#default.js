/**
 * @provide #default
 * @require app.pages.DefaultPageHandler
 */
define( "#default", function ( require, exports, module ) {

    var DefaultPageHandler = require( "app.pages.DefaultPageHandler" );
    /*
     * Instance of a page handler for the default page.
     */
    module.exports = new DefaultPageHandler();
} );