function Adapters(){
    this.myTestAdapter = registerAdapter("my_test_adapter");
    
	//adapter for when there is no data to display.
	this.noData = function(container, data){
		var box = container.addElement("div", "noDataContainer");
		var text = box.addElement("p");
		text.innerText = config.messageNoData;
		return box;
	};
}
var adapters = {};
