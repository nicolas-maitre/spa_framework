//const
DEV_PREVENT_HISTORY = true;

//memory
var globalMemory = {};

//instanciate managers
var pagesManager = new PagesManager();
var builder = new Builder();
var actions = new Actions();

//elements
var elements = {
    pagesContainer: document.getElementById("pagesContainer"),
    topMenuButton: document.getElementById("topMenuButton"),
    globalLoader: false
};

//other init (TO MOVE)
elements.topMenuButton.addEventListener("click", actions.onHeadButtonClick);

//init
var pageToShow = config.landingPage;
pagesManager.preloadViews(pageToShow);
pagesManager.changePage(pageToShow);



console.log("init completed");