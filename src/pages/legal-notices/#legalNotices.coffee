define "#legalNotices", ( require, exports, module ) ->

    LegalNoticesPageHandler = require "pages.LegalNoticesPageHandler"

    ###
    @property {pages.LegalNoticesPageHandler}
    Instance of a page handler for the legal notices page.
    ###
    module.exports = new LegalNoticesPageHandler()
