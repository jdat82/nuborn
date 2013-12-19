define( "#default", function ( require, exports, module ) {

    var DefaultPageHandler = require( "app.pages.DefaultPageHandler" );
    /*
     * @property {app.pages.DefaultPageHandler}
     * Instance of a page handler for the default page.
     */
    module.exports = new DefaultPageHandler();
} );