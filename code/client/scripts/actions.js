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
        document.getElementById("errorStatusCode").innerText = globalMemory.error.code;
        document.getElementById("errorClientMsg").innerText = globalMemory.error.msg;
    }
}