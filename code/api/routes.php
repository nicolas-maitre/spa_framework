<?php
require_once 'router.php';

// Check la méthode afin de rediriger
$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *'); 
switch ($method) {
    case 'GET':
        Router::get("/quizzes/", "select/quizzes@getQuizzes");
        Router::get("/quizzes/id/", "select/quizzes@getQuiz");
        Router::get("/quizzes/id/questions/", "select/quizzes@getQuestions");
		Router::get("/quizzes/id/submissions/", "select/submissions@getSubmissionsWithAnswers");
		
        Router::get("/questions/", "select/questions@getQuestions");
		Router::get("/questions/id/", "select/questions@getQuestion");
		Router::get("/questions/id/answers/", "select/answers@getAnswersByQuestion");
		
		Router::get("/submission/id/", "select/submissions@getSubmission");
		
		Router::get("/answers/id/", "select/answers@getAnswer");
        break;

    case 'POST':
        Router::post("/quizzes/", "insert/quizzes@insertQuiz");
        Router::post("/quizzes/id/questions/", "insert/questions@insertQuestion");
		Router::post("/quizzes/id/submission/", "insert/submissions@insertSubmission");
		Router::post("/submission/id/question/id/answers/", "insert/answers@insertAnswer");
        break;

    case 'PUT':
        Router::put("/quiz/id/", "update/quizzes@updateQuiz");
        Router::put("/question/id/", "update/questions@updateQuestion");
		Router::put("/answers/id/", "update/answers@updateAnswer");
        break;

    case 'DELETE':
        Router::delete("/quizz/id/", "update/quizzes@deleteQuizz");
        Router::delete("/question/id/", "update/questions@deleteQuestion");
        break;
    case 'OPTIONS':
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        exit;
    
    default:
        header("HTTP/1.0 404 Not Found");
        break;
}


Router::run();