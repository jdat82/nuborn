define "nu.pages.PageHandler", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    pageEventsManager = require( "nu.pages.PageEventsManager" ).instance
    Utils = require "nu.Utils"
    log = require "#log"
    Base = require "nu.core.Base"

    ###
    Defaults settings.
    ###
    defaults =
        singleton: false

    ###*
    @class nu.pages.PageHandler
    Handle lifecycle of jQuery Mobile pages.
    Defaults PageHandler instances are prototype which means every time you navigate away
    to another page, it is removed from the DOM.
    As page parameters are set on "pageinit" event, singleton controllers received them
    once only.
    ###
    class PageHandler extends Base

        ###*
        Initialize a fresh new Page Handler.
        @param {Object} settings    The settings of the page handler (ID, URL, ...).
        ###
        constructor: ( settings ) ->
            # Declaring class members
            super defaults, settings

            # default state is hidden
            @data.visible = false

        ###*
        Called for the pagebeforecreate event. <br/>
        Also register page into HTML elements.
        @param  {Object} event
        ###
        pageBeforeCreate: ( event ) ->
            # Registering the page into HTML elements
            page = event.currentTarget
            @html.page = $( page )

            # TODO inserting wordings on current page
            # $.it.wordings.update(page)

            # TODO using right image resolution depending on device
            # $.it.rimages.update(page)

        ###*
        Called for the pageinit event. <br/>
        Populate page parameters by reading url hash part in PageHandler#data#pageParams.
        Also create PageHandler#html and PageHandler#data properties.
        @param  {Object} event
        ###
        pageInit: ( event ) ->
            log.i "page init of #{event.currentTarget.id}" if DEBUG

            # Page parameters are passed in on "pageinit" event
            # so controller in singleton mode will keep their page parameters
            # forever
            if ( @settings.singleton )
                @data.pageParams = Utils.deserializeHash().params

            # Calling #createHtmlElements
            @createHtmlElements()

            # Calling #createDataElements if exists
            @createDataElements()

        ###*
        Called for the pagecreate event.
        @param  {Object} event
        ###
        pageCreate: ( event ) ->
            log.i "page create of '#{event.currentTarget.id}'" if DEBUG

        ###*
        Called for the pagebeforehide event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageBeforeHide: ( event, data ) ->
            log.i "page before hide of '#{event.currentTarget.id}'" if DEBUG

        ###*
        Called for the pagehide event.
        Also clean references to HTML elements & Data Objects in prototype mode,
        i.e. when page is removed each time we go away.
        @param  {Object} event
        @param  {Object} data
        ###
        pageHide: ( event, data ) ->
            log.i "page hide of '#{event.currentTarget.id}'" if DEBUG
            @data.visible = false
            if !@settings.singleton
                # Cleaning references to HTML elements & data objects
                # as they will be recreated every time we go back to the page
                @html.page.remove()
                @deleteHtmlElements()
                @deleteDataElements()

        ###*
        Called for the pagebeforeshow event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageBeforeShow: ( event, data ) ->
            # Controller in prototype mode can receive parameters each time
            # the page is rendered
            if !@settings.singleton
                @data.pageParams = Utils.deserializeHash().params
            log.i "page before show of '#{event.currentTarget.id}'" if DEBUG

        ###*
        Called for the pageshow event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageShow: ( event, data ) ->
            log.i "page show of '#{event.currentTarget.id}'" if DEBUG
            @data.visible = true
            if @data.isFirst
                Utils.hideSplashScreen()
                delete @data.isFirst

        ###*
        Called for the pagebeforechange event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageBeforeChange: ( event, data ) ->
            log.i "page before change of '#{event.currentTarget.id}'" if DEBUG

        ###*
        Called for the pagechange event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageChange: ( event, data ) ->
            log.i "page change of '#{event.currentTarget.id}'" if DEBUG

        ###*
        Called for the pagebeforeload event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageBeforeLoad: ( event, data ) ->
            log.i "page before load of '#{event.currentTarget.id}'" if DEBUG

        ###*
        Called for the pageLoad event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageLoad: ( event, data ) ->
            log.i "page load of '#{event.currentTarget.id}'" if DEBUG

        ###*
        Called for the pageremove event. <br/>
        Also clean references to HTML elements & Data Objects in prototype mode,
        i.e. when page is removed each time we go away.
        @param  {Object} event
        @param  {Object} data
        ###
        pageRemove: ( event, data ) ->
            log.i "page remove of '#{event.currentTarget.id}'" if DEBUG

        ###*
        Called for the swipeleft event. <br/>
        @param  {Object} event
        @param  {Object} data
        ###
        swipeLeft: ( event ) ->
            log.i "swipe left on '#{event.currentTarget.id}'" if DEBUG

        ###*
        Called for the swiperight event. <br/>
        @param  {Object} event
        @param  {Object} data
        ###
        swipeRight: ( event ) ->
            log.i "swipe right on '#{event.currentTarget.id}'" if DEBUG

        ###*
        Create all references to HTML elements.
        ###
        createHtmlElements: () ->
            log.w "This method should be overriden"

        ###*
        Create all references to data objects.
        ###
        createDataElements: () ->
            log.w "This method should be overriden"

        ###*
        Delete all references to HTML elements.
        ###
        deleteHtmlElements: () ->
            if @html
                for key of @html
                    delete @html[ key ]
                    return # Important: tells coffee to not return a result array

        ###*
        Delete all references to data objects.
        ###
        deleteDataElements: () ->
            if @data
                for key of @data
                    delete @data[ key ]
                    return # Important: tells coffee to not return a result array


        ###*
        Utility method to load a page
        If the page handler has an id and we found a javascript template for it, we use it.
        Else error.
        @param {Object} pageParams Page parameters. Will be merged with this controller settings as placeholder values.
        @throws {String} This page handler has no valid page
        ###
        load: ( pageParams ) ->

            if !@settings then throw "invalid page handler"

            pageId = @settings.id
            templateId = @settings.templateId || pageId

            # Creating a new object which contains static page settings plus dynamic page parameters
            # This object will be used by the template engine to fill placeholders
            templateData = Utils.clone @settings
            $.extend true, templateData, pageParams

            if templateId and templates[ templateId ]
                if !document.getElementById pageId
                    log.i "loading ##{pageId}" if DEBUG
                    log.i "templateData: #{Utils.toJSON templateData}" if DEBUG
                    $( templates[ templateId ].render( templateData ) ).appendTo( "body" )
            else
                throw "This page handler has no valid page"

        backButton: ( event ) ->
            log.i "back button" if DEBUG

        menuButton: ( event ) ->
            log.i "menu button" if DEBUG

        ###*
        Utility method to navigate from one page to another
        If the page handler has an id and we found a javascript template for it, we use it.
        Else, if the page handler has a url, we use that instead.
        Else error.
        @param {Object} options
        @param options.jqmOptions [jQuery Mobile #changePage options][1]
        [1]: http://api.jquerymobile.com/jQuery.mobile.changePage/
        @param options.pageParams Key/value pairs to be passed to destination page
        @param options.delay Delay before navigating. Default 0 = no delay.
        @param options.callback Callback called after navigating.
        @throws {String} This page handler has no valid page
        ###
        navigate: ( options ) ->

            if !@settings then throw "invalid page handler"

            pageId = @settings.id
            templateId = @settings.templateId || pageId

            # Settings defaults
            options = $.extend( true, {
                jqmOptions: {},
                pageParams: undefined,
                delay: 0,
                callback: undefined
            }, options )

            # The JQM tricky way to pass parameters between pages is to use the dataUrl option
            # must contain the hash name without "#" followed by query params
            options.jqmOptions.dataUrl = pageId
            if options.pageParams
                serializedParams = Utils.serializeHashParameters options.pageParams
                if serializedParams?.length
                    options.jqmOptions.dataUrl += "?" + serializedParams

            log.i "options: #{Utils.toJSON options}" if DEBUG

            if templateId and templates[ templateId ]

                # Loading template in DOM
                @load options.pageParams

                # Changing page with a delay if any
                window.setTimeout () ->
                    log.i "navigating to ##{pageId}" if DEBUG
                    $.mobile.changePage "##{pageId}", options.jqmOptions

                    # Calling callback after page change if any
                    if options.callback
                        options.callback()
                , options.delay
            else
                throw "This page handler has no valid page"

        isVisible: () ->
            return @data.visible



    module.exports = PageHandler

