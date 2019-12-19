"use strict";
function DataSources(){
	this.allActiveQuizzes = async function(){
		var quizzes = await apiManager.getData("quizzes");

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
		return await apiManager.getData("quizzes");
	};
	this.quizz = async function({id}){
		return await apiManager.getData(`quizzes/${id}`);
	};
	this.questionsForQuizz = async function({quizzId}){
		var questions = await apiManager.getData(`quizzes/${quizzId}/questions`);
		//sort by desc date
		questions.sort(function(question1, question2){
			return (question1.order > question2.order)?1:-1;
		});
		return questions;
	};
	this.submissionWithAnswers = async function({submissionId}){
		return await apiManager.getData(`submission/${submissionId}`);
	};
	this.submissionsWithAnswers = async function({quizzId}){
		return await apiManager.getData(`quizz/${quizzId}/submisions/`);
	}
}