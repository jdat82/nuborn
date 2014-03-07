###
Shared instance of the widget.
###
define "#inAppWebView", ( require, exports, module ) ->

    'use strict'

    InAppWebView = require "widgets.InAppWebView"
    module.exports = new InAppWebView()
