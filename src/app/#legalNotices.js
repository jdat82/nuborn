define( "#legalNotices", function ( require, exports, module ) {

    var LegalNoticesPageHandler = require( "app.pages.LegalNoticesPageHandler" );
    /*
     * Instance of a page handler for the legal notices page.
     */
    module.exports = new LegalNoticesPageHandler();
} );