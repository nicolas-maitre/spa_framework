"use strict";
function DataSources(){
	//get
	/**
	 * get all quizz availible
	 * @returns {array} 
	 */
	this.allAvailibleQuizzes = async function(){
		return apiManager.getDatas("quizzes");
	};
	/**
	 * get all quizzes
	 * @returns {array}
	 */
	this.allQuizzes = async function(){
		var res = await apiManager.call("quizzes");
		return res.ok ? res.data : [];//return only if data
	};
	/**
	 * get 1 quizz
	 * @param {string} id id of quizz
	 * @return {array}
	 */
	this.quizz = async function({id}){
		console.log("getQuizzData", {id})
		return apiManager.getData("quizzes", id)
	}

}