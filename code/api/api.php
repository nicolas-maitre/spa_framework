<?php
require_once 'router.php';

// Check la méthode afin de rediriger
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        Router::get("/quizzes/", "select/quizzes@getQuizzes");
        Router::get("/quizzes/id/", "select/quizzes@getQuiz");
        Router::get("/quizzes/id/questions/", "select/quizzes@getQuestions");

        Router::get("/questions/", "select/questions@getQuestions");
		Router::get("/questions/id/", "select/questions@getQuiz");
        Router::get("/questions/id/answers/", "select/questions/quizzes@getAnswers");
		
		Router::get("/answers/", "select/answers@getAnswers");
		Router::get("/answers/id/", "select/answers@getAnswer");
        break;

    case 'POST':
        
        break;

    case 'PUT':
        
        break;

    case 'DELETE':

         break;
    
    default:
        header("HTTP/1.0 404 Not Found");
        break;
}


Router::run();