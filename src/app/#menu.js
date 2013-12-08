define( "#menu", function ( require, exports, module ) {
    var Menu = require( "app.widgets.Menu" );
    // global menu
    module.exports = new Menu( {
        id: "menu"
    } );
} );