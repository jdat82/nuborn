define "pages.PageHandler", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    pagesManager = require "manager#pages"
    Utils = require "utils.Utils"
    NetworkUtils = require "utils.NetworkUtils"
    UIUtils = require "utils.UIUtils"
    log = require "#log"
    Base = require "common.Base"

    $body = $( document.body )

    ###
    Defaults settings.
    ###
    defaults =
        singleton: false

    ###*
    @class pages.PageHandler
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

            # Default state is hidden
            @data.visible = false

            # Enregistrement du page handler
            pagesManager.registerPageHandler @

        ###*
        Called for the pagebeforecreate event. <br/>
        Also register page into HTML elements.
        @param  {Object} event
        ###
        pageBeforeCreate: ( event ) ->
            log.i "page before create of '#{@settings.id}'" if DEBUG

            # Calling #createHtmlElements
            this.createHtmlElements();

            # Calling #createDataElements if exists
            this.createDataElements();

            # TODO inserting wordings on current page
            # $.it.wordings.update(page)

            # TODO using right image resolution depending on device
            # $.it.rimages.update(page)

        ###*
        Called for the pagecreate event.
        Populate page parameters by reading url hash part in PageHandler#data#pageParams.
        Also create PageHandler#html and PageHandler#data properties.
        @param  {Object} event
        ###
        pageCreate: ( event ) ->
            log.i "page create of '#{@settings.id}'" if DEBUG

        ###*
        Called for the pagebeforehide event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageBeforeHide: ( event, data ) ->
            log.i "page before hide of '#{@settings.id}'" if DEBUG

        ###*
        Called for the pagehide event.
        Also clean references to HTML elements & Data Objects in prototype mode,
        i.e. when page is removed each time we go away.
        @param  {Object} event
        @param  {Object} data
        ###
        pageHide: ( event, data ) ->
            log.i "page hide of '#{@settings.id}'" if DEBUG

            @data.visible = false
            if !@settings.singleton
                # Cleaning references to HTML elements & data objects
                # as they will be recreated every time we go back to the page
                @html.page.parentNode.removeChild(@html.page)
                @deleteHtmlElements()
                @deleteDataElements()

        ###*
        Called for the pagebeforeshow event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageBeforeShow: ( event, data ) ->
            log.i "page before show of '#{@settings.id}'" if DEBUG

        ###*
        Called for the pageshow event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageShow: ( event, data ) ->
            log.i "page show of '#{@settings.id}'" if DEBUG
            @data.visible = true
            if @data.isFirst
                log.i "First page handler ever: hiding splashscreen" if DEBUG
                delete @data.isFirst
                UIUtils.hideSplashScreen()

        ###*
        Called for the pagebeforechange event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageBeforeChange: ( event, data ) ->
            log.i "page before change of '#{@settings.id}'" if DEBUG

        ###*
        Called for the pagechange event.
        @param  {Object} event
        @param  {Object} data
        ###
        # pageChange: ( event, data ) ->
        #     log.i "page change of '#{@settings.id}'" if DEBUG

        ###*
        Called for the pagebeforeload event.
        @param  {Object} event
        @param  {Object} data
        ###
        pageBeforeLoad: ( event, data ) ->
            log.i "page before load of '#{@settings.id}'" if DEBUG

        ###*
        Called for the pageLoad event.
        @param  {Object} event
        @param  {Object} data
        ###
        # pageLoad: ( event, data ) ->
        #     log.i "page load of '#{@settings.id}'" if DEBUG

        ###*
        Called for the pageremove event. <br/>
        Also clean references to HTML elements & Data Objects in prototype mode,
        i.e. when page is removed each time we go away.
        @param  {Object} event
        @param  {Object} data
        ###
        # pageRemove: ( event, data ) ->
        #     log.i "page remove of '#{@settings.id}'" if DEBUG

        ###*
        Called for the swipeleft event. <br/>
        @param  {Object} event
        @param  {Object} data
        ###
        swipeLeft: ( event ) ->
            log.i "swipe left on '#{@settings.id}'" if DEBUG

        ###*
        Called for the swiperight event. <br/>
        @param  {Object} event
        @param  {Object} data
        ###
        swipeRight: ( event ) ->
            log.i "swipe right on '#{@settings.id}'" if DEBUG

        ###*
        Cordova only.
        Android only.
        Event triggered when pressing the device physical back button.
        @param {Object} event
        ###
        backButton: ( event ) ->
            log.i "back button on '#{@settings.id}'" if DEBUG

        ###*
        Cordova only.
        Android only.
        Event triggered when pressing the device physical menu button.
        @param {Object} event
        ###
        menuButton: ( event ) ->
            log.i "menu button on '#{@settings.id}'" if DEBUG

        ###*
        Cordova only.
        Triggered when the application goes to background. Needs the Events plugin.
        @param {Object} event
        ###
        pause: ( event ) ->
            log.i "pause event on '#{@settings.id}'" if DEBUG

        ###*
        Cordova only.
        Triggered when the application goes to foreground. Needs the Events plugin.
        @param {Object} event
        ###
        resume: ( event ) ->
            log.i "resume event on '#{@settings.id}'" if DEBUG

        ###*
        Create all references to HTML elements.
        ###
        createHtmlElements: ->
            @html.page = document.querySelector "#" + @settings.id
            @html.header = @html.page.querySelector "[data-role=header]"
            @html.content = @html.page.querySelector "[data-role=content]"

        ###*
        Create all references to data objects.
        ###
        createDataElements: ->

        ###*
        Delete all references to HTML elements.
        ###
        deleteHtmlElements: ->
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
            templateData = $.extend true, {}, @settings, pageParams

            if templateId and templates[ templateId ]
                if !document.getElementById pageId
                    log.i "loading ##{pageId}" if DEBUG
                    log.i "templateData: #{Utils.toJSON templateData}" if DEBUG
                    # $( templates[ templateId ].render( templateData ) ).appendTo( "body" )
                    UIUtils.append document.body, templates[ templateId ].render( templateData )
            else
                throw "This page handler has no valid page"

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
            templateId = @settings.templateId or pageId

            # Defaults settings
            options = $.extend true, {},
                # jQuery Mobile options
                jqmOptions: {},
                # Identifiy the resource (modify the hash)
                urlParams: undefined
                # Key/value pairs given to the page (page data)
                pageParams: undefined
                # Delay before changing page
                delay: 0,
                # Callback called after changing page
                callback: undefined
            , options

            # The JQM tricky way to pass parameters between pages is to use the dataUrl option.
            # It must contains the hash name without "#" followed by query params.
            options.jqmOptions.dataUrl = pageId
            if options.urlParams
                serializedParams = NetworkUtils.serializeHashParameters options.urlParams
                if serializedParams
                    options.jqmOptions.dataUrl += "?" + serializedParams
                if not options.pageParams
                    @pageParams = options.urlParams

            # Little commodity page handlers (always there)
            if not options.pageParams
                @pageParams = options.pageParams = {}
            else
                @pageParams = options.pageParams

            log.i "options: #{Utils.toJSON options}" if DEBUG

            if templateId and templates[ templateId ]

                # Simulating the pagebeforeload event
                # Never fired in nuborn as we are not loading html files
                event = $.Event "pagebeforeload"
                event.options = options
                preventDefault = @pageBeforeLoad( event ) is false;
                if event.isDefaultPrevented() || preventDefault
                    log.i "Loading of #{@settings.id} prevented" if DEBUG
                    return

                # Loading template in DOM
                @load options.pageParams

                # Simulating the pagebeforechange event
                # Never fired in nuborn as we are not loading html files
                event = $.Event "pagebeforechange"
                event.options = options
                preventDefault = @pageBeforeChange( event ) is false
                if event.isDefaultPrevented() || preventDefault
                    log.i "Navigation to #{@settings.id} prevented" if DEBUG
                    return

                # Starting JQM if necessary
                if !PageHandler.JQMInitialized
                    # Memorizing first page handler to handle splashscreen removal
                    @data.isFirst = true
                    PageHandler.JQMInitialized = true
                    changePage = ->
                        log.i "First page is: ##{pageId}" if DEBUG
                        $.mobile.initializePage()
                else
                    changePage = ->
                        log.i "Navigating to ##{pageId}" if DEBUG
                        $body.pagecontainer( "change", "#" + pageId, options.jqmOptions );

                # Changing page with a delay if any
                window.setTimeout ->

                    changePage()

                    # Calling callback after page change if any
                    if options.callback
                        options.callback()

                , options.delay
            else
                throw "This page handler has no valid page"

        isVisible: () ->
            return @data.visible



    module.exports = PageHandler

