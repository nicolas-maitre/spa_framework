"use strict";
function PagesManager(){
    var _this = this;
    this.pages = {};
    this.currentPage = false;
    var viewsCache = {};
    this.changePage = function(pageName, pushToHistory = true){
        console.log("change page to " + pageName);
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

        //push to history
        if(pushToHistory && !DEV_PREVENT_HISTORY){
            history.pushState({pageName: pageName}, "kaphoot - " + pageName, "/" + pageName);
        }

        //title
        document.title = config.pageTitlePrefix + (pagesConfig[pageName].title || pageName);

        //button config (TO MOVE)
        if(pagesConfig[pageName].headButton){
            elements.topMenuButton.innerText = pagesConfig[pageName].headButton.text;
            globalMemory.headButtonTarget = pagesConfig[pageName].headButton.target;
            elements.topMenuButton.classList.remove("none");
        }else{
            elements.topMenuButton.classList.add("none");
        }

        //already loaded
        if(this.pages[pageName].isLoaded){
            if(actions.onPageDisplay[pageName]){
                actions.onPageDisplay[pageName]();
            }
            return;
        }

        //page not loaded -> load page
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
            //view ref
            _this.pages[pageName].view = view;
            //set content
            _this.pages[pageName].container.innerHTML = view.htmlString;
            //loaded
            _this.pages[pageName].isLoaded = true;
            //evt
            if(actions.onPageLoad[pageName]){
                actions.onPageLoad[pageName]();
            }
            if(actions.onPageDisplay[pageName]){
                actions.onPageDisplay[pageName]();
            }
        });

    }
    this.preloadViews = function(priority){
        _this.loadView(priority, function(){ //load priority view
            for(var viewName in pagesConfig){
                _this.loadView(viewName, function(){});//load other views
            }
        });
       
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
            console.log("page already loaded");
            callBack(false, viewsCache[viewName]);
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
        var url = config.viewsLocation + "/" + viewName + config.viewsExtension;
        
        fetch(url).then(function(response){
            viewsCache[viewName].isLoading = false;
            var error = false, result = false;
            if(!response.ok){
                console.log("view download failed", response);

                //onload event
                for(var indEvt = 0; indEvt < viewsCache[viewName].onload.length; indEvt++){
                    viewsCache[viewName].onload[indEvt]({clientMsg:"view download failed"});
                }
                viewsCache[viewName].onload = [];
                return;
            }
            response.text().then(function(textData){
                viewsCache[viewName].htmlString = textData;
                viewsCache[viewName].isLoaded = true;
                console.log("view downloaded", viewName, viewsCache[viewName]);

                //onload event
                for(var indEvt = 0; indEvt < viewsCache[viewName].onload.length; indEvt++){
                    viewsCache[viewName].onload[indEvt](false, viewsCache[viewName]);
                }
                viewsCache[viewName].onload = [];
                return;
            });
        });
    };
}