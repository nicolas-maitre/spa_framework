function Actions(){
    var _this = this;
    this.onHeadButtonClick = function(evt){
        pagesManager.changePage(globalMemory.headButtonTarget);
    };
    //-------------------------------------------------------------------------------------
    //page actions on load
    //-------------------------------------------------------------------------------------
    this.onPageLoad = {};
	this.onPageLoad.home = function(){
        var refreshButton = document.querySelector(".homePageContainer .questionAnswerContainerSearch .refreshButton");
        refreshButton.addEventListener("click", function(evt){
            pagesManager.refreshCurrentPage(evt);
            quizzSearch.value = "";
        });
        
        quizzSearch.value = "";
        quizzSearch.addEventListener("input", _this.pageMethods.home.onSearchInput);
    }
    this.onPageLoad.manage = function(){
        //add drop on the page
        globalMemory.dragAndDropManage = new DragAndDrop();
        globalMemory.dragAndDropManage.addDrop("quizzList");
    }
    this.onPageLoad.create = function(){
        createQuizzTitle.setAttribute("maxlength", config.quizzNameSize);
        createQuizzDescription.setAttribute("maxlength", config.quizzDescriptionSize);

        createQuizz.addEventListener("click", async function(event){
            //check if field is empty
            createQuizzTitle.classList.remove('errorField');
            if(createQuizzTitle.value == ''){
                createQuizzTitle.classList.add('errorField');
            }else{
                var data = {name:createQuizzTitle.value, description:createQuizzDescription.value};
                var newQuizz = await apiManager.createData(`quizzes`, data);
                createQuizz.remove();
                pagesManager.changePage("edit", {path: [newQuizz[0].id]});
            }
        })
    }
    this.onPageLoad.edit = function(){
        quizzTitle.setAttribute("maxlength", config.quizzNameSize);
        quizzDescription.setAttribute("maxlength", config.quizzDescriptionSize);
        //dragAndDrop
        globalMemory.dragAndDropEdit = new DragAndDrop();
        globalMemory.dragAndDropEdit.addDrop("editQuestionsList");
        addQuestion.addEventListener("click", async function(){
            var adapterContainer = document.querySelector(".editQuestionsList");
            //remove "no data" text
            var noDataText = adapterContainer.querySelector(".noDataContainer");
            if(noDataText) noDataText.remove();
            //create question
            var newQuestion = await apiManager.createData(`quizzes/${pagesManager.pages.edit.data.quizzEdit.id}/questions/`);
            builder.adapters.createQuestionsLine(adapterContainer, newQuestion[0]);
            apiManager.updateData(`questions/${newQuestion[0].id}`, {order:document.getElementsByClassName("editQuestion").length-1});
        })
    }
    //-------------------------------------------------------------------------------------
    //page actions on display
    //-------------------------------------------------------------------------------------
    this.onPageDisplay = {};
    this.onPageDisplay.error = function(){
        errorStatusCode.innerText = globalMemory.error.code;
        errorClientMsg.innerText = globalMemory.error.msg;
    }
    this.onPageDisplay.manage = function(){
        //show loaders        
        listQuizzesBuild.removeChilds(".droped");
        listQuizzesActive.removeChilds(".droped");
        listQuizzesClos.removeChilds(".droped");
        var loaderQuizzesBuild = builder.addContentLoader(listQuizzesBuild);
        var loaderQuizzesActive = builder.addContentLoader(listQuizzesActive);
        var loaderQuizzesClos = builder.addContentLoader(listQuizzesClos);
        
        //load all quizzes
        dataSources.allQuizzes().then(function(datas){
            //hide loaders
            loaderQuizzesBuild.remove();
            loaderQuizzesActive.remove();
            loaderQuizzesClos.remove();
            
            //build adapters
            datas.forEach(quizz => {
                if(quizz.status!=null && quizz.status.match(/^(build|active|clos)$/)){
                    var list = document.getElementById("listQuizzes" + quizz.status.capitalise());
                    dropped = builder.adapters.quizzManage(list, quizz);
                    actions.pageMethods.manage.updateManageButton(dropped, dropped.parentElement.getAttribute("name"));
                }
            });
            //add drop possibility on quizz
            globalMemory.dragAndDropManage.addDrag("droped", function(elem){
                var url = `quizzes/${elem.getAttribute("quizzid")}`;
                apiManager.updateData(url, {status: elem.parentElement.getAttribute("name")})
                actions.pageMethods.manage.updateManageButton(elem,elem.parentElement.getAttribute("name"));
            });
        });
    }
    this.onPageDisplay.quizz = function(){
        //hides save link message
        linkSaveText.classList.add("none");
    };
    this.onPageDisplay.statistics = function(){
        submissionList.removeChilds();
    }
    //page action on any page display
    this.onAnyPageDisplay = function({pageName = false, pageConfig = false}){
        //button config
        if(pageConfig.headButton){
            elements.topMenuButton.innerText = pageConfig.headButton.text;
            globalMemory.headButtonTarget = pageConfig.headButton.target;
            elements.topMenuButton.classList.remove("none");
        }else{
            elements.topMenuButton.classList.add("none");
        }
    }

    //-------------------------------------------------------------------------------------
    //page actions on data
    //-------------------------------------------------------------------------------------
    this.onPageData = {};
    this.onPageData.quizz = function(data, dataName){
        switch(dataName){
            case "quizz":
                pagesManager.pages.quizz.container.querySelector(".quizzTitle").innerText = data.name;
                break;
            case "questions":
            case "submission":
                _this.pageMethods.quizz.patchQuizzWithSubmission();
                break;
        }
    };
    this.onPageData.edit = function(data, dataName){
        if(dataName == "quizzEdit"){
            quizzTitle.value = data.name;
            quizzTitle.addEventListener("change", function(event){
                apiManager.updateData(`quizzes/${data.id}`, {name: quizzTitle.value});
            })
            quizzDescription.value = data.description;
            quizzDescription.addEventListener("change", function(event){
                apiManager.updateData(`quizzes/${data.id}`, {description: quizzDescription.value});
            })
        }
    };

    this.onPageData.statistics = function(data, dataName){
        if(!pagesManager.pages.statistics.data.questions || !pagesManager.pages.statistics.data.submissions){
            return; //missing data
        }
        pagesManager.pages.statistics.data.submissions.forEach(function(submission){
            builder.adapters.submissionStats(submissionList, submission);
        })
        console.log(data);
    }
    this.onPageData.statisticsQuestion = function(data, dataName){
        if(dataName == "question"){
            document.querySelector(".quizzTitle").innerText = data.statement;
        }
    }
    this.onPageData.statisticsSubmission = function(data, dataName){  
        
        if(dataName == "submission"){
            document.querySelector(".quizzTitle").innerText = data.datecreation;
        }
        if(pagesManager.pages.statisticsSubmission.data.questions && pagesManager.pages.statisticsSubmission.data.submission){
            questions = pagesManager.pages.statisticsSubmission.data.questions;
            submission = pagesManager.pages.statisticsSubmission.data.submission;
            var listAnswer = document.querySelector(".listAnswers");

            document.querySelector(".quizzTitle").innerText = submission.datecreation;
            questions.forEach(function(question){
                console.log(question);
                var answer = "";
                if(submission.answers[question.id] !== undefined){
                    answer = submission.answers[question.id].data;
                }
                var answerData = {question: question.statement,answer: answer};
                console.log(answerData);
                builder.adapters.questionWithAnswer(listAnswer, answerData);
            })
        }
    }
    
    //-------------------------------------------------------------------------------------
    //page specific methods
    //-------------------------------------------------------------------------------------
    this.pageMethods = {};
    this.pageMethods.home = {};
    this.pageMethods.home.onSearchInput = function(evt){
        var search = quizzSearch.value.toLowerCase();
        var quizzListElem = pagesManager.pages.home.container.querySelector(".ListQuizz");
        var quizElems = quizzListElem.querySelectorAll(".linkQuizz");
        var hasResults = false;
        quizElems.forEach((quizElem)=>{
            //extract title
            var title = quizElem.querySelector(".titreQuizz").innerText.toLowerCase();
            //test title
            if(title.includes(search)){
                quizElem.classList.remove("none");
                hasResults = true;
            } else {
                quizElem.classList.add("none");
            }
        });
        //noData
        if(hasResults && pagesManager.pages.home.memory.quizzNoData){
            pagesManager.pages.home.memory.quizzNoData.remove();
            pagesManager.pages.home.memory.quizzNoData = false;
        }
        if(!hasResults && !pagesManager.pages.home.memory.quizzNoData){
            pagesManager.pages.home.memory.quizzNoData = builder.adapters.noData(quizzListElem);
        }
    };

    this.pageMethods.quizz = {};
    //adds submission data into already loaded data
    this.pageMethods.quizz.patchQuizzWithSubmission = function(){
        var quizzPage = pagesManager.pages.quizz;
        if(!quizzPage.data.questions || !quizzPage.data.submission){
            return; //missing data
        }
		for(var indAnswer in quizzPage.data.submission.answers){
			var answer = quizzPage.data.submission.answers[indAnswer]
            //get container
            var answerContainer = quizzPage.container.querySelector(`.quizzQuestionsContainer > .quizzQuestion[question-id="${answer.fk_Questions}"]`);
            if(!answerContainer){
                continue; //not concerned by data
            }
            //set answer attribute
            answerContainer.setAttribute("answer-id", answer.id);

            //TODO: add supoort for other question types
            var questionType = answerContainer.getAttribute("question-type");
            if(questionType == "text" || questionType == "single_line_text"){
                //set text
                var input = answerContainer.querySelector(".questionAnswer");
                input.value = answer.data;
            }
        }
    };
    //manages answer in submission
    this.pageMethods.quizz.manageAnswerUpdate = async function({idQuestion, data, idAnswer = false}){
        if(!pagesManager.pages.quizz.data.quizz){ //quizz not loaded yet
            console.warn("quizz not loaded yet");
            return;
        }

        //show save link message
        linkSaveText.classList.remove("none");

        var quizz = pagesManager.pages.quizz.data.quizz;
        //already created
        if(idAnswer){
            console.log("update answer");
            await apiManager.updateData(`answers/${idAnswer}`, {data});
            return {};
        }

        //no submission
        if(!pagesManager.pages.quizz.data.submission){
            console.log("create submission");
            var result = await apiManager.createData(`quizzes/${quizz.id}/submissions`);
            if(!result[0]){
                console.warn("submission not created");
                utils.infoBox("Une erreur s'est produite. Veuillez réessayer");
                return false;
            }
            //save result
            var newSubmission = result[0];
            //add submission in page memory
            pagesManager.pages.quizz.data.submission = newSubmission;
            //add submission to url
            pagesManager.pages.quizz.location.path = [quizz.id, "submission", newSubmission.id];
            history.pushState(pagesManager.pages.quizz.location, false, `/quizz/${quizz.id}/submission/${newSubmission.id}`)
        }
        var submission = pagesManager.pages.quizz.data.submission;

        //insert then return answer
        console.log("create answer");
        var newAnswer = await apiManager.createData(`submissions/${submission.id}/questions/${idQuestion}/answers`, {data});
        return {answerId: newAnswer.id};
    };

    this.pageMethods.manage = {};
    //Change displayed buttons on a manage quizz cell
    this.pageMethods.manage.updateManageButton = function(element, status){
        //get quizz actions div
        var quizzActions = element.firstChild;
        while(!quizzActions.classList.contains("quizzListActions")){
            quizzActions = quizzActions.nextSibling;
        }
        //remove all actions buttons
        var child = quizzActions.firstChild;  
        while (child) { 
            quizzActions.removeChild(child); 
            child = quizzActions.firstChild; 
        }
        //add button corresponding to status
        var buttonStats = quizzActions.addElement("div", "imgStats");
        buttonStats.addEventListener("click", function(event){
            pagesManager.changePage("statistics", {path:[quizzActions.parentElement.getAttribute("quizzid")]});
        })
		switch(status){
			case "build": 
                var buttonEdit = quizzActions.addElement("div", "quizzListActionsEdit imgEdit");
                buttonEdit.addEventListener("click", function(event){
                    pagesManager.changePage("edit", {path:[quizzActions.parentElement.getAttribute("quizzid")]});
                })
				break;
			case "active":
				
				break;
			case "clos":
                var buttonTrash = quizzActions.addElement("div", "quizzListActionsDelete imgTrash");
                buttonTrash.addEventListener("click", function(event){
                    apiManager.deleteData(`quizzes/${quizzActions.parentElement.getAttribute("quizzid")}`);
                    quizzActions.parentElement.remove();
                })
                break;
            default:break;
		}
    }

    //-------------------------------------------------------------------------------------
    //other actions
    //-------------------------------------------------------------------------------------
    
}