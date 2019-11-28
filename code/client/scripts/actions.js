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
        //add dragondrop on the page
        dragAndDropManage.buildDragAndDrop("quizzList", "droped", function(elem){
            //TODO to update status
            console.log(elem);
        });
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
        var dragAndDropManage = new DragAndDrop();
        //show loaders
        var container1 = document.querySelectorAll(".quizzList")[0];
        var container2 = document.querySelectorAll(".quizzList")[1];
        var container3 = document.querySelectorAll(".quizzList")[2];
        var loader1 = builder.addContentLoader(container1);
        var loader2 = builder.addContentLoader(container2);
        var loader3 = builder.addContentLoader(container3);
        //load all quizzes
        dataSources.allQuizzes().then(function(datas){
            //hide loaders
            loader1.remove();
            loader2.remove();
            loader3.remove();

            //build adapters
            datas.forEach(quizz => {
                console.log(quizz);
                builder.adapters.quizzManage(container1, quizz);
            });

        });
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