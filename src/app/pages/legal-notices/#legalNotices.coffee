define "#legalNotices", ( require, exports, module ) ->

    LegalNoticesPageHandler = require "app.pages.LegalNoticesPageHandler"

    ###
    @property {app.pages.LegalNoticesPageHandler}
    Instance of a page handler for the legal notices page.
    ###
    module.exports = new LegalNoticesPageHandler()
