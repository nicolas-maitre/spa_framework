function Actions(){
    var _this = this;
    this.onHeadButtonClick = function(evt){
        pagesManager.changePage(globalMemory.headButtonTarget);
    };

    //page actions on load
    this.onPageLoad = {};
    this.onPageLoad.error = function(){
        
    }

    //page actions on display
    this.onPageDisplay = {};
    this.onPageDisplay.error = function(){
        errorStatusCode.innerText = globalMemory.error.code;
        errorClientMsg.innerText = globalMemory.error.msg;
    }
    //action when mange page is displayed
    this.onPageDisplay.manage = function(){
        //add dragondrop on the page
        var dragAndDropManage = new DragAndDrop();
        dragAndDropManage.buildDragAndDrop("quizzQuestionsContainer", "droped");
        console.log("drag and drop added to manage");
    }
}