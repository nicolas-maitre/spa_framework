function Actions(){
    var _this = this;
    this.onHeadButtonClick = function(evt){
        pagesManager.changePage(globalMemory.headButtonTarget);
    };
    //-------------------------------------------------------------------------------------
    //page actions on load
    //-------------------------------------------------------------------------------------
    this.onPageLoad = {};
    this.onPageLoad.error = function(){
        
    }
	this.onPageLoad.home = function(){
        var refreshButton = document.querySelector(".homePageContainer .questionAnswerContainerSearch .refreshButton");
		refreshButton.addEventListener("click", pagesManager.refreshCurrentPage);
    }
    this.onPageLoad.manage = function(){
        //add drop on the page
        globalMemory.dragAndDropManage = new DragAndDrop();
        globalMemory.dragAndDropManage.addDrop("quizzList");
        console.log("drag and drop added to manage");   
    }
    //-------------------------------------------------------------------------------------
    //page actions on display
    //-------------------------------------------------------------------------------------
    this.onPageDisplay = {};
    this.onPageDisplay.error = function(){
        errorStatusCode.innerText = globalMemory.error.code;
        errorClientMsg.innerText = globalMemory.error.msg;
    }
    this.onPageDisplay.manage = function(){
        //show loaders        
        listQuizzesBuild.removeChilds(".droped");
        listQuizzesActive.removeChilds(".droped");
        listQuizzesClos.removeChilds(".droped");

        var loaderQuizzesBuild = builder.addContentLoader(listQuizzesBuild);
        var loaderQuizzesActive = builder.addContentLoader(listQuizzesActive);
        var loaderQuizzesClos = builder.addContentLoader(listQuizzesClos);
        //load all quizzes
        dataSources.allQuizzes().then(function(datas){
            //hide loaders
            loaderQuizzesBuild.remove();
            loaderQuizzesActive.remove();
            loaderQuizzesClos.remove();
            
            //build adapters
            datas.forEach(quizz => {
                var list = document.getElementById("listQuizzes" + quizz.status.capitalise());
                builder.adapters.quizzManage(list, quizz);
            });
            //add drop possibility on quizz
            globalMemory.dragAndDropManage.addDrag("droped", function(elem){
                var url = `quiz/${elem.getAttribute("quizzid")}`;
                apiManager.updateData(url, {status: elem.parentElement.getAttribute("name")})
            });
        });
    }

    //-------------------------------------------------------------------------------------
    //page actions on data
    //-------------------------------------------------------------------------------------

    this.onPageData = {};
    this.onPageData.quizz = function(data, dataName){
            //console.log("onPageData quizz!", data, dataName);
        pagesManager.pages.quizz.container.querySelector(".quizzTitle").innerText = data[0].name;
    }

    //page action on any page display
    this.onAnyPageDisplay = function({pageName = false, pageConfig = false}){
        //button config
        if(pageConfig.headButton){
            elements.topMenuButton.innerText = pageConfig.headButton.text;
            globalMemory.headButtonTarget = pageConfig.headButton.target;
            elements.topMenuButton.classList.remove("none");
        }else{
            elements.topMenuButton.classList.add("none");
        }
    }
}