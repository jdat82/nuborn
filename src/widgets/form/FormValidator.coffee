define "widgets.FormValidator", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Base = require "common.Base"

    ###
    @class widgets.FormValidator
    @extends common.Base
    Validate an input field based on its data attributes.
    ###
    class FormValidator extends Base

        @OK: 0
        @ERROR: -1

        @INVALID_FORMAT: 1
        @MANDATORY: 2
        @TOO_LONG: 3
        @TOO_SHORT: 4

        ###
        @constructor
        ###
        constructor: (form) ->
            @root = form or document
            @els = {}
            @messages = {}

        ###
        Validate a form element.
        ###
        validate: (el) ->
            # el should exists
            return FormValidator.ERROR if not el

            # Input value
            value = el.value

            # Required check
            required = el.dataset.required
            return FormValidator.MANDATORY if required and not value

            # Min value check
            min = el.dataset.min
            return FormValidator.TOO_SHORT if min and value?.length < min

            # Max value check
            max = el.dataset.max
            return FormValidator.TOO_LONG if max and value?.length > max

            # Pattern check
            pattern = el.dataset.pattern
            if pattern
                pattern = new RegExp pattern
                valid = pattern.test value
                if valid then return FormValidator.OK else return FormValidator.INVALID_FORMAT

            return FormValidator.OK

        ###
        Validate a form element and update the message element.
        ###
        validateAndNotify: (el) ->
            status = @validate el
            if status isnt FormValidator.OK
                log.d "Invalid field '#{el.id}' ; status: #{status}" if DEBUG
                el.classList.add "invalid"
                switch status
                    when FormValidator.INVALID_FORMAT
                        @message el, el.dataset.invalidFormatMessage or "Format invalide"
                    when FormValidator.MANDATORY
                        @message el, el.dataset.mandatoryMessage or "Obligatoire"
                    when FormValidator.TOO_LONG
                        @message el, el.dataset.tooLongMessage or "Max. #{el.dataset.max} caractères"
                    when FormValidator.TOO_SHORT
                        @message el, el.dataset.tooShortMessage or "Min. #{el.dataset.min} caractères"
                    when FormValidator.ERROR
                        @message el, el.dataset.errorMessage or "Invalide"
            return status

        ###
        Update the message element content.
        ###
        message: (el, content) ->
            return if not el
            message = @getMessage el
            return if not message
            message.innerHTML = content

        getElement: (message) ->
            return if not message.id
            return @messages[message.id]

        getMessage: (el) ->
            return if not el.id or not el.dataset.messageIn
            # Association between a form element and a message for later usage (cache)
            if  not @els[el.id]
                message = @root.querySelector el.dataset.messageIn
                @els[el.id] = message
                if message.id
                    @messages[message.id] = el
                return message
            else
                return @els[el.id]


    module.exports = FormValidator

