define "#help", ( require, exports, module ) ->

    HelpPageHandler = require "pages.HelpPageHandler"

    ###
    @property {pages.HelpPageHandler}
    Instance of a page handler for the help page.
    ###
    module.exports = new HelpPageHandler()
