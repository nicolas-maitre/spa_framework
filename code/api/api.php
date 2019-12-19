<?php
require_once 'router.php';

// Check la méthode afin de rediriger
$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *'); 
switch ($method) {
    case 'GET':
		//Récupère tous les quiz
        Router::get("/quizzes/", "select/quizzes@getQuizzes");
		//Récupère un quiz en fonction de l'id
        Router::get("/quizzes/id/", "select/quizzes@getQuiz");
		//Récupère toutes les questions d'un quiz en fonction de l'id du quiz
        Router::get("/quizzes/id/questions/", "select/quizzes@getQuestions");

		//Récupère toutes les questions
        Router::get("/questions/", "select/questions@getQuestions");
		//Récupère une question en fonction de l'id
		Router::get("/questions/id/", "select/questions@getQuiz");
		//Récupère toutes les réponses d'une question en fonction de l'id de la question
        Router::get("/questions/id/answers/", "select/questions@getAllAnswersFromAllQuestionsFromAQuiz");
        
		//Get submision with answers
		Router::get("/submission/id/", "select/submissions@getSubmission");
		
		//Answers
		Router::get("/answers/id/", "select/answers@getAnswer");
        break;

    case 'POST':
		//Ajoute un quiz
        Router::post("/quizzes/", "insert/quizzes@insertQuiz");
        //Ajouter une question
        Router::post("/quizzes/id/questions/", "insert/questions@insertQuestion");
		//Ajouter une submission
		Router::post("/quizzes/id/submission/", "insert/submissions@insertSubmission");
		//Answers
		Router::post("/submission/id/question/id/answers/", "insert/answers@insertAnswer");

        break;

    case 'PUT':
		//Update du nom et de la description d'un quiz
        Router::put("/quiz/id/", "update/quizzes@updateQuiz");
        Router::put("/question/id/", "update/questions@updateQuestion");
		//Answers
		Router::put("/answers/id/", "update/answers@updateAnswer");
        break;

    case 'DELETE':
        Router::delete("/quizz/id/", "update/quizzes@deleteQuizz");
        Router::delete("/question/id/", "update/questions@deleteQuestion");
        break;
    case 'OPTIONS':
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
		echo '';
        exit;
    
    default:
        header("HTTP/1.0 404 Not Found");
        break;
}


Router::run();