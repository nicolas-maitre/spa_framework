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
            source: "allAvailibleQuizzes",
            container: ".ListQuizz", //querySelector synthax
            adapter: "quizzLine"
        }]
    },
    create: {
        headButton: {
            text: "Home",
            target: "home"
        },
        view: "create"
    },
    quizz: {
        headButton: {
            text: "Home",
            target: "home"
        },
        view: "quizz",
        reloadData: true,
        data: [{
            source: "quizz",
            pathTemplate: "/{{id}}", 
            dataName: "quizz"//use as global data
        }]
    },
    manage: {
        title: "Manage",
        headButton: {
            text: "Home",
            target: "home"
        },
    },
    statistics: {
        headButton: {
            text: "Home",
            target: "home"
        }
    }
};