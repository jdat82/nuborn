( function ( $, nu, app, Utils, Log, templates, undefined ) {

	'use strict';

	/**
	 * @class app.pages.HomePageHandler
	 * @extends app.pages.NubornPageHandler
	 *
	 * The Page Handler of the home page.
	 *
	 * {@link app#home app.home is an instance of this page handler}
	 *
	 * @provide app.pages.HomePageHandler
	 *
	 * @require app.pages.NubornPageHandler
	 */
	app.pages.HomePageHandler = app.pages.NubornPageHandler.subClass( {

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function ( ) {
			this._super( {
				id: "home",
				singleton: true
			} );
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		createHtmlElements: function ( ) {
			var page = this.html.page;
			this.html.menuButton = page.find( "div.menu-button" );
			this.html.carousel = page.find( "#carousel" );
			this.html.carouselWrapper = page.find( "#carousel-wrapper" );
			this.html.news = page.find( "#news" );
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		createDataElements: function ( ) {
			// Create the data to display in the carousel
			this.data.carousel = {
				cards: [ {
					title: "The Big Bang Theory",
					image: "http://src.sencha.io/http://farm3.staticflickr.com/2493/3983699775_cfe70a1224_z.jpg"
				}, {
					title: "Game of Thrones",
					image: "http://src.sencha.io/http://www.menzone.gr/wp-content/uploads/2013/05/game-of-thrones-Poster.jpg"
				}, {
					title: "How I Met Your Mother",
					image: "http://src.sencha.io/http://opinionaided.s3.amazonaws.com/201211/50a004d9a6710c0f7c000006_ref.jpg"
				}, {
					title: "Person of Interest",
					image: "http://src.sencha.io/http://www.tuxboard.com/photos/2013/01/Person-of-Interest-saison-1-VOSTFR-640x640.jpg"
				} ]
			};

			// Create the data to display in the news
			this.data.news = {
				items: [ {
						id: 1,
						title: "Le créateur des \"Griffin\" se pointe... dans \"Les Simpson\" !",
						author: "",
						date: "dimanche 12 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/94/34/20558741.jpg"
					}, {
						id: 2,
						title: "La chaîne américaine ABC commande 12 nouvelles séries",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/28/20560689.jpg"
					}, {
						id: 3,
						title: "La série adaptée de \"SHIELD\" de Marvel est commandée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/95/80/20559549.jpg"
					}, {
						id: 4,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 5,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 6,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 7,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					},

					// ************** //
					{
						id: 8,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 9,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 10,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 11,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						id: 12,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 13,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 14,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 15,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						id: 16,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 17,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 18,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 19,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						id: 20,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 21,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 22,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 23,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						id: 24,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 25,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 26,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 27,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						id: 28,
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						id: 29,
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						id: 30,
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						id: 31,
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}
				]
			};
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		pageInit: function ( event ) {

			this._super( event );

			this.handleMenuButton( );
			this.prepareCarousel( );
			this.prepareNews( );
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		pageShow: function ( event, data ) {

			this._super( event, data );

			// Initializing Carousel with the Swipe library
			this.html.carousel.Swipe( );

			// iScroll polyfill for deficient devices (everyone except apple of course)
			// if ( window.IScroll ) {
			// 	DEBUG && Log.i( "initializing iScroll" );
			// 	this.data.iscroll = new IScroll( "#toto" );
			// }
		},

		/**
		 * Handle the menu button.
		 */
		handleMenuButton: function ( ) {
			// when tap on menu button, open menu panel
			this.html.menuButton.on( "tap", function ( ) {
				// opening menu panel
				app.menu.toggleMenu( );
				// prevent bubbling
				return false;
			} );
		},

		/**
		 * Prepare the carousel. <br/>
		 * -- Load the data <br/>
		 * -- Render the data
		 */
		prepareCarousel: function ( ) {
			// add template to carousel wrapper, rendered with carousel data
			this.html.carouselWrapper.html( templates.card.render( this.data.carousel ) );
		},

		prepareNews: function ( ) {
			// add template to news, rendered with news data
			var news = this.html.news;
			news.append( templates.news_cell.render( this.data.news ) );
			news.on( "tap", "li", function ( event ) {
				var newsId = event.currentTarget.dataset.newsId;
				app.detail.navigate( {
					pageParams: {
						id: newsId
					}
				} );
				return false;
			} );
		}
	} );

	/**
	 * @property {app.pages.HomePageHandler} home
	 * @member app
	 * Instance of a page handler for the home page.
	 */
	app.home = new app.pages.HomePageHandler( );

} )( jQuery, nu, app, nu.Utils, nu.debug.Log, templates )