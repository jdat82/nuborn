/**
 * @class HomePageHandler
 * The Page Handler of the home page
 * @extends nu.pages.PageHandler
 */
var HomePageHandler = PH.subClass({
	
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
	},

	/**
	 * @override
	 * @inheritdoc
	 */
	createDataElements: function()
	{
		
	},

	/**
	 * @override
	 * @inheritdoc
	 */
	pageBeforeShow: function(event, data){
		this.handleMenuButton();
		this.prepareCarousel();
	},

	/**
	 * @override
	 * @inheritdoc
	 */
	pageShow: function(event, data){
		// Initialize Carousel with the Swipe library
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
	 * Handle the menu button.
	 */
	handleMenuButton: function(){
		// getting a local reference of the menu button
		var menuButton = this.html.menuButton;
		// when touch start, go to active state
		menuButton.on("vmousedown", function(){
			// making the menu button active
			menuButton.addClass("active");
			// when touch end, go to normal state
			menuButton.one("vmouseup vmousemove", function(){
				// making the menu button normal
				menuButton.removeClass("active");
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
		// // disabling scroll when the menu is open
		// menu.on("panelbeforeopen", function(event, ui){
		// 	utils.disableScroll();
		// });
		// // enabling scroll when the menu is closed
		// menu.on("panelbeforeclose", function(event, ui){
		// 	utils.enableScroll();
		// });
	},

	/**
	 * Prepare the carousel. <br/>
	 * -- Load the data <br/>
	 * -- Render the data
	 */
	prepareCarousel: function(){
		// Create the data to display in the carousel
		var data = {
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
		// add template to carousel wrapper, rendered with previous data
		this.html.carouselWrapper.html(Templates.home_card.render(data));
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