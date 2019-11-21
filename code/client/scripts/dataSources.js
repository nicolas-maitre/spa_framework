"use strict";
function DataSources(){
	//get
	/**
	 * get all quizz availible
	 */
	this.allAvailibleQuizzes = async function(){
		var res = await apiManager.call("quizzes");
		return res.ok ? res.data : [];//return only if data
	};
	/**
	 * get all quizzes
	 */
	this.allQuizzes = async function(){
		var res = await apiManager.call("quizzes");
		return res.ok ? res.data : [];//return only if data
	};
	/**
	 * get 1 quizz
	 */
	this.quizz = async function(id){
		var res = await apiManager.call("quizzes/"+id);
		return res.ok ? res.data : [];//return only if data
	}
	//post
	/**
	 * create quizz
	 * @param {object{name: "", description: ""}} data 
	 */
	this.addQuizz = async function(data){
		var options = {
			method: "POST",
			bodyParams: data
		}
		var res = await apiManager.call("quizzes", options);
		return res.ok ? res.data : [];//return only if data
	}
	/**
	 * 
	 * @param {int} id id of quizz to add questions
	 * @param {object{title: "", type:""}} data
	 */
	this.addQuestion = async function(id, data){
		var options = {
			method: "POST",
			bodyParams: data
		}
		var res = await apiManager.call("questions/"+id, options);
		return res.ok ? res.data : [];//return only if data
	}
	//put
	this.updateQuizz = async function(id, data){
		var options = {
			method: "PUT",
			bodyParams: data
		}
		var res = await apiManager.call("quizzes/"+id, options);
		return res.ok ? res.data : [];//return only if data
	}
	this.updateQuestion = async function(id, data){
		var options = {
			method: "PUT",
			bodyParams: data
		}
		var res = await apiManager.call("questions/"+id, options);
		return res.ok ? res.data : [];//return only if data
	}
	//delete

}