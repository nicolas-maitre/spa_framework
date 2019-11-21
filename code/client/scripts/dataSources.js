"use strict";
function DataSources(){
	this.allAvailibleQuizzes = async function(){
		var res = await apiManager.call("quizzes");
		return res.ok ? res.data : [];//return only if data
	};
	this.allQuizzes = async function(){
		var res = await apiManager.call("quizzes");
		return res.ok ? res.data : [];//return only if data
	};
}