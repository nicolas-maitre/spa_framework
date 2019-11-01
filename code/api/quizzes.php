<?php


    include('REST.php');

    $api = new REST();

    $request_method = $_SERVER["REQUEST_METHOD"];

    switch($request_method)
    {
        case 'GET':
            // Récupérer les quiz
            if(!empty($_GET["id"]))
            {
                $id = intval($_GET["id"]);

                $api->getQuiz($id);
            }
            else
            {
				
                $api->getQuizzes();
            }
            break;

        case 'POST':

            //Insertion d'un quizz
            $api->insertQuiz($_POST);
            break;

        case 'PUT':

            //Modifier un quizz
            $id = intval($_GET["id"]);

            $api->updateQuiz($id);
            break;

        case 'DELETE':
            //Delete d'un quizz
            $id = intval($_GET["id"]);

            $api->deleteQuiz($id);

            break;

        default:
            // Requête invalide
            header("HTTP/1.0 405 Method Not Allowed");
            break;
    }

