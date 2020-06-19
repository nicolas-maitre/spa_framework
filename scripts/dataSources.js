"use strict";
function DataSources(){
	this.allData = async function(){
		return [{id: 1, name: "Paul"}, {id: 2, name: "André"}, {id: 3, name: "Xavier"}];
		// return await apiManager.getData("data");
	}
}