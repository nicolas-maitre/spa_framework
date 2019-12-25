function Builder(){
    var _this = this;
	
	this.applyDataAdapter = function({container, adapter, data, contentLoader}){
		//hide loader
		contentLoader.remove();
		
		if(!data[0]){ //no data
			_this.adapters.noData(container);
			return;
		};

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
	this.adapters.myDataAdapter = function(container, data){
		//elems
		var elem = container.addElement("p");

		//data
		elem.innerText = data.text;

		return elem;
	}
	
	//adapter for when there is no data to display.
	this.adapters.noData = function(container, data){
		var box = container.addElement("div", "noDataContainer");
		var text = box.addElement("p");
		text.innerText = config.messageNoData;
		return box;
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