define( "#menu", function ( require, exports, module ) {
    var Menu = require( "app.widgets.Menu" );
    /**
     * @property {app.widgets.Menu}
     * Global menu.
     */
    module.exports = new Menu( {
        id: "menu"
    } );
} );