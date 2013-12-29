define( "#offline", function ( require, exports, module ) {

    var OfflinePageHandler = require( "app.pages.OfflinePageHandler" );
    /*
     * @property {app.pages.OfflinePageHandler}
     * Instance of a page handler for the offline page.
     */
    module.exports = new OfflinePageHandler();
} );