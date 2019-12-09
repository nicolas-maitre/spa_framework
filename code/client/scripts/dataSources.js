"use strict";
function DataSources(){
	this.allAvailibleQuizzes = async function(){
		return apiManager.getDatas("quizzes");
	};
	this.allQuizzes = async function(){
		var res = await apiManager.call("quizzes");
		return res.ok ? res.data : [];//return only if data
	};
	this.quizz = async function({id}){
		return apiManager.getData("quizzes", id)
	};
	this.questionsForQuizz = async function({quizzId}){
		return apiManager.getDatas(`quizzes/${quizzId}/questions`);
	};
}