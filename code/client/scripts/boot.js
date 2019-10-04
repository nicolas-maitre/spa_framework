var globalMemory = {};

//instanciate managers
var pagesManager = new PagesManager();
var builder = new Builder();

//elements
var elements = {
    pagesContainer: document.getElementById("pagesContainer"),
    globalLoader: false
};

//init
pagesManager.preloadViews();
pagesManager.changePage("home");

console.log("init completed");