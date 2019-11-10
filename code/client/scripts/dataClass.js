function DataClass(){
	
}
//_static methods
DataClass.initClasses = function(){
	for(var indDC = 0; indDC < config.dataClasses; indDC++){
		var DCName = config.dataClasses[indDC];
		initiateDataClass(DCName);
	}
}
DataClass.initClass(name){
	var DCName = name.capitalise();
	//test for overwrite
	if(window[DCName]){
		throw new Error("dataClass " + name + "is not availible");
		return;
	}
	
	//create class with the right name
	window[DCName] = function(){}
	currentClass = window[DCName];
	//modify prototype

}