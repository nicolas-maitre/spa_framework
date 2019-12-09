function Builder(){
    var _this = this;
	
	this.applyDataAdapter = function({container, adapter, data, contentLoader}){
		//hide loader
		contentLoader.remove();
		
		//loop over data
		for(var indData = 0; indData < data.length; indData++){
			//display adapter
			adapter(container, data[indData]);
		}
		
		//apply links
		utils.setDynamicLinks(container);
	};
	
	//ADAPTERS
	this.adapters = {};
	this.adapters.quizzLine = function(container, data){
		//elems
		var link = container.addElement("a", "linkQuizz");
		var innerContainer = link.addElement("div", "ContainerQuizz");
		var quizzTitle = innerContainer.addElement("div", "titreQuizz");
		var quizzDate = innerContainer.addElement("div", "dateQuizz");
		var quizzDescr = innerContainer.addElement("div", "DescriptionQuizz");
		//data
		quizzTitle.innerText = data.name;
		quizzDate.innerText = data.datecreation;
		quizzDescr.innerText = data.description;
		link.setAttribute("href", `/quizz/${data.id}`);
	}
	this.adapters.quizzManage = function(container, data){
		//elems
		var droped = container.addElement("div", "droped");
		var quizzTitle = droped.addElement("p", "quizzListTitle");
		var quizzActions = droped.addElement("div", "quizzListActions");
		var quizzDate = droped.addElement("quizzListDate");

		droped.setAttribute('draggable',  true);

		//data
		quizzTitle.innerText = data.name;
		droped.setAttribute("quizzid", data.id);
		quizzDate.innerText = data.datecreation;

		//TODO use ?
		/*droped.addEventListener("click", function(event){
			pagesManager.changePage("quizz", {path:[data.id]});
		})*/

		return droped;
	};
	
	//other
	this.addContentLoader = function(container, className = ""){
		var elem = container.addElement("div", `contentLoader ${className}`);
		return {
			element: elem,
			remove: function(){elem.remove()}
		};
	};
} 