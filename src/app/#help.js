define( "#help", function ( require, exports, module ) {

    var HelpPageHandler = require( "app.pages.HelpPageHandler" );
    /*
     * Instance of a page handler for the help page.
     */
    module.exports = new HelpPageHandler();
} );