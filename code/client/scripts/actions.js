function Actions(){
    var _this = this;
    this.onHeadButtonClick = function(evt){
        pagesManager.changePage(globalMemory.headButtonTarget);
    };
    //-------------------------------------------------------------------------------------
    //page actions on load
    //-------------------------------------------------------------------------------------
    this.onPageLoad = {};
    this.onPageLoad.error = function(){
        
    }
	this.onPageLoad.home = function(){
        var refreshButton = document.querySelector(".homePageContainer .questionAnswerContainerSearch .refreshButton");
		refreshButton.addEventListener("click", pagesManager.refreshCurrentPage);
    }
    this.onPageLoad.manage = function(){
        //add drop on the page
        globalMemory.dragAndDropManage = new DragAndDrop();
        globalMemory.dragAndDropManage.addDrop("quizzList");
    }
    this.onPageLoad.create = function(){
        //add event
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
        globalMemory.dragAndDropEdit = new DragAndDrop();
        globalMemory.dragAndDropEdit.addDrop("editQuestionsList");
        addQuestion.addEventListener("click", async function(){
            var newQuestion = await apiManager.createData(`quizzes/${pagesManager.pages.edit.data.quizzEdit.id}/questions/`);
            builder.adapters.createQuestionsLine(document.querySelector(".editQuestionsList"), newQuestion[0]);
            apiManager.updateData(`question/${newQuestion[0].id}`, {order:document.getElementsByClassName("editQuestion").length-1});
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
                    dropped.updateManageButton(dropped.parentElement.getAttribute("name"));
                }
            });
            //add drop possibility on quizz
            globalMemory.dragAndDropManage.addDrag("droped", function(elem){
                var url = `quiz/${elem.getAttribute("quizzid")}`;
                apiManager.updateData(url, {status: elem.parentElement.getAttribute("name")})
                elem.updateManageButton(elem.parentElement.getAttribute("name"));
            });
        });
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
                apiManager.updateData(`quiz/${data.id}`, {name: quizzTitle.value});
            })
            quizzDescription.value = data.description;
            quizzDescription.addEventListener("change", function(event){
                apiManager.updateData(`quiz/${data.id}`, {description: quizzDescription.value});
            })
        }
    };

    //______________
    //pageMethods
    //________
    this.pageMethods = {};
    this.pageMethods.quizz = {};
    //adds submission data into already loaded data
    this.pageMethods.quizz.patchQuizzWithSubmission = function(){
        var quizzPage = pagesManager.pages.quizz;
        if(!quizzPage.data.questions || !quizzPage.data.submission){
            return; //missing data
        }
        quizzPage.data.submission.answers.forEach(answer => {
            //get container
            var answerContainer = quizzPage.container.querySelector(`.quizzQuestionsContainer > .quizzQuestion[question-id="${answer.fk_Questions}"]`);
            if(!answerContainer){
                return; //not concerned by data
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
        });
    };
    //manages answer in submission
    this.pageMethods.quizz.manageAnswerUpdate = async function({idQuestion, data, idAnswer = false}){
        if(!pagesManager.pages.quizz.data.quizz){ //quizz not loaded yet
            console.warn("quizz not loaded yet");
            return;
        }

        var quizz = pagesManager.pages.quizz.data.quizz;
        //already created
        if(idAnswer){
            console.log("update answer");
            await apiManager.updateData(`answers/${idAnswer}`, {data});
            return {};
        }

        //no submission
        if(!pagesManager.pages.quizz.data.submission){
            console.log("no submission yet");
            var result = await apiManager.createData(`quizzes/${quizz.id}/submission`);
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
        var newAnswer = await apiManager.createData(`submission/${submission.id}/question/${idQuestion}/answers`, {data});
        return {answerId: newAnswer.id};
    };

    //_________
    //other actions
    //_________


    /**
     * To change status of element
     * @param {string} newStatus status to udate elem
     */
    Element.prototype.changeStatus = function(newStatus){
        this.updateManageButton(newStatus);
        var url = `quiz/${this.getAttribute("quizzid")}`;
        apiManager.updateData(url, {status: newStatus});
    }
    /**
     * To change button on manage
     * @param {string} status status to define button
     */
    Element.prototype.updateManageButton = function(status){
        console.log(status);
        //get quizz actions div
        var quizzActions = this.firstChild;
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
                    var url = `quizz/${quizzActions.parentElement.getAttribute("quizzid")}`;
                    apiManager.deleteData(url);
                    quizzActions.parentElement.remove();
                })
                break;
            default:break;
		}
    }
}