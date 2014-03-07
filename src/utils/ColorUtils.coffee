define "utils.ColorUtils", ( require, exports, module ) ->

    'use strict'

    $ = jQuery

    ###*
    @class utils.ColorUtils
    @singleton
    Color related utilities method.
    ###
    class ColorUtils

        ###*
        Generate a random color as HEX format.
        ###
        @randomHexColor = () ->
            return '#' + Math.floor( Math.random() * 16777215 ).toString( 16 )

        @randomRgbaColor = ( opacity, hex ) ->
            hex = hex || @randomHexColor().replace( '#', '' )
            r = parseInt( hex.substring( 0, 2 ), 16 )
            g = parseInt( hex.substring( 2, 4 ), 16 )
            b = parseInt( hex.substring( 4, 6 ), 16 )

            return "rgba(#{r},#{g},#{b},#{opacity})"

        @randomHexColorWithLuminance = ( lum, hex ) ->
            hex = hex || @randomHexColor()

            # Validate hex string
            hex = String( hex ).replace( /[^0-9a-f]/gi, '' )
            if hex.length < 6
                hex = hex[ 0 ] + hex[ 0 ] + hex[ 1 ] + hex[ 1 ] + hex[ 2 ] + hex[ 2 ]
            lum = lum || 0

            # Convert to decimal and change luminosity
            rgb = "#"
            for i in [0,1,2]
                c = parseInt( hex.substr( i* 2, 2 ), 16 )
                c = Math.round( Math.min( Math.max( 0, c + ( c * lum ) ), 255 ) ).toString( 16 )
                rgb += ( "00" + c ).substr( c.length )

            return rgb

        @randomRgbColor = () ->
            hex = @randomHexColor()
            return @hex2rgb hex

        @hex2rgb = ( hex ) ->
            # Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
            hex = hex.replace shorthandRegex, ( m, r, g, b ) ->
                return r + r + g + g + b + b;

            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex )
            if result
                return {
                    r: parseInt( result[ 1 ], 16 ),
                    g: parseInt( result[ 2 ], 16 ),
                    b: parseInt( result[ 3 ], 16 )
                }
            else
                return null

    module.exports = ColorUtils