//const
DEV_PREVENT_HISTORY = false;

//memory
var globalMemory = {};
var elements = {};

//instanciate managers
var pagesManager = new PagesManager();
var apiManager = new ApiManager();
var builder = new Builder();
var actions = new Actions();
var dataSources = new DataSources();

document.addEventListener("DOMContentLoaded", function(domEvt){
	//elements
	elements.pagesContainer = document.getElementById("pagesContainer");
	elements.topMenuButton = document.getElementById("topMenuButton");
	elements.globalLoader = false;

	//other init (TO MOVE)
	elements.topMenuButton.addEventListener("click", actions.onHeadButtonClick);
	document.querySelector(".pizza").addEventListener("click", function(ev){
		pagesManager.changePage("home");
	});
	
	//manage landing page
	var landingRes = pagesManager.manageLanding();
	
	//load views
	pagesManager.preloadViews();

	//popstate
	window.addEventListener("popstate", pagesManager.managePopState);
	console.log("init completed");
});