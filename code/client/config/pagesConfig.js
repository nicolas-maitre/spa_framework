var pagesConfig = {
	error:{
        title: "Erreur",
        headButton:{
            text: "Home",
            target: "home"
        }
    },
    home:{
        title: "Accueil",
        headButton:{
            text: "Manage",
            target: "manage"
        },
		refreshDataOnDisplay: true,
		data:[{
			source: "allAvailibleQuizzes",
			container: ".ListQuizz", //querySelector synthax
			adapter: "quizzLine"
		}]
    },
    create:{
        headButton:{
            text: "Home",
            target: "home"
        },
        view: "create"
    },
    quizz:{
        headButton:{
            text: "Home",
            target: "home"
        },
        view: "quizz"
    },
    manage:{
        title: "Manage",
        headButton:{
            text: "Home",
            target: "home"
        },
    },
	test:{
		
	}
};