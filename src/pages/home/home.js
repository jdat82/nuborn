/**
 * @class HomePageHandler
 * The Page Handler of the home page
 * @extends nu.pages.PageHandler
 * 
 * @provide app.home
 * @require app
 */
var HomePageHandler = nu.pages.PageHandler.subClass({
	
	/**
	 * @constructor
	 * @override
	 * @inheritdoc
	 */
	init: function(){
		this._super({
			id: "home",
			url: "home.html"
		});
	},

	/**
	 * @override
	 * @inheritdoc
	 */
	createHtmlElements: function()
	{
		var page = this.html.page;
		this.html.menuButton = page.find("div.menu-button");
		this.html.menu = page.find("#home-menu");
		this.html.carousel = $("#carousel");
		this.html.carouselWrapper = $("#carousel-wrapper");
		this.html.news = $("#news");
	},

	/**
	 * @override
	 * @inheritdoc
	 */
	createDataElements: function()
	{
		this.data = {}
		// Create the data to display in the carousel
		this.data.carousel = {
			cards: [
				{
					title: "The Big Bang Theory",
					image: "http://www.miglo.net/download/men-beard-the-big-bang-theory-1280x800.jpg"
				},
				{
					title: "Friends",
					image: "http://2.bp.blogspot.com/-qsfnOy3X1o8/UIWNBoHZlSI/AAAAAAAAA6E/lpOoOTh0rJU/s1600/Friends_04.jpg"
				},
				{
					title: "How I Met Your Mother",
					image: "http://popgoestheweek.com/wp-content/uploads/2012/12/how-i-met-your-mother-506192f593493.jpg"
				},
				{
					title: "One Piece",
					image: "http://anime-vostfr.com/wp-content/uploads/2013/01/one-piece-581-vostfr.jpg?8b6f22"
				}
			]
		};

		// Create the data to display in the menu
		this.data.menu = {
			items: [
				{
					title: "Accueil",
					icon: "home"
				},
				{
					title: "Profil",
					icon:"profile"
				},
				{
					title: "Paramètres",
					icon: "settings"
				},
				{
					title: "Aide",
					icon: "help"
				}
			]
		};

		// Create the data to display in the news
		this.data.news = {
			items: [
				{
					title: "Le créateur des \"Griffin\" se pointe... dans \"Les Simpson\" !",
					author: "Jim Robs",
					date: "dimanche 12 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/94/34/20558741.jpg"
				},
				{
					title: "La chaîne américaine ABC commande 12 nouvelles séries",
					author: "Jim Robs",
					date: "samedi 11 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/28/20560689.jpg"
				},
				{
					title: "La série adaptée de \"SHIELD\" de Marvel est commandée",
					author: "Jim Robs",
					date: "samedi 11 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/95/80/20559549.jpg"
				},
				{
					title: "\"Nashville\" est renouvelée",
					author: "Jim Robs",
					date: "samedi 11 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
				},
				{
					title: "Matthew Perry est maudit : \"Go On\" est annulée !",
					author: "Jim Robs",
					date: "vendredi 10 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
				},
				{
					title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
					author: "Jim Robs",
					date: "mardi 7 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
				},
				{
					title: "Le final de \"Mentalist\" !",
					author: "Jim Robs",
					date: "lundi 6 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
				}

				// ************** //
				,
				{
					title: "\"Nashville\" est renouvelée",
					author: "Jim Robs",
					date: "samedi 11 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
				},
				{
					title: "Matthew Perry est maudit : \"Go On\" est annulée !",
					author: "Jim Robs",
					date: "vendredi 10 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
				},
				{
					title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
					author: "Jim Robs",
					date: "mardi 7 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
				},
				{
					title: "Le final de \"Mentalist\" !",
					author: "Jim Robs",
					date: "lundi 6 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
				},
				{
					title: "\"Nashville\" est renouvelée",
					author: "Jim Robs",
					date: "samedi 11 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
				},
				{
					title: "Matthew Perry est maudit : \"Go On\" est annulée !",
					author: "Jim Robs",
					date: "vendredi 10 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
				},
				{
					title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
					author: "Jim Robs",
					date: "mardi 7 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
				},
				{
					title: "Le final de \"Mentalist\" !",
					author: "Jim Robs",
					date: "lundi 6 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
				},
				{
					title: "\"Nashville\" est renouvelée",
					author: "Jim Robs",
					date: "samedi 11 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
				},
				{
					title: "Matthew Perry est maudit : \"Go On\" est annulée !",
					author: "Jim Robs",
					date: "vendredi 10 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
				},
				{
					title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
					author: "Jim Robs",
					date: "mardi 7 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
				},
				{
					title: "Le final de \"Mentalist\" !",
					author: "Jim Robs",
					date: "lundi 6 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
				},
				{
					title: "\"Nashville\" est renouvelée",
					author: "Jim Robs",
					date: "samedi 11 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
				},
				{
					title: "Matthew Perry est maudit : \"Go On\" est annulée !",
					author: "Jim Robs",
					date: "vendredi 10 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
				},
				{
					title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
					author: "Jim Robs",
					date: "mardi 7 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
				},
				{
					title: "Le final de \"Mentalist\" !",
					author: "Jim Robs",
					date: "lundi 6 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
				},
				{
					title: "\"Nashville\" est renouvelée",
					author: "Jim Robs",
					date: "samedi 11 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
				},
				{
					title: "Matthew Perry est maudit : \"Go On\" est annulée !",
					author: "Jim Robs",
					date: "vendredi 10 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
				},
				{
					title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
					author: "Jim Robs",
					date: "mardi 7 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
				},
				{
					title: "Le final de \"Mentalist\" !",
					author: "Jim Robs",
					date: "lundi 6 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
				},
				{
					title: "\"Nashville\" est renouvelée",
					author: "Jim Robs",
					date: "samedi 11 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/77/20560903.jpg"
				},
				{
					title: "Matthew Perry est maudit : \"Go On\" est annulée !",
					author: "Jim Robs",
					date: "vendredi 10 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/97/54/20560816.jpg"
				},
				{
					title: "Ewan McGregor-Natalie Portman, de \"Star wars\" à \"Jane got a gun\"",
					author: "Jim Robs",
					date: "mardi 7 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/88/93/20556957.jpg"
				},
				{
					title: "Le final de \"Mentalist\" !",
					author: "Jim Robs",
					date: "lundi 6 mai",
					image: "http://a69.g.akamai.net/n/69/10688/v1/img5.allocine.fr/acmedia/medias/nmedia/18/97/86/24/20555126.jpg"
				}
			]
		};
	},

	/**
	 * @override
	 * @inheritdoc
	 */
	pageBeforeShow: function(event, data){
		this.prepareMenu();
		this.handleMenuButton();
		this.prepareCarousel();
		this.prepareNews();
	},

	/**
	 * @override
	 * @inheritdoc
	 */
	pageShow: function(event, data){
		// Initializing Carousel with the Swipe library
		this.html.carousel.Swipe();
		// if the splashscreen is handled from web
		if(app.splash){
			// hide splashscreen after 2 seconds
			setTimeout(function(){
				app.splash.hide(true);
			}, 2000);
		} 
		// if the splashscreen is handled natively with iOS
		else if(utils.isCordova() && utils.isIOS()){
			// hide it immediately
			navigator.splashscreen.hide();
		}
	},

	/**
	 * @override
	 * @inheritdoc
	 */
	pageHide: function(){
		// jQuery mobile does not remove the home page the first time
		if(Object.keys(this.html).length || Object.keys(this.data).length){
			log.i("Manually remove the Home Page.");
			this.deleteHtmlElements();
			this.deleteDataElements();
			$("#"+this.settings.id).remove();
		}
	},

	/**
	 * Prepare the data to be displayed in the menu panel. <br/>
	 * Also handle pressed states and taps of the menu items.
	 */
	prepareMenu: function(){
		// getting a local reference of the menu
		var menu = this.html.menu;
		// add template to carousel wrapper, rendered with previous data
		menu.append(Templates.home_menu_cell.render(this.data.menu));

		// handle pressed state on li
		menu.on("vmousedown", "li", function(event){
			var self = $(this);
			self.addClass("pressed");
			self.one("vmouseup vmousemove", function(event){
				self.removeClass("pressed");
			});
		});
		// handle tap on li
		menu.on("tap", "li", function(event){
			var self = $(this);
			self.removeClass("pressed");
			log.i("This feature has note been implented yet");
			menu.panel("close");
		});
	},

	/**
	 * Handle the menu button.
	 */
	handleMenuButton: function(){
		// getting a local reference of the menu button
		var menuButton = this.html.menuButton;
		// when touch start, go to active state
		menuButton.on("vmousedown", function(){
			// making the menu button active
			menuButton.addClass("pressed");
			// when touch end, go to normal state
			menuButton.one("vmouseup vmousemove", function(){
				// making the menu button normal
				menuButton.removeClass("pressed");
			});
		});
		
		// getting a local reference of the menu
		var menu = this.html.menu;
		// when tap on menu button, open menu panel
		menuButton.on("tap", function(){
			// opening menu panel
			menu.panel("open");
			// prevent bubbling
			return false;
		});
		// disabling scroll when the menu is open
		menu.on("panelbeforeopen", function(event, ui){
			utils.disableScroll();
		});
		// enabling scroll when the menu is closed
		menu.on("panelbeforeclose", function(event, ui){
			utils.enableScroll();
		});
	},

	/**
	 * Prepare the carousel. <br/>
	 * -- Load the data <br/>
	 * -- Render the data
	 */
	prepareCarousel: function(){
		// add template to carousel wrapper, rendered with carousel data
		this.html.carouselWrapper.html(Templates.home_card.render(this.data.carousel));
	},

	prepareNews: function(){
		// add template to news, rendered with news data
		var news = this.html.news;

		news.append(Templates.home_news_cell.render(this.data.news));

		news.on("vmousedown", "li", function(){
			var self = $(this);

			self.addClass("pressed");
			self.one("vmouseup vmousemove", function(){
				self.removeClass("pressed");
			});
		});

		news.on("tap", "li", function(){
			$.mobile.changePage("detail.html");
		});
	}
});

// create a shortcut to the home page handler
app.home = new HomePageHandler();

/**
 * Load the page home.html and insert it to the body
 * @return {Deferred} The deferred of the process
 */
HomePageHandler.insertHTML = function(){
	// load the html of the home page and return the deferred's promise
	return $.ajax({
		// async: false,
		url: app.home.settings.url
	})
	// on success, prepend the data into the body
	.done(function(data){
		$("body").prepend(data);
	})
	// on error, log the error 
	.fail(function(){
		log.e("There was an error while inserting HTML of Home page.");
	})
	// return the promise
	.promise();
};