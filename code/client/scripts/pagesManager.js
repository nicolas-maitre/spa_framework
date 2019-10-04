"use strict";
function PagesManager(){
    var _this = this;
    this.pages = {};
    this.currentPage = false;
    var viewsCache = {};
    this.changePage = function(pageName, pushToHistory){
        //page already displayed
        if(_this.currentPage == pageName){
            console.log("page already shown");
            return;
        }
        //page doesnt exist
        if(!pagesConfig.pageName){
            globalMemory.error = {
                code: "404",
                msg: "Page not found"
            }
            //_this.changePage("error");
            return;
        }
        
        if(!_this.pages[pageName]){
            //page not yet built
            _this.loadView(pageName, function(error){

            });
        }
        //load view

        //display page
    }
    this.preloadViews = function(){
        for(var viewName in pagesConfig){
            _this.loadView(viewName, function(error, result){});
        }
    }
    this.loadView = function(view, callBack){
        //get view name
        var viewName = view;
        if(pagesConfig[view].view){
            viewName = pagesConfig[view].view;
        }
        //check load state
        if(!viewsCache[viewName]){
            viewsCache[viewName] = {
                isLoading: false,
                isLoaded: false,
                onload: [],
                htmlString: false                
            }
        }
        if(viewsCache[viewName].isLoaded){
            console("page already loaded");
            callBack(false, {msg: "page already loaded"});
            return;
        }
        if(viewsCache[viewName].isLoading){
            console.log("page already loading");
            viewsCache[viewName].onload.push(callBack);
            return;
        }

        //load
        viewsCache[viewName].isLoading = true;
        var url = config.viewsLocation + "/" + viewName;
        fetch(url)
        .then(function(response){
            return response.text();
        })
        .then(function(textData){
            viewsCache[viewName].htmlString = textData;
            viewsCache[viewName].isLoaded = true;
            viewsCache[viewName].isLoading = false;
            //onload event
            for(var indEvt = 0; indEvt < viewsCache[viewName].onload.length; indEvt++){
                viewsCache[viewName].onload[indEvt](false);
            }
        });
    }
}