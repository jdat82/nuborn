define "#help", ( require, exports, module ) ->

    HelpPageHandler = require "app.pages.HelpPageHandler"

    ###
    @property {app.pages.HelpPageHandler}
    Instance of a page handler for the help page.
    ###
    module.exports = new HelpPageHandler()
