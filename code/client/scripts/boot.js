var globalMemory = {};

//instanciate managers
var pagesManager = new PagesManager();
var builder = new Builder();

//init
pagesManager.preloadViews();
pagesManager.changePage("home");

console.log("init completed");