describe "common.Context", ->

    'use strict'

    log = require "#log"
    Utils = require "utils.Utils"
    context = require "#context"
    localStorage = require "#localStorage"
    expect = chai.expect

    beforeEach ->
        context.clear()

    it "should save foo in context and local storage", ->

        # Save
        context.set "foo", "foo", true
        foo = context.get "foo"
        expect(foo).to.be.a "string"
        expect(foo).to.equal "foo"
        foo =  localStorage.get "context.foo"
        expect(foo).to.be.a "string"
        expect(foo).to.equal "foo"

    it "should save foo in context only", ->

        # Save
        context.set "foo", "foo", false
        foo = context.get "foo"
        expect(foo).to.be.a "string"
        expect(foo).to.equal "foo"
        foo =  localStorage.get "context.foo"
        expect(foo).to.be.null


