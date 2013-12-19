define( "#context", function ( require, exports, module ) {

    var Context = require( "nu.core.Context" );
    var Constants = require( "app.Constants" );
    var Utils = require( "nu.Utils" );

    /**
     * @property {nu.core.Context}
     * Context instance which holds contextual data.
     * @type nu.core.Context
     */
    var context = new Context( {
        localStorageKey: "nuborn.context",
        synchronizeInLocalStorage: true
    } );

    // Creating a user ID
    var userId = context.get( Constants.USER_ID );
    !userId && context.set( Constants.USER_ID, Utils.guid() );

    module.exports = context;
} );