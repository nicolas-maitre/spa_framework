function Actions(){
    var _this = this;
    this.onHeadButtonClick = function(evt){
        pagesManager.changePage(globalMemory.headButtonTarget);
    };

    //page actions on load
    this.onPageLoad = {};
    this.onPageLoad.error = function(){
        
    }
    this.onPageLoad.manage = function(){
        //add dragondrop on the page
        var dragAndDropManage = new DragAndDrop();
        dragAndDropManage.buildDragAndDrop("quizzList", "droped");
        console.log("drag and drop added to manage");
    }
	this.onPageLoad.home = function(){
		var refreshButton = document.querySelector(".homePageContainer .questionAnswerContainerSearch .refreshButton");
		refreshButton.addEventListener("click", pagesManager.refreshCurrentPage);
	}

    //page actions on display
    this.onPageDisplay = {};
    this.onPageDisplay.error = function(){
        errorStatusCode.innerText = globalMemory.error.code;
        errorClientMsg.innerText = globalMemory.error.msg;
    }
    
}