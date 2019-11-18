function Builder(){
    var _this = this;
    this.prebuildPage = function(){
        
    }
	
	//ADAPTERS
	this.adapters = {};
	this.homeQuizzAdapter = function(container, data){
		//elems
		var link = container.addElement("a", "linkQuizz");
		var innerContainer = link.addElement("div", "ContainerQuizz");
		var quizzTitle = innerContainer.addElement("div", "titreQuizz");
		var quizzDate = innerContainer.addElement("div", "dateQuizz");
		var quizzDescr = innerContainer.addElement("div", "DescriptionQuizz");
		//data
		quizzTitle.innerText = "test";
	}
} 