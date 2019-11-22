"use strict";
function DataSources(){
	//get
	/**
	 * get all quizz availible
	 * @returns {array} 
	 */
	this.allAvailibleQuizzes = async function(){
		var res = await apiManager.call("quizzes");
		return res.ok ? res.data : [];//return only if data
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
	this.quizz = async function(id){
		return apiManager.getData("quizzes", id)
	}

}