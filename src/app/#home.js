/**
 * @provide #home
 * @require app.pages.HomePageHandler
 */
define( "#home", function ( require, exports, module ) {

    var HomePageHandler = require( "app.pages.HomePageHandler" );
    /*
     * Instance of a page handler for the home page.
     */
    module.exports = new HomePageHandler();
} );