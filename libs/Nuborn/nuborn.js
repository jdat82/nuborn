var constants={},CORDOVA=!1,LOG_CONSOLE=!0,LOG_OBJECT_STORAGE=!1;var primitives={};Object.prototype.clone=function(){return $.extend({},this)};String.prototype.contains=function(a,b){if(!a)return!1;var c=this,d=a.toString();b&&(c=c.toLowerCase(),d=d.toLowerCase());return-1!==c.indexOf(d)};Array.prototype.clear=function(){this.splice(0,this.length)};var nu={version:0.1};nu.PageEventsManager=Object.subClass({init:function(){this.pageHandlers={};this.previousPageHandler=this.currentPageHandler=null;this.bindPageEvents()},bindPageEvents:function(){$(document).on("pagebeforecreate","[data-role=page]",this.pageBeforeCreate);$(document).on("pageinit","[data-role=page]",this.pageInit);$(document).on("pagecreate","[data-role=page]",this.pageCreate);$(document).on("pagebeforechange","[data-role=page]",this.pageBeforeChange);$(document).on("pagechange","[data-role=page]",
this.pageChange);$(document).on("pagebeforeload","[data-role=page]",this.pageBeforeLoad);$(document).on("pageload","[data-role=page]",this.pageLoad);$(document).on("pagebeforehide","[data-role=page]",this.pageBeforeHide);$(document).on("pagebeforeshow","[data-role=page]",this.pageBeforeShow);$(document).on("pageremove","[data-role=page]",this.pageRemove);$(document).on("pagehide","[data-role=page]",this.pageHide);$(document).on("pageshow","[data-role=page]",this.pageShow)},unbindPageEvent:function(){$(document).off("pagebeforecreate");
$(document).off("pageinit");$(document).off("pagecreate");$(document).off("pagebeforechange");$(document).off("pagebeforeload");$(document).off("pagebeforehide");$(document).off("pagebeforeshow");$(document).off("pageremove");$(document).off("pagehide");$(document).off("pageshow")},registerPageHandler:function(a){this.pageHandlers[a.settings.ID]=a},getPageHandler:function(a){var b=this.pageHandlers[a];b||console.log("-- Warning : no page handler for page '"+a+"' !");return b},getPageHandlerFromEvent:function(a){return this.getPageHandler(a.currentTarget.id)},
pageBeforeCreate:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&(this.previousPageHandler=this.currentPageHandler,this.currentPageHandler=c,c.pageBeforeCreate(a,b))},pageInit:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&c.pageInit(a,b)},pageCreate:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&c.pageCreate(a,b)},pageHide:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&c.pageHide(a,b)},pageRemove:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&c.pageRemove(a,
b)},pageBeforeShow:function(a,b){var c=this.getPageHandlerFromEvent(a);if(c){var d=$.mobile.path.parseUrl(page.baseURI);d.search&&(b.options||(b.options={}),b.options.dataUrl||(b.options.dataUrl=d.hrefNoSearch),b.options.pageData=$.it.toolbox.getUrlParams(d.search));c.pageBeforeShow(a,b)}},pageBeforeChange:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&c.pageBeforeChange(a,b)},pageChange:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&c.pageChange(a,b)},pageBeforeLoad:function(a,b){var c=
this.getPageHandlerFromEvent(a);c&&c.pageBeforeLoad(a,b)},pageLoad:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&c.pageLoad(a,b)},pageShow:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&c.pageShow(a,b)},pageBeforeHide:function(a,b){var c=this.getPageHandlerFromEvent(a);c&&c.pageBeforeHide(a,b)}});nu.pageEventsManager=new nu.PageEventsManager;nu.PageHandler=Object.subClass({init:function(a){this.settings=$.extend(!0,{},a);this.html={};this.data={};nu.pagesManager.registerPageHandler(this)},pageBeforeCreate:function(a,b){this.html.page=$(a.currentTarget)},pageInit:function(a,b){console.log("page init of "+a.currentTarget.id);this.createHtmlElements();this.createDataElements()},pageCreate:function(a,b){console.log("page create of '"+a.currentTarget.id+"'")},pageBeforeHide:function(a,b){console.log("page before hide of '"+a.currentTarget.id+
"'")},pageHide:function(a,b){console.log("page hide of '"+a.currentTarget.id+"'")},pageBeforeShow:function(a,b){console.log("page before show of '"+a.currentTarget.id+"'")},pageShow:function(a,b){console.log("page show of '"+a.currentTarget.id+"'")},pageBeforeChange:function(a,b){console.log("page before change of '"+a.currentTarget.id+"'")},pageChange:function(a,b){console.log("page change of '"+a.currentTarget.id+"'")},pageBeforeLoad:function(a,b){console.log("page before load of '"+a.currentTarget.id+
"'")},pageLoad:function(a,b){console.log("page load of '"+a.currentTarget.id+"'")},pageRemove:function(a,b){console.log("page remove of '"+a.currentTarget.id+"'");this.deleteHtmlElements();this.deleteDataElements()},deleteHtmlElements:function(){if(this.html)for(var a in this.html)delete this.html[a]},deleteDataElements:function(){if(this.data)for(var a in this.data)delete this.data[a]}});nu.Storage={};nu.Storage.set=function(a,b){var c=JSON.stringify(b);localStorage.setItem(a,c)};nu.Storage.get=function(a){if(a=localStorage.getItem(a)){var b=null;try{b=JSON.parse(a)}catch(c){b=a}return b}return null};nu.Log={};nu.Log.log=function(a,b){if(a){var c=a.toString(),d=null,e=c;switch(b){case nu.Log.Level.ERROR:e=Error(c).stack;d="error";break;case nu.Log.Level.WARN:d="warn";break;default:b=nu.Log.Level.INFO,d="info"}if(LOG_LEVEL===nu.Log.Level.ALL||LOG_LEVEL.contains(b))console[d](c),LOG_STORAGE&&(c=nu.Log.get(),c[b].push(e+" -- "+(new Date).toLocaleString()),nu.Log.set(c))}else nu.Log.e("nu.Log called without parameter")};nu.Log.info=function(a){nu.Log.log(a,nu.Log.Level.INFO)};nu.Log.i=nu.Log.info;
nu.Log.error=function(a){nu.Log.log(a,nu.Log.Level.ERROR)};nu.Log.e=nu.Log.error;nu.Log.warn=function(a){nu.Log.log(a,nu.Log.Level.WARN)};nu.Log.w=nu.Log.warn;nu.Log.get=function(){var a=nu.Storage.get(nu.Log.STORAGE_KEY);a||(a={},a[nu.Log.Level.INFO]=[],a[nu.Log.Level.ERROR]=[],a[nu.Log.Level.WARN]=[],nu.Log.set(a));return a};nu.Log.set=function(a){nu.Storage.set(nu.Log.STORAGE_KEY,a)};
nu.Log.list=function(a){if(a===nu.Log.Level.INFO||a===nu.Log.Level.ERROR||a===nu.Log.Level.WARN){var b=nu.Log.get()[a];if(0===b.length)console.log("There is no logs with type"+a);else{console.log("List of logs with type "+a+" :");for(var c=0,d=b.length;c<d;c++)console.log("    * "+b[c]);console.log("End of logs with type "+a)}}else nu.Log.list(nu.Log.Level.INFO),nu.Log.list(nu.Log.Level.WARN),nu.Log.list(nu.Log.Level.ERROR)};
nu.Log.clear=function(a){var b=nu.Log.get();a===nu.Log.Level.INFO||a===nu.Log.Level.ERROR||a===nu.Log.Level.WARN?b[a]=[]:(b[nu.Log.Level.INFO]=[],b[nu.Log.Level.WARN]=[],b[nu.Log.Level.ERROR]=[]);nu.Log.set(b)};nu.Log.STORAGE_KEY="nuborn.log";nu.Log.Level={ALL:"ALL",INFO:"INFO",ERROR:"ERROR",WARN:"WARN"};nu.Utils={};nu.isNetworkAvailable=function(){return CORDOVA?navigator.connection.type!==Connection.NONE:navigator.onLine};nu.isAndroid=function(){return CORDOVA?"Android"===device.platform:navigator.userAgent.match("Android")};nu.isIOS=function(){return CORDOVA?"iOS"===device.platform:navigator.userAgent.match(/(iPhone|iPod|iPad)/i)};nu.isOldAndroid=function(){return!nu.Utils.isAndroid()?!1:4>nu.Utils.getOSVersion()};nu.isOldIOS=function(){return!nu.Utils.isIOS()?!1:5>nu.Utils.getOSVersion()};
nu.getOSVersion=function(){if(CORDOVA)return parseFloat(device.version,10);var a=navigator.userAgent;if(nu.Utils.isIOS()){var b=a.indexOf("OS")+2,a=a.slice(b),b=-1===a.indexOf(")")?0:a.indexOf(")"),a=a.substring(0,b),a=a.replace(/_/g,".");return a=parseFloat(a)}return nu.Utils.isAndroid()?(b=a.indexOf("Android")+7,a=a.slice(b),b=-1===a.indexOf(";")?0:a.indexOf(";"),a=a.substring(0,b),a=parseInt(a)):NaN};nu.loadLazyLib=function(a){$.ajax({url:"js/lazy/"+a,dataType:"script",async:!1})};
if(!JSON||!JSON.stringify||!JSON.parse)nu.loadLazyLib("jquery.json-2.4.min.js"),JSON={},JSON.stringify=$.toJSON||function(a){nu.Log.e("JSON.stringify could not be loaded : returning empty string !");return a instanceof Object?"{}":a instanceof Array?"[]":""},JSON.parse=$.evalJSON||function(a){nu.Log.e("JSON.parse could not be loaded : returning empty object !");return{}};nu.SplashScreen=Object.subClass({init:function(a){this.settings=a||{};this.settings.id||(this.settings.id=nu.SplashScreen.DEFAULT_ID);this.settings.url?this.initWithUrl():this.initWithId()},initWithId:function(){var a=$("<div>");a.prop("id",this.settings.id);a.addClass("fullscreen");this.element=a},initWithUrl:function(){var a=$.ajax({async:!1,url:this.settings.url});a.done(function(a){a=$(a);var c=a.prop("id");""!==c&&(this.settings.id=c);a.addClass("fullscreen");this.element=a});a.fail(function(){this.initWithId()})},
show:function(a){var b=$("#"+this.settings.id);0<b.length&&b.remove();b=this.element;b.hide();$("body").append(b);b.fadeIn(a?400:0)},hide:function(a){var b=this.element;b.fadeOut(a?400:0,function(){b.remove()})}});nu.SplashScreen.DEFAULT_ID="splashscreen";
