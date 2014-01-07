define "#detail", ( require, exports, module ) ->

    DetailPageHandler = require "app.pages.DetailPageHandler"

    ###
    Instance of a page handler for the detail page.
    ###
    module.exports = new DetailPageHandler()
