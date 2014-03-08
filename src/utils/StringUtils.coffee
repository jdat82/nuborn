define "utils.StringUtils", ( require, exports, module ) ->

    'use strict'

    $ = jQuery

    ###*
    @class utils.StringUtils
    @singleton
    String related utilities method.
    ###
    class StringUtils

        ###*
        Replace placeholders of form {x} in a string where x is a number >= 0.
        If no placeholders, return the string as is.
        @param {String} string
        @param {Array} params Array of values (converted as string)
        ###
        @replaceWith = ( string, params ) ->
            if not params then return string
            if not (params instanceof Array ) then params = [ params ]

            regex = /\{[0-9]\}/g
            for param in params
                m = regex.exec( string )
                if not m?
                    return string
                else
                    for match in m
                        string = string.replace match, param || ""

            return string

        ###*
        Generate a random GUID.
        ###
        @guid = () ->
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, ( c ) ->
                r = Math.random() * 16 | 0
                if c == 'x' then v = r else v = ( r & 0x3 | 0x8 )
                return v.toString 16


    module.exports = StringUtils