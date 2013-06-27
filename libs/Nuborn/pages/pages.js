/**
 * @provide nu.pages
 * @require nu
 */
nu.pages = {}

/**
 * Utility method to navigate from one page to another
 * If the page handler has an id and we found a javascript template for it, we use it.
 * Else, if the page handler has a url, we use that instead.
 * Else error.
 */
nu.pages.navigate = function(pageHandler, options){

	if(!pageHandler || !pageHandler.settings) throw "invalid page handler"

	var pageId = pageHandler.settings.id
	var pageUrl = pageHandler.settings.url

	if(pageId && templates[pageId]) {
		$(templates[pageId].render()).appendTo("body")
		$.mobile.changePage("#" + pageId, options)
		return true
	}

	if(pageUrl) {
		$.mobile.navigate(pageUrl, options)
		return true
	}

	throw "This page handler has neither a valid page id nor a valid url"
}