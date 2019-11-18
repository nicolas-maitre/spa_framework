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

document.addEventListener("DOMContentLoaded", function(domEvt){
	//elements
	elements.pagesContainer = document.getElementById("pagesContainer");
	elements.topMenuButton = document.getElementById("topMenuButton");
	elements.globalLoader = false;

	//other init (TO MOVE)
	elements.topMenuButton.addEventListener("click", actions.onHeadButtonClick);
	//load dataClasses
	DataClass.initClasses();
	
	//manage landing page
	var pageToShow = config.landingPage;
	if(window.location.pathname != "/"){
		pageToShow = window.location.pathname.split("/")[1];
	}
	pageQuery = false;
	if(window.location.search){
		pageQuery = utils.decodeQuery(window.location.search);
	}
	//load views
	pagesManager.preloadViews(pageToShow);
	//display page
	pagesManager.changePage(pageToShow, {query: pageQuery});
	//popstate
	window.addEventListener("popstate",function(evt){
		console.log("pop", evt);
		if(evt.state && evt.state.pageName){
			var popQuery = false;
			if(evt.state.query){
				popQuery = evt.state.query;
			}
			pagesManager.changePage(evt.state.pageName, {pushToHistory:false, query: popQuery});
			return;
		}
		console.log("no pop state defined");
	});
	console.log("init completed");
});