//constants


//memory
var globalMemory = {};
var elements = {};

//core
var pagesManager = new PagesManager();
var apiManager = new ApiManager();
var websocket = new WebsocketManager();
var builder = new Builder();
var adaptersManager = new AdaptersManager();
//user
var actions = new Actions();
var dataSources = new DataSources();
adaptersRegistration();

document.addEventListener("DOMContentLoaded", function(domEvt){
	actions.onBeforeBoot();
	
	//elements
	elements.pagesContainer = document.querySelector(config.pagesContainerSelector);
	elements.globalLoader = false;
	
	//manage landing page
	pagesManager.manageLanding();
	
	//load views
	if(config.preloadAllViews){
		pagesManager.preloadViews();
	}
	//preload css
	if(config.preloadAllCSS){
		pagesManager.preloadCSS();
	}

	//popstate event for history manipulation
	window.addEventListener("popstate", pagesManager.managePopState);

	actions.onAfterBoot();

	console.log("init complete");
});