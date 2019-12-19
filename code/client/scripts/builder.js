function Builder(){
    var _this = this;
	
	this.applyDataAdapter = function({container, adapter, data, contentLoader}){
		//hide loader
		contentLoader.remove();
		
		//loop over data
		for(var indData = 0; indData < data.length; indData++){
			//display adapter
			adapter(container, data[indData]);
		}
		
		//apply links
		utils.setDynamicLinks(container);
	};
	
	//ADAPTERS
	this.adapters = {};
	this.adapters.quizzLine = function(container, data){
		//elems
		var link = container.addElement("a", "linkQuizz");
		var innerContainer = link.addElement("div", "ContainerQuizz");
		var quizzTitle = innerContainer.addElement("div", "titreQuizz");
		var quizzDate = innerContainer.addElement("div", "dateQuizz");
		var quizzDescr = innerContainer.addElement("div", "DescriptionQuizz");
		//data
		quizzTitle.innerText = data.name;
		quizzDate.innerText = data.datecreation;
		quizzDescr.innerText = data.description;
		link.setAttribute("href", `/quizz/${data.id}`);
	}
	this.adapters.quizzManage = function(container, data){
		//elems
		var droped = container.addElement("div", "droped");
		var quizzTitle = droped.addElement("p", "quizzListTitle");
		var quizzActions = droped.addElement("div", "quizzListActions");
		var quizzDate = droped.addElement("quizzListDate");

		//data
		quizzTitle.innerText = data.name;
		droped.setAttribute("quizzid", data.id);
		quizzDate.innerText = data.datecreation;

		return droped;
	};
	this.adapters.createQuestionsLine = function(container, data){
		//elements
		var question = container.addElement("div", "editQuestion");
		var label = question.addElement("div", "lblQuestion");
		var inputQuestion = question.addElement("input", "largeInput");
		var action = question.addElement("div", "actionEdit");
		var btnRemove = action.addElement("button", "");
		var grap = action.addElement("div", "imgGrap");
		//data
		label.innerText = "Enoncé";
		inputQuestion.type = "text";
		inputQuestion.value = data.statement;
		question.id = data.id;
		btnRemove.innerText = "Supprimer";
		//event
		btnRemove.addEventListener("click", function(event){
			event.preventDefault();
			apiManager.deleteData(`question/${question.id}`);
			question.remove();
		})
		inputQuestion.addEventListener("change", function(event){
			apiManager.updateData(`question/${question.id}`, {statement: inputQuestion.value});
		})
		globalMemory.dragAndDropEdit.addDrag("editQuestion", function(elem){
			document.getElementsByClassName("editQuestion").forEach(function(elem, index){
                apiManager.updateData(`question/${elem.id}`, {order:index});
            })
		});
	}
	this.adapters.questionInputLine = function(container, data){
		var questionsContainer = container.addElement("div", "quizzQuestion");
		var statement = questionsContainer.addElement("p", "questionTitle");
		var answerContainer = questionsContainer.addElement("div", "questionAnswerContainer");
		
		//question data type
		var answer = false;
		switch(data.type){
			case "single_line_text":
				answer = answerContainer.addElement("input", "questionAnswer questionAnswerSingleLine");
				answer.setAttribute("type", "text");
				answer.setAttribute("placeholder", "Entrez votre réponse ici");
				break;
			case "text":
			default:
				answer = answerContainer.addElement("textarea", "questionAnswer questionAnswerMultiLines");
				answer.setAttribute("placeholder", "Entrez votre réponse ici");
				break;
		}

		//data
		questionsContainer.setAttribute("question-id", data.id);
		questionsContainer.setAttribute("question-type", data.type||"text");
		statement.innerText = data.statement;

		//event
		answer.addEventListener("change", async function(event){
			var result = await actions.pageMethods.quizz.manageAnswerUpdate({
				idQuestion: data.id,
				data: answer.value,
				idAnswer: questionsContainer.getAttribute("answer-id")
			});
			if(result.answerId){
				questionsContainer.setAttribute("answer-id", result.answerId);
			}
		});
	}

	this.adapters.questionColStats = function(container, data){
		colQuestion = container.addElement("div", "questionHeadCol colQ");
		colQuestion.title = data.statement;
		colQuestion.setAttribute("question-id", data.id);
		linkQuestion = colQuestion.addElement("a", "");
		linkQuestion.innerText = `Q${container.querySelectorAll(".questionHeadCol").length}`;
		linkQuestion.href = `/statisticsQuestion/${data.id}`;
	}
	this.adapters.submissionStats = function(container, data){
		//create elems
		submission = container.addElement("div", "rowSubmission");
		var dateSub = submission.addElement("a", "colD");
		var questions = document.querySelectorAll(".questionHeadCol");
		questions.forEach(function(question){
			var symb = "times";
			var questionId = question.getAttribute("question-id");
			if(questionId in data.answers){
				symb = data.answers[questionId].data.length < config.charLongAnswer ? "check" : "check-double";
			}
			var answer = submission.addElement("div", "colQ");
			answer.addElement("div", symb);
		})
		//add data
		dateSub.href = `/statisticsSubmission/${data.id}`;
		dateSub.innerText = data.datecreation;
	}
	
	//other
	this.addContentLoader = function(container, className = ""){
		var elem = container.addElement("div", `contentLoader ${className}`);
		return {
			element: elem,
			remove: function(){elem.remove()}
		};
	};
} 