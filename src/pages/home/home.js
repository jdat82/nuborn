var HomePageHandler = PH.subClass({
	
	/**
	 * @override
	 */
	init: function(){
		this._super({
			id: "home",
			url: "home.html"
		});
	},

	/**
	 * @override
	 */
	pageShow: function(event, data){
		if(app.splash){
			setTimeout(function(){
				app.splash.hide(true);
			}, 2000);
		}
		if(utils.isCordova() && utils.isIOS()){
			alert("coucou");//navigator.splashscreen.hide();
		}
	}
});

app.home = new HomePageHandler();

HomePageHandler.insertHTML = function(){
	log.i(app.home.settings.url);
	var deferred = $.Deferred();
	$.ajax({
		async: false,
		url: app.home.settings.url
	}).done(function(data){
		log.i(data);
		$("body").prepend(data);
		deferred.resolve();
	}).fail(function(){
		log.e("There was an error while inserting HTML of Home page.");
		deferred.reject();
	});
	return deferred.promise();
};