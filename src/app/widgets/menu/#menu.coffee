define "#menu", ( require, exports, module ) ->

    Menu = require "app.widgets.Menu"

    ###*
    @property {app.widgets.Menu}
    Global menu.
    ###
    module.exports = new Menu
        id: "menu"
