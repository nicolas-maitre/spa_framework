"use strict";
function PagesManager(){
    var _this = this;
    this.pages = {};
    this.currentPage = false;
    var viewsCache = {};
    this.changePage = function(pageName, {pushToHistory=true, query=false, path=false} = {}){
		/*
			pageName string
			options{
				pushToHistory bool (true)
				query{
					paramName:value
                }
                path array of name
			}
		*/
        console.log("change page to " + pageName, arguments[1]);
		
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
		
		//page config
		var pageConfig = pagesConfig[pageName];

        //page not built
        if(!_this.pages[pageName]){
            _this.pages[pageName] = {
                isLoaded: false,
                container: false
            };
            //build container
            _this.pages[pageName].container = elements.pagesContainer.addElement('div', `pageContainer ${pageName}PageContainer none`);
        }

        //display page
        if(_this.currentPage){
            _this.pages[_this.currentPage].container.classList.add('none');
        }
        _this.pages[pageName].container.classList.remove('none');
        _this.currentPage = pageName;

		//query
		var queryUrl = "";
		if(query){
			queryUrl = "?" + utils.encodeQuery(query);	
			console.log("queryUrl", queryUrl);
		}
        
        //path
        var pathUrl = `/${pageName}`;
        if(path){
            for(var indPath=0; indPath < path.length; indPath++){
                queryUrl += `/${path[indPath]}`
            }
        }
        
		//title
		var documentTitle = config.pageTitlePrefix + (pageConfig.title || pageName);
        document.title = documentTitle;
		
        //push to history
        if(!DEV_PREVENT_HISTORY){
            var stateSaveObject = {pageName, query, path}
            if(pushToHistory){
                history.pushState(stateSaveObject, documentTitle, pathUrl + queryUrl);
            } else {
                history.replaceState(stateSaveObject, documentTitle, pathUrl + queryUrl);
            }
        }

        //any page display action
        actions.onAnyPageDisplay({pageName, pageConfig});

        //already loaded
        if(this.pages[pageName].isLoaded){
			if(pageConfig.refreshDataOnDisplay){ //reload data
				builder.applyDataAdapters(pageName);
			}
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
			//add dynamic links
			utils.setDynamicLinks(_this.pages[pageName].container);
			//apply data adapters / show data
			builder.applyDataAdapters(pageName);
            //evt
            if(actions.onPageLoad[pageName]){
                actions.onPageLoad[pageName]();
            }
            if(actions.onPageDisplay[pageName]){
                actions.onPageDisplay[pageName]();
            }
        });
    }

    this.manageLanding = function(){
        var pageToShow = config.landingPage;
        var pageOptions = {};
        pageOptions.pushToHistory = false;

        if(window.location.pathname != "/"){
            var fullPathArray = window.location.pathname.split("/");

            //page to show
            pageToShow = fullPathArray[1]; //only gets fist path entry, so the page name

            //path
            pageOptions.path = fullPathArray.slice(2); //only get the path after the page name
        }

        //search
        if(window.location.search){
            pageOptions.query = utils.decodeQuery(window.location.search);
        }

        //display page
        pagesManager.changePage(pageToShow, pageOptions);
    };
    this.managePopState = function(evt){
        console.log("pop", evt);
        if(!evt.state || !evt.state.pageName){
            console.log("no pop state defined");
            return;
        }
        var pageOptions = evt.state;
        pageOptions.pushToHistory = false;
        pagesManager.changePage(evt.state.pageName, pageOptions);		
    }

    this.refreshCurrentPage = function(){
		builder.applyDataAdapters(_this.currentPage);
	};
	this.preloadViews = async function(priority = false){
        //load priority view
        if(priority){ 
            await new Promise(resolve => {
                _this.loadView(priority, resolve)
            });
        }
        //load other views
        for(var viewName in pagesConfig){
            _this.loadView(viewName, function(){});
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
                console.log("view downloaded", viewName);

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