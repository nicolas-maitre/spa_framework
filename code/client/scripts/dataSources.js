"use strict";
function DataSources(){
	this.allActiveQuizzes = async function(){
		var quizzes = await apiManager.getDatas("quizzes");

		//only add active quizzes
		var filteredQuizzes = [];
		for(var indQuiz = 0; indQuiz < quizzes.length; indQuiz++){
			if(quizzes[indQuiz].status == "active"){
				filteredQuizzes.push(quizzes[indQuiz]);
			}
		}

		//sort by desc date
		filteredQuizzes.sort(function(quizz1, quizz2){
			var date1 = new Date(quizz1.datecreation);
			var date2 = new Date(quizz2.datecreation);
			return (date1 > date2)?1:-1;
		});

		return filteredQuizzes;
	};
	this.allQuizzes = async function(){
		var res = await apiManager.call("quizzes");
		return res.ok ? res.data : [];//return only if data
	};
	this.quizz = async function({id}){
		return apiManager.getData("quizzes", id)
	};
	this.questionsForQuizz = async function({quizzId}){
		var questions = await apiManager.getDatas(`quizzes/${quizzId}/questions`);
		//sort by desc date
		questions.sort(function(question1, question2){
			return (question1.order > question2.order)?1:-1;
		});
		return questions;
	};
	this.submissionWithAnswers = async function(){
		return ["jeje"];
	};
}