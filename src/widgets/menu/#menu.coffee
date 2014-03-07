###
Shared instance of the menu
###
define "#menu", ( require, exports, module ) ->

    Menu = require "widgets.Menu"

    ###*
    @property {widgets.Menu}
    Global me
    ###
    module.exports = new Menu
        id: "menu"
