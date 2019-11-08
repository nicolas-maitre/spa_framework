<?php

    $request_method = $_SERVER["REQUEST_METHOD"];

    $url = $_SERVER['REQUEST_URI'];
    $urlcut = substr(strrchr($url, 'api/'), 4 );
    //  $page = substr($urlcut, 0, strpos($urlcut, '/'));
  
    $page = explode('/', $urlcut);


    switch($request_method)
    {
        case 'GET':
        $type='select';
            switch($page[0])
            {
                case 'quizzes':
                   $name = 'quizzes';
                    require_once 'REST.php';

                    $api = new REST();
                    if(isset($page[1]))
                    {
                        if(isset($page[2]))
                        {
                            $api->getQuestions($page[1]);
                            break;
                        }
                        $api->getQuiz($page[1]);
                    }
                    else
                    {
                        $api->getQuizzes();
                        
                    }
                break;

                case 'questions':
                    $name = 'questions';
                    require_once 'REST.php';

                    $api = new REST();
                    if(isset($page[1]))
                    {
                        $api->getQuestion($page[1]);
                    }
                    else
                    {
                        $api->getQuestions();
                        
                    }

                break;

                case 'answers':
                    $name = 'answers';

                break;
            }   

            break;

        /*case 'POST':
        $type='post';
        switch($_POST)
            {
                case 'quizzes':

                break;

                case 'questions':
                break;

                case 'answers':
                break;
            }  
           
        break;

        case 'PUT':
        $type='put';
            switch($_PUT)
            {
                case 'quizzes':

                break;

                case 'questions':
                break;

                case 'answers':
                break;
            }  
            
            break;

        case 'DELETE':
        $type='delete';
            switch($_DELETE)
            {
                case 'quizzes':

                break;

                case 'questions':
                break;

                case 'answers':
                break;
            }  
           
            break;*/

        default:
            // Requête invalide
            header("HTTP/1.0 405 Method Not Allowed");
            break;
    }

