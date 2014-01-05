define "test", (require, exports, module) ->

    A = require "A"
    a = new A
        id: "a"

    B = require "B"
    b = new B
        id: "b"

    C = require "C"
    c = new C
        id: "c"

    log = require "#log"

    log.i "id de a: #{a.settings.id}"
    log.i "id de b: #{b.settings.id}"
    log.i "id de c: #{c.settings.id}"

    log.i "id de a: #{a.settings.id}"
    log.i "id de b: #{b.settings.id}"
    log.i "id de c: #{c.settings.id}"

