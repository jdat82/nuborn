define "utils.BrowserUtils", ( require, exports, module ) ->

    'use strict'

    $ = jQuery

    ###*
    @class utils.BrowserUtils
    @singleton
    Browser related utilities method.
    ###
    class BrowserUtils

        ###*
        Checks if the application is running with PhoneGap (Cordova)
        @return {Boolean} [description]
        ###
        @isCordova = () ->
            return window.cordova

        ###*
        Checks if the device platform is Android.
        @return {Boolean}
        ###
        @isAndroid = () ->
            if @isCordova() and device?.platform
                return device.platform is "Android"
            else
                return navigator.userAgent.match("Android") isnt null

        ###*
        Checks if the device platform is iOS.
        @return {Boolean}
        ###
        @isIOS = () ->
            if @isCordova() and device?.platform
                return device.platform is "iOS"
            else
                return navigator.userAgent.match( /(iPhone|iPod|iPad)/i ) isnt null

        ###*
        Checks if the device platform is older than Android 4.
        @return {Boolean}
        ###
        @isOldAndroid = () ->
            return false if not @isAndroid()
            return @getOSVersion() < 4

        ###*
        Checks if the device platform is older than iOS 6.
        @return {Boolean}
        ###
        @isOldIOS = () ->
            return false if not @isIOS()
            return @getOSVersion() < 6

        ###*
        Gets the OS version. <br/>
        Supports Phonegap - web (iOS, Android). <br/>
        Needs more support.
        @return {Boolean}
        ###
        @getOSVersion = () ->
            # If the app is running on PhoneGap, ask for the device version
            # if @isCordova()
            #   return parseFloat device.version, 10
            # If it is a web app, ask the navigator user agent
            # else
            # Getting the user agent into a local variable
            agent = navigator.userAgent
            # iOS case
            if @isIOS()
                version = "?"
                regexp = /iPhone OS ([\d_]{1,3})/g
                match = regexp.exec agent
                if match?
                    version = match[1]
                    version = version.replace "_", "."
                return version
            # Android case
            else if @isAndroid()
                version = "?"
                regexp = /Android ([\d.]{1,3})/g
                match = regexp.exec agent
                if match?
                    version = match[ 1 ]
                return version
            else
                return NaN

        ###*
        Simple utility method to add a class to the HTML tag which reflect the current browser/version.
        Of course, you should always use feature detection but there is time when you need to come back to an old
        user-agent snif. To use with great caution.
        Handle only iOS and Android like everything else in Nuborn.
        ###
        @decorateDOMWithBrowserClass = () ->
            if @isIOS()
                browser = "ios"
            else if @isAndroid()
                browser = "android"
            else
                browser = "other"
            version = @getOSVersion()
            document.getElementsByTagName( "html" )[ 0 ].classList.add "#{browser}-#{version}"

    module.exports = BrowserUtils