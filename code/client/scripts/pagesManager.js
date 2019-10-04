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
        if(!pagesConfig[pageName]){
            globalMemory.error = {
                code: "404",
                msg: "Page not found"
            }
            //
            _this.changePage("error");
            return;
        }

        //page not built
        if(!_this.pages[pageName]){
            _this.pages[pageName] = {
                isLoaded: false,
                container: false
            };
            //build container
            _this.pages[pageName].container = elements.pagesContainer.addElement('div', 'pageContainer ' + pageName + 'PageContainer none');
        }

        //display page
        if(_this.currentPage){
            _this.pages[_this.currentPage].container.classList.add('none');
        }
        _this.pages[pageName].container.classList.remove('none');
        _this.currentPage = pageName;

        //page not loaded -> load page
        if(!_this.pages[pageName].isLoaded){
             //show loader
             utils.getGlobalLoader().show();
             //load view
             _this.loadView(pageName, function(error, view){
                 utils.getGlobalLoader().hide();
                 if(error){
                     console.log("view couldn't be loaded.", error);
                     utils.infoBox("Une erreur s'est produite durant le chargement de la page");
                     return;
                 }
                 console.log("view loaded", view);
                 //view ref
                 _this.pages[pageName].view = view;
                 //set content
                 _this.pages[pageName].container.innerHTML = view.htmlString;
                 //loaded
                 _this.pages[pageName].isLoaded = true;
             });
        }
    }
    this.preloadViews = function(){
        for(var viewName in pagesConfig){
            _this.loadView(viewName, function(error, result){});
        }
    }
    this.loadView = function(view, callBack){
        console.log("loadView", view);
        //get view name from page name
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
            callBack(false, viewsCache[viewName].htmlString);
            return;
        }
        viewsCache[viewName].onload.push(callBack);
        if(viewsCache[viewName].isLoading){
            console.log("page already loading");
            return;
        }
        console.log("downloading " + viewName + " view");
        //load
        viewsCache[viewName].isLoading = true;
        var url = config.viewsLocation + "/" + viewName + ".html";
        
        fetch(url).then(function(response){
            viewsCache[viewName].isLoading = false;
            var error = false, result = false;
            if(!response.ok){
                console.log("view download failed", response);
                error = {clientMsg:"view download failed"};
            } else {
                response.text().then(function(textData){
                    viewsCache[viewName].htmlString = textData;
                    viewsCache[viewName].isLoaded = true;
                    console.log("view downloaded", viewName, viewsCache[viewName]);
                    result = viewsCache[viewName];
                });
            }
            //onload event
            for(var indEvt = 0; indEvt < viewsCache[viewName].onload.length; indEvt++){
                viewsCache[viewName].onload[indEvt](error, result);
            }
            //viewsCache[viewName].onload = [];
        });
    };
}