<?php
require_once 'router.php';

// Check la méthode afin de rediriger
$method = $_SERVER['REQUEST_METHOD'];

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
        Router::get("/questions/id/answers/", "select/questions/quizzes@getAnswers");
		
		//Récupère toutes les réponses
		Router::get("/answers/", "select/answers@getAnswers");
		//Récupère une réponse en fonction de l'id
		Router::get("/answers/id/", "select/answers@getAnswer");
        break;

    case 'POST':
		//Ajoute un quiz
        Router::post("/quizzes/", "insert/quizzes@insertQuiz");
		
        break;

    case 'PUT':
		//Update du nom et de la description d'un quiz
        Router::put("/quiz/id/", "update/quizzes@updateQuiz");
        //Update du nom et de la description d'un quiz
        Router::put("/quiz/id/updateStatus", "update/quizzes@updateQuizStatus");
        break;

    case 'DELETE':

         break;
    
    default:
        header("HTTP/1.0 404 Not Found");
        break;
}


Router::run();