/**
 * @class DetailPageHandler
 * The Page Handler of the detail page
 * @extends nu.pages.PageHandler
 *
 * @provide app.detail
 * @require app
 */
var DetailPageHandler = PH.subClass({
	
	/**
	 * @constructor
	 * @override
	 * @inheritdoc
	 */
	init: function(){
		this._super({
			id: "detail",
			url: "detail.html"
		});
	},

	/**
	 * @override
	 * @inheritdoc
	 */
	pageBeforeShow: function(event, data){
		this.prepareBackButton();
	},

	prepareBackButton: function(){
		// getting a local reference of the back button
		var backButton = $("#detail .back-button");
		// when touch start, go to active state
		backButton.on("vmousedown", function(){
			// making the back button active
			backButton.addClass("pressed");
			// when touch end, go to normal state
			backButton.one("vmouseup vmousemove", function(){
				// making the back button normal
				backButton.removeClass("pressed");
			});
		});

		// when tap on back button, go back home
		backButton.on("tap", function(){
			$.mobile.changePage("home.html", {reverse: true});
			// prevent bubbling
			return false;
		});
	}
});

app.detail = new DetailPageHandler();
