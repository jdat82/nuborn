define "#offline", ( require, exports, module ) ->

    OfflinePageHandler = require "pages.OfflinePageHandler"

    ###
    @property {pages.OfflinePageHandler}
    Instance of a page handler for the offline page.
    ###
    module.exports = new OfflinePageHandler()
