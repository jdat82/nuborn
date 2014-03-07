define "#profile", ( require, exports, module ) ->

    ProfilePageHandler = require "pages.ProfilePageHandler"

    ###
    @property {pages.ProfilePageHandler}
    Instance of a page handler for the profile page.
    ###
    module.exports = new ProfilePageHandler()
