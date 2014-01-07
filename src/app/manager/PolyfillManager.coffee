define "app.manager.PolyfillManager", ( require, exports, module ) ->

    'use strict'

    $ = jQuery

    ###*
    @class app.manager.PolyfillManager
    @singleton
    Handle everything related to polyfills.
    ###
    class PolyfillManager

        ###*
        Download all mandatory polyfills and notify the caller with a Deferred when done.
        ###
        constructor: () ->
            dfd = $.Deferred()
            setTimeout dfd.resolve, 50
            return dfd.promise()

        ###*
        Add a Modernizr class to the html tag to reflect the test status : overflowtouch and no-overflowtouch.
        ###
        checkTouchOverflowSupport: () ->
            # checking if device is capable of handling overflow: scroll
            # will add also a css class to the body ([no-]overflowtouch)
            # Modernizr.addTest( 'overflowscrolling', testAllProps( 'overflowScrolling', 'touch', true ) )

    PolyfillManager.instance = new PolyfillManager

    module.exports = PolyfillManager
