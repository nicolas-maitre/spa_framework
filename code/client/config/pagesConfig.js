var pagesConfig = {
    error: {
        title: "Erreur",
        headButton: {
            text: "Home",
            target: "home"
        }
    },
    home: {
        title: "Accueil",
        headButton: {
            text: "Manage",
            target: "manage"
        },
        refreshDataOnDisplay: true,
        data: [{
            source: "allActiveQuizzes",
            container: ".ListQuizz",
            adapter: "quizzLine"
        }]
    },
    create: {
        title: "Creation",
        headButton: {
            text: "Home",
            target: "home"
        },
        view: "create",
        refreshDataOnDisplay: true
    },
    edit: {
        title: "Modification",
        headButton:{
            text: "Manage",
            target: "manage"
        },
        view: "edit",
        data: [{
            source: "quizz",
            pathTemplate: "/{{id}}", 
            dataName: "quizzEdit"
        }, {
            source: "questionsForQuizz",
            pathTemplate: "/{{quizzId}}",
            container: ".editQuestionsList",
            adapter: "createQuestionsLine"
        }],
        refreshDataOnDisplay: true
    },
    quizz: {
        title: "Quizz",
        headButton: {
            text: "Home",
            target: "home"
        },
        view: "quizz",
        refreshDataOnDisplay: true,
        data: [
            {
                source: "quizz",
                pathTemplate: "/{{id}}", 
                dataName: "quizz",
            },
            {
                source: "questionsForQuizz",
                pathTemplate: "/{{quizzId}}",
                container: ".quizzQuestionsContainer",
                adapter: "questionInputLine",
                dataName: "questions"
            },
            {
                source: "submissionWithAnswers",
                pathTemplate: "/{{quizzId}}/submission/{{submissionId}}", 
                dataName: "submission"
            },
        ]
    },
    manage: {
        title: "Manage",
        headButton: {
            text: "Home",
            target: "home"
        },
        refreshDataOnDisplay: true
    },
    statistics: {
        title: "Statistiques",
        headButton: {
            text: "Home",
            target: "home"
        },
        data: [
            {
                source: "questionsForQuizz",
                pathTemplate: "/{{quizzId}}",
                container: ".questionCol",
                adapter: "questionColStats",
                dataName: "questions" //use as global data
            },
            {
                source: "submissionsWithAnswers",
                pathTemplate: "/{{quizzId}}", 
                dataName: "submissions" //use as global data
            },
        ],
        refreshDataOnDisplay: true
    },
    statisticsQuestion: {
        headButton: {
            text: "Home",
            target: "home"
        },
        data: [
            {
                source: "answersByQuestion",
                pathTemplate: "/{{questionId}}",
                container: ".answerList",
                adapter: "answerLine",
                dataName: "answers" //use as global data
            },
            {
                source: "question",
                pathTemplate: "/{{questionId}}",
                dataName: "question" //use as global data
            }
        ],
        refreshDataOnDisplay: true
    },
    statisticsSubmission: {
        headButton: {
            text: "Home",
            target: "home"
        },
        view: "statisticsSubmission",
        refreshDataOnDisplay: true,
        data: [
            {
                source: "questionsForQuizz",
                pathTemplate: "/{{quizzId}}",
                dataName: "questions" //use as global data
            },
            {
                source: "submissionWithAnswers",
                pathTemplate: "/{{quizzId}}/{{submissionId}}", 
                dataName: "submission" //use as global data
            },
        ]
    }
};