define "A", (require, exports, module) ->

    Base = require "nu.core.Base"
    class A extends Base

        constructor: (settings) ->
            super null, settings

    module.exports = A