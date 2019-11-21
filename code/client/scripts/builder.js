function Builder(){
    var _this = this;
    this.prebuildPage = function(){
        
    }
	
	this.applyDataAdapters = function(pageName){
		if(!pagesConfig[pageName] || !pagesConfig[pageName].data){
			return;
		}
		var allDataConfigs = pagesConfig[pageName].data;
		for(var indDataConfig = 0; indDataConfig < allDataConfigs.length; indDataConfig++){
			_this.applyDataAdapter(allDataConfigs[indDataConfig], `.${pageName}PageContainer`);
		}
	};
	
	this.applyDataAdapter = function(dataConfig, parentSelector = "body"){
		//test for data source
		if(!dataSources[dataConfig.source]){
			console.warn(`data source ${dataConfig.source} doesn't exist`);
			return;
		}
		var dataSource = dataSources[dataConfig.source];
		
		//test for adapter
		if(!_this.adapters[dataConfig.adapter]){
			console.warn(`data adapter ${dataConfig.adapter} doesn't exist`);
			return;
		}
		var adapter = _this.adapters[dataConfig.adapter];
		
		//get container (inside page container)
		var adaptersContainer = document.querySelector(`${parentSelector} ${dataConfig.container}`);
		if(!adaptersContainer){
			console.warn(`data container for ${dataConfig.container} selector, doesn't exist`);
			return;
		}
		//remove all content from container
		while(adaptersContainer.firstChild) {
			adaptersContainer.removeChild(adaptersContainer.firstChild);
		}
		//show loader
		var contentLoader = _this.addContentLoader(adaptersContainer);
		
		//get data
		dataSource()
		.then(function(data){
			//hide loader
			contentLoader.remove();
			
			//loop over data
			for(var indData = 0; indData < data.length; indData++){
				//display adapter
				adapter(adaptersContainer, data[indData]);
			}
			
			//apply links
			utils.setDynamicLinks(adaptersContainer);
		});
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
		droped.draggable = true;
		`
		<div class="droped" draggable="true">
			<div class="quizzListInfos">
				<div class="titreQuizz" style="display: inline">
					<div class="questionTitle">la conditions IF ?1</div>
				</div>
				<div class="dateQuizz" style="display: inline"> 
				</div>
				<div class="DescriptionQuizz">
					<div class="questionTitle">Tous savoir sur la conditions IF</div>
					<div class="questionAnswerContainer">
						<div class="dateQuizz" style="display: inline"></div>
					</div>
				</div>
			</div>
			<div class="quizzListActions">
				<div class="imgEdit"></div>
				<div class="imgTrash"></div>
			</div>
		</div>`
		//data
		quizzTitle.innerText = data.name;
		quizzDate.innerText = data.datecreation;
		quizzDescr.innerText = data.description;
		link.setAttribute("href", `/quizz/${data.id}`);
	}
	
	//other
	this.addContentLoader = function(container, className = ""){
		var elem = container.addElement("div", `contentLoader ${className}`);
		return {
			element: elem,
			remove: function(){elem.remove()}
		};
	};
} 