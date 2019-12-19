<?php 
require_once 'database/database.php';
require_once 'utility.php';

class Submissions
{

    private $uuid;
    public $response = array();

    public function insertSubmission($id)
    {
        $uuid = Utility::gen_uuid();

        $query = "INSERT INTO ". Utility::getTableSubmissions() ." (`idSubmissions`, `datecreation`, `fk_Quizzes`)
        VALUES (?, ?, ?)";

        $request = Utility::prepareRequest(Database::getConnection(), $query);
        
        $request->execute(array($uuid, date("Y-m-d H:i:s"), $id->quizzes));
		
        $query2 = "SELECT * FROM ". Utility::getTableSubmissions() ." where idSubmissions = '$uuid'";

        $request = Utility::prepareRequest(Database::getConnection(), $query2);
        
        $request->execute();

        while($row = $request->fetch(PDO::FETCH_ASSOC))
        {
            $this->response[] = [
                "id" => $row['idSubmissions'],
                "datecreation" => $row['datecreation'],
                "fk_Quizzes" => $row['fk_Quizzes'],
				"answers" =>  []
            ];
        }

        Utility::returnJSON($this->response);
    }
	
}