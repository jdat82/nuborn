define "#settings", ( require, exports, module ) ->

    SettingsPageHandler = require "pages.SettingsPageHandler"

    ###
    @property {pages.SettingsPageHandler} settings
    Instance of a page handler for the settings page.
    ###
    module.exports = new SettingsPageHandler()
