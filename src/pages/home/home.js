(function ($, nu, app, utils, log, templates, undefined) {

	'use strict';

	/**
	 * @class app.pages.HomePageHandler
	 * @extends nu.pages.PageHandler
	 *
	 * The Page Handler of the home page.
	 *
	 * {@link app#home app.home is an instance of this page handler}
	 *
	 * @provide app.pages.HomePageHandler
	 *
	 * @require app.pages
	 */
	app.pages.HomePageHandler = nu.pages.PageHandler.subClass({

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function () {
			this._super({
				id: "home",
				singleton: true
			});
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		createHtmlElements: function () {
			var page = this.html.page;
			this.html.menuButton = page.find("div.menu-button");
			this.html.menu = page.find("#home-menu");
			this.html.carousel = page.find("#carousel");
			this.html.carouselWrapper = page.find("#carousel-wrapper");
			this.html.news = page.find("#news");
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		createDataElements: function () {
			// Create the data to display in the carousel
			this.data.carousel = {
				cards: [{
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
				}]
			};

			// Create the data to display in the menu
			this.data.menu = {
				items: [{
					title: "Accueil",
					icon: "home"
				}, {
					title: "Profil",
					icon: "profile"
				}, {
					title: "Paramètres",
					icon: "settings"
				}, {
					title: "Aide",
					icon: "help"
				}]
			};

			// Create the data to display in the news
			this.data.news = {
				items: [{
						title: "Le créateur des \"Griffin\" se pointe... dans \"Les Simpson\" !",
						author: "",
						date: "dimanche 12 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/94/34/20558741.jpg"
					}, {
						title: "La chaîne américaine ABC commande 12 nouvelles séries",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/28/20560689.jpg"
					}, {
						title: "La série adaptée de \"SHIELD\" de Marvel est commandée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/95/80/20559549.jpg"
					}, {
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					},

					// ************** //
					{
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
						title: "Le final de \"Mentalist\" !",
						author: "",
						date: "lundi 6 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
					}, {
						title: "\"Nashville\" est renouvelée",
						author: "",
						date: "samedi 11 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
					}, {
						title: "Matthew Perry est maudit : \"Go On\" est annulée !",
						author: "",
						date: "vendredi 10 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
					}, {
						title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
						author: "",
						date: "mardi 7 mai",
						image: "http://src.sencha.io/http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
					}, {
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
		pageInit: function (event, data) {

			this._super(event, data);

			this.prepareMenu();
			this.handleMenuButton();
			this.prepareCarousel();
			this.prepareNews();
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		pageShow: function (event, data) {

			this._super(event, data);

			// Initializing Carousel with the Swipe library
			this.html.carousel.Swipe();

			var self = this;
			// if the splashscreen is handled from web
			if (app.splash) {
				setTimeout(function () {
					// hide splashscreen after 2 seconds
					app.splash.hide(true);
					// remove reference from dom for garbage collector (not needed anymore)
					delete app.splash;
					// thumbnails little effect for fun
					// self.startThumbnailsAnimation();
				}, 2000);
			}
			// if the splashscreen is handled natively with iOS
			else if (utils.isCordova() && utils.isIOS()) {
				// hide it immediately via cordova
				navigator.splashscreen.hide();
			}
		},

		/**
		 * Little animation on thumbnails.
		 */
		startThumbnailsAnimation: function () {

			// creating the timeline
			var tl = new TimelineLite();

			// pausing animation on scroll
			var onScrollStartPauseTimeline = function () {
				tl.pause();
			};
			$(document).on("scrollstart", onScrollStartPauseTimeline);

			// resuming animation on scroll end
			var onScrollStopResumeTimeline = function () {
				tl.resume();
			};
			$(document).on("scrollstop", onScrollStopResumeTimeline);

			// removing listeners on events scrollXXX when timeline has completed
			var onCompleteStopScrollEventsListening = function () {
				$(document).off("scrollstart", onScrollStartPauseTimeline);
				$(document).off("scrollstop", onScrollStopResumeTimeline);
			};

			// starting animation
			tl.staggerFrom(
				this.html.news.find(".thumbnail"),
				0.3, {
					opacity: 0.2,
					scale: 0.5
				},
				0.2,
				1,
				onCompleteStopScrollEventsListening);
		},

		/**
		 * @override
		 * @inheritdoc
		 */
		// pageHide: function (event, data) {
		// this._super(event, data);
		// jQuery mobile does not remove the home page the first time
		// if (Object.keys(this.html).length || Object.keys(this.data).length) {
		// 	debug && log.i("Manually remove the Home Page.");
		// 	this.deleteHtmlElements();
		// 	this.deleteDataElements();
		// 	$("#" + this.settings.id).remove();
		// }
		// },

		/**
		 * Prepare the data to be displayed in the menu panel. <br/>
		 * Also handle pressed states and taps of the menu items.
		 */
		prepareMenu: function () {
			// getting a local reference of the menu
			var menu = this.html.menu;
			// add template to carousel wrapper, rendered with previous data
			menu.append(templates.menu_cell.render(this.data.menu));

			// handle pressed state on li
			menu.on("vmousedown", "li", function (event) {
				var self = $(this);
				self.addClass("pressed");
				self.one("vmouseup vmousemove", function (event) {
					self.removeClass("pressed");
				});
			});
			// handle tap on li
			menu.on("tap", "li", function (event) {
				var self = $(this);
				self.removeClass("pressed");
				log.w("This feature has note been implented yet");
				menu.panel("close");
			});
		},

		/**
		 * Handle the menu button.
		 */
		handleMenuButton: function () {
			// getting a local reference of the menu button
			var menuButton = this.html.menuButton;
			// when touch start, go to active state
			menuButton.on("vmousedown", function () {
				// making the menu button active
				menuButton.addClass("pressed");
				// when touch end, go to normal state
				menuButton.one("vmouseup vmousemove", function () {
					// making the menu button normal
					menuButton.removeClass("pressed");
				});
			});

			// getting a local reference of the menu
			var menu = this.html.menu;
			// when tap on menu button, open menu panel
			menuButton.on("tap", function () {
				// opening menu panel
				menu.panel("open");
				// prevent bubbling
				return false;
			});
			// disabling scroll when the menu is open
			menu.on("panelbeforeopen", function (event, ui) {
				utils.disableScroll();
			});
			// enabling scroll when the menu is closed
			menu.on("panelbeforeclose", function (event, ui) {
				utils.enableScroll();
			});
		},

		/**
		 * Prepare the carousel. <br/>
		 * -- Load the data <br/>
		 * -- Render the data
		 */
		prepareCarousel: function () {
			// add template to carousel wrapper, rendered with carousel data
			this.html.carouselWrapper.html(templates.card.render(this.data.carousel));
		},

		prepareNews: function () {
			// add template to news, rendered with news data
			var news = this.html.news;

			news.append(templates.news_cell.render(this.data.news));

			news.on("vmousedown", "li", function () {
				var item = $(this);
				item.addClass("pressed");
				item.one("vmouseup vmousemove", function () {
					item.removeClass("pressed");
				});
			});

			news.on("tap", "li", function () {
				app.detail.navigate({
					pageParams: {
						id: 3
					}
				});
			});
		}
	});

	/**
	 * @property {app.pages.HomePageHandler} home
	 * @member app
	 * Instance of a page handler for the home page.
	 */
	app.home = new app.pages.HomePageHandler();

})(jQuery, nu, app, nu.Utils, nu.debug.Log, templates)