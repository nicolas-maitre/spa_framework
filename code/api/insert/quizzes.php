<?php 
require_once 'database/database.php';
require_once 'utility.php';

class Quizzes
{
    public $response = array();
    private $uuid;

    public function insertQuiz()
    {
    
        $query = "INSERT INTO ". Utility::getTableQuizzes() ." (`idQuizzes`, `name`, `description`, `datecreation`, `active`)
        VALUES (?, ?, ?, ?, ?)";

        $request = Utility::prepareRequest(Database::getConnection(), $query);

        $uuid = Utility::gen_uuid();

        $request->execute(array($uuid, $_POST['name'], $_POST['description'], date("Y-m-d"),1)); 

        $query2 = "SELECT * FROM ". Utility::getTableQuizzes() ." where active = '1' AND idQuizzes = '$uuid'";

        $request = Utility::prepareRequest(Database::getConnection(), $query2);
        
        $request->execute();

        while($row = $request->fetch(PDO::FETCH_ASSOC))
        {
            $this->response[] = [
                "id" => $row['idQuizzes'],
                "name" => $row['name'],
                "description" => $row['description'],
                "datecreation" => $row['datecreation'],
                "status" => $row['status']
            ];
        }
    
        Utility::returnJSON($this->response);
       
    }

}