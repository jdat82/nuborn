define "#home", ( require, exports, module ) ->

    HomePageHandler = require "pages.HomePageHandler"

    ###
    @property {pages.HomePageHandler}
    Instance of a page handler for the home page.
    ###
    module.exports = new HomePageHandler()
