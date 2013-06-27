/**
 * @class DetailPageHandler
 * The Page Handler of the detail page
 * @extends nu.pages.PageHandler
 *
 * @provide app.detail
 * @require app
 */
var DetailPageHandler = nu.pages.PageHandler.subClass({
	
	/**
	 * @constructor
	 * @override
	 * @inheritdoc
	 */
	init: function(){
		this._super({
			id: "detail",
			url: "detail.html"
		})
	},


	createHtmlElements: function(){
		// getting a local reference of the back button
		this.html.backButton = $("#detail .back-button")
	},


	/**
	 * @override
	 * @inheritdoc
	 */
	pageBeforeShow: function(event, data){
		this.prepareBackButton()
	},


	prepareBackButton: function(){
		// when touch start, go to active state
		nu.widgets.button.utils.enableUniversalPressMode(this.html.backButton)

		// when tap on back button, go back home
		this.html.backButton.on("tap", this.goBackToHomePage)
	},


	goBackToHomePage: function(){
		nu.pages.navigate(app.home, {reverse: true})
		// prevent bubbling
		return false
	},


	pageHide: function(event, data){
		this.html.backButton.off("tap", this.goBackToHomePage)
		nu.widgets.button.utils.disableUniversalPressMode(this.html.backButton)
	}
})

app.detail = new DetailPageHandler()
