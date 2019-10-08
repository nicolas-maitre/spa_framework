<?php


    include('Rest.php');

    $api = new REST();

    $request_method = $_SERVER["REQUEST_METHOD"];

    switch($request_method)
    {
        case 'GET':
            // Récupérer les exercices
            if(!empty($_GET["id"]))
            {
                $id = intval($_GET["id"]);

                $api->getExercise($id);
            }
            else
            {
                $api->getExercises();
            }
            break;

        case 'POST':

            //Insertion d'un exercice
            $api->insertExercise($_POST);
            break;

        default:
            // Requête invalide
            header("HTTP/1.0 405 Method Not Allowed");
            break;
    }

