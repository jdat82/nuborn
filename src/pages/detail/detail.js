(function ($, nu, app, templates, undefined) {

	/**
	 * @class app.pages.DetailPageHandler
	 * @extends nu.pages.PageHandler
	 *
	 * The Page Handler of the detail page
	 *
	 * {@link app#detail app.detail is an instance of this page handler}
	 *
	 * @provide app.pages.DetailPageHandler
	 *
	 * @require app
	 */
	app.pages = app.pages || {}
	app.pages.DetailPageHandler = nu.pages.PageHandler.subClass({

		/**
		 * @override
		 * @inheritdoc
		 */
		init: function () {
			this._super({
				id: "detail",
				url: "detail.html"
			})
		},


		createHtmlElements: function () {
			// getting a local reference of the back button
			this.html.backButton = $("#detail .back-button")
		},


		/**
		 * @override
		 * @inheritdoc
		 */
		pageBeforeShow: function (event, data) {
			this.prepareBackButton()
		},


		prepareBackButton: function () {
			// when touch start, go to active state
			nu.widgets.button.Utils.enableUniversalPressMode(this.html.backButton)

			// when tap on back button, go back home
			this.html.backButton.on("tap", this.goBackToHomePage)
		},


		goBackToHomePage: function () {
			app.home.navigate({
				reverse: true
			})
			// prevent bubbling
			return false
		},


		pageHide: function (event, data) {
			this.html.backButton.off("tap", this.goBackToHomePage)
			nu.widgets.button.Utils.disableUniversalPressMode(this.html.backButton)
		}
	})

	/**
	 * @property {app.pages.DetailPageHandler} detail
	 * @member app
	 * Instance of a page handler for the detail page.
	 */
	app.detail = new app.pages.DetailPageHandler()

})(jQuery, nu, app, templates)