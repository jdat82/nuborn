define "B", (require, exports, module) ->

    A = require "A"
    class B extends A

    module.exports = B