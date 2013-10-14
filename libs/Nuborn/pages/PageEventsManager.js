( function ( $, nu, log, undefined ) {

	'use strict';

	/**
	 * @class nu.pages.PageEventsManager
	 * @singleton
	 *
	 * Page events manager Class. <br/>
	 * Used to dispatch jQuery Mobile page events.
	 *
	 * @provide nu.pages.PageEventsManager
	 *
	 * @require nu.pages
	 * @require nu.debug.Log
	 */
	nu.pages.PageEventsManager = Object.subClass( {
		/**
		 * @constructor
		 * Creates a new Page Events Manager.
		 */
		init: function ( ) {
			// initializing members
			this.pageHandlers = {};
			this.currentPageHandler = null;
			this.previousPageHandler = null;

			// binding page events to the manager
			this.bindPageEvents( );
			this.interceptHashLinks( );
		},

		/**
		 * Bind page events.
		 */
		bindPageEvents: function ( ) {
			// Declaring page selector string
			var pageSelector = "[data-role=page]";
			// Binding all jQuery Mobile page events
			$( document ).on( "pagebeforecreate", pageSelector, $.proxy( this, "pageBeforeCreate" ) );
			$( document ).on( "pageinit", pageSelector, $.proxy( this, "pageInit" ) );
			$( document ).on( "pagecreate", pageSelector, $.proxy( this, "pageCreate" ) );
			$( document ).on( "pagebeforechange", pageSelector, $.proxy( this, "pageBeforeChange" ) );
			$( document ).on( "pagechange", pageSelector, $.proxy( this, "pageChange" ) );
			$( document ).on( "pagebeforeload", pageSelector, $.proxy( this, "pageBeforeLoad" ) );
			$( document ).on( "pageload", pageSelector, $.proxy( this, "pageLoad" ) );
			$( document ).on( "pagebeforehide", pageSelector, $.proxy( this, "pageBeforeHide" ) );
			$( document ).on( "pagebeforeshow", pageSelector, $.proxy( this, "pageBeforeShow" ) );
			// $(document).on("pageremove", pageSelector, $.proxy(this, "pageRemove"));
			$( document ).on( "pagehide", pageSelector, $.proxy( this, "pageHide" ) );
			$( document ).on( "pageshow", pageSelector, $.proxy( this, "pageShow" ) );
			$( document ).on( "swipeleft", pageSelector, $.proxy( this, "swipeLeft" ) );
			$( document ).on( "swiperight", pageSelector, $.proxy( this, "swipeRight" ) );
		},

		/**
		 * Unbind page events.
		 */
		unbindPageEvent: function ( ) {
			// Unbinding all jQuery Mobile page events
			$( document ).off( "pagebeforecreate" );
			$( document ).off( "pageinit" );
			$( document ).off( "pagecreate" );
			$( document ).off( "pagebeforechange" );
			$( document ).off( "pagebeforeload" );
			$( document ).off( "pagebeforehide" );
			$( document ).off( "pagebeforeshow" );
			// $(document).off("pageremove");
			$( document ).off( "pagehide" );
			$( document ).off( "pageshow" );
		},

		/**
		 * Page handlers have to register to the page events manager to be notified when jQuery Mobile page events are triggered.
		 * @param  {nu.pages.PageHandler} pageHandler
		 */
		registerPageHandler: function ( pageHandler ) {

			if ( !pageHandler || !pageHandler.settings || !pageHandler.settings.id )
				return;

			if ( pageHandler.settings[ "default" ] )
				this.defaultPageHandler = pageHandler;
			else
				this.pageHandlers[ pageHandler.settings.id ] = pageHandler;
		},

		/**
		 * Returns the page handler from the given id.
		 * @param  {String} id
		 * @return {nu.pages.PageHandler}
		 */
		getPageHandler: function ( id ) {

			var pageHandler = this.pageHandlers[ id ];

			if ( !pageHandler && !this.defaultPageHandler ) {
				log.w( "No page handler for page '" + id + "' !" );
				return undefined;
			}

			if ( !pageHandler && this.defaultPageHandler ) {
				return this.defaultPageHandler;
			}

			return pageHandler;
		},

		/**
		 * Returns the page handler from a page event.
		 * @param  {Event} event
		 * @return {nu.pages.PageHandler}
		 */
		getPageHandlerFromEvent: function ( event ) {
			// getting the page on which the event has been triggered
			var page = event.currentTarget;
			// getting the page handler
			return this.getPageHandler( page.id );
		},

		/**
		 * Load first page.
		 * @param {String} defaultPageId Default page ID to use if no ID in current URL.
		 * @param {nu.widgets.SplashScreen} splashscreen Web splashscreen (optional).
		 */
		loadFirstPage: function ( defaultPageId, splashscreen ) {

			// hash.name contains current page id if filled
			var hash = nu.Utils.deserializeHash( );
			var pageId = hash.name || defaultPageId;
			debug && log.i( "First page is: " + pageId );

			var pageHandler = this.getPageHandler( pageId );

			if ( pageHandler ) {
				if ( !window.location.hash )
					window.location.hash = "#" + pageId;
				// memorizing first page handler to handle splashscreen removal
				pageHandler.data.isFirst = true;
				pageHandler.data.splashscreen = splashscreen;
				// loading page into DOM
				pageHandler.navigate( {
					pageParams: hash.params
				} );
			}
		},

		/**
		 * Called for pagebeforecreate event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageBeforeCreate: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// registering the current active page handler as the previous one
			this.previousPageHandler = this.currentPageHandler;
			// registering new active page handler
			this.currentPageHandler = pageHandler;

			// dispatching the event to current active page handler
			pageHandler.pageBeforeCreate( event, data );
		},

		/**
		 * Called for pageinit event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageInit: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.pageInit( event, data );
		},

		/**
		 * Called for pagecreate event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageCreate: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.pageCreate( event, data );
		},

		/**
		 * Called for pagehide event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageHide: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.data.isVisible = false;
			pageHandler.pageHide( event, data );
		},

		/**
		 * Called for pageremove event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		// pageRemove: function (event, data) {
		// 	// getting page handler from the event
		// 	var pageHandler = this.getPageHandlerFromEvent(event);
		// 	// stop process if no page handler has been found
		// 	if (!pageHandler) {
		// 		return;
		// 	}

		// 	// dispatching the event to current active page handler
		// 	pageHandler.pageRemove(event, data);
		// },

		/**
		 * Called for pagebeforeshow event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageBeforeShow: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			var page = event.currentTarget;

			// dispatching the event to current active page handler
			pageHandler.pageBeforeShow( event, data );
		},

		/**
		 * Called for pagebeforechange event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageBeforeChange: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.pageBeforeChange( event, data );
		},

		/**
		 * Called for pagechange event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageChange: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.pageChange( event, data );
		},

		/**
		 * Called for pagebeforeload event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageBeforeLoad: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.pageBeforeLoad( event, data );
		},

		/**
		 * Called for pageload event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageLoad: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.pageLoad( event, data );
		},

		/**
		 * Called for pageshow event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageShow: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.data.isVisible = true;
			pageHandler.pageShow( event, data );
		},

		/**
		 * Called for pagebeforehide event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		pageBeforeHide: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.pageBeforeHide( event, data );
		},

		/**
		 * Called for swipeleft event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		swipeLeft: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.swipeLeft( event, data );
		},

		/**
		 * Called for swiperight event.
		 * @param {Object} event
		 * @param {Object} data
		 */
		swipeRight: function ( event, data ) {
			// getting page handler from the event
			var pageHandler = this.getPageHandlerFromEvent( event );
			// stop process if no page handler has been found
			if ( !pageHandler ) {
				return;
			}

			// dispatching the event to current active page handler
			pageHandler.swipeRight( event, data );
		},

		/**
		 * Intercept links which starts with a #.
		 * The page manager will load the linked template and navigate to it.
		 */
		interceptHashLinks: function ( ) {
			$( document ).on( "click", "a", function ( event ) {
				var el = event.currentTarget;
				var hash = nu.Utils.deserializeHash( el.href );
				var preventDefault = !( el.dataset.intercept === "true" );
				// if it is not a hash link, nothing to do
				if ( !hash.name || !hash.name.length || preventDefault ) {
					event.preventDefault( );
					return false;
				}

				debug && log.i( "intercepted hash link: #" + hash.name );
				if ( app[ hash.name ] ) {
					app[ hash.name ].navigate( {
						pageParams: hash.params
					} );
					event.preventDefault( );
					return false;
				}
			} );
		}

	} );

	/**
	 * Gets the shared instance of PageEventsManager class.
	 * @return {nu.pages.PageEventsManager} The shared instance of Page Events Manager
	 *
	 * @static
	 * @method get
	 */
	nu.pages.PageEventsManager.get = function ( ) {
		if ( !nu.pages.PageEventsManager.SINGLETON_INSTANCE ) {
			nu.pages.PageEventsManager.SINGLETON_INSTANCE = new nu.pages.PageEventsManager( );
		}
		return nu.pages.PageEventsManager.SINGLETON_INSTANCE;
	};

} )( jQuery, nu, nu.debug.Log )