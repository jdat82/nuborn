// Load grunt API
grunt = require( "grunt" );

/**
 * The jQuery Extend method so as to easily extend configurations
 */
var extend = function () {

    grunt.verbose.debug( "Extend arguments: " + JSON.stringify( arguments, null, "    " ) );

    var src, copyIsArray, copy, name, options, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[ 1 ] || {};
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && typeof target !== 'function' ) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( length === i ) {
        target = this;
        --i;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( ( copyIsArray = Array.isArray( copy ) ) || ( typeof copy === 'object' ) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && Array.isArray( src ) ? src : [];

                    }
                    else {
                        clone = src && ( !Array.isArray( src ) && typeof src === 'object' ) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = extend( deep, clone, copy );

                    // Don't bring in undefined values
                }
                else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    grunt.verbose.debug( "Extend result: " + JSON.stringify( target, null, "    " ) );

    // Return the modified object
    return target;
};

module.exports = extend;