<?php 
require_once 'database/database.php';
require_once 'utility.php';

class Answers
{
    public $response = array();
    private $uuid;

    public function insertAnswer($params)
    {		
        $query = "INSERT INTO ". Utility::getTableAnswers() ." (`idAnswers`, `data`, `fk_Questions`, `fk_Submissions`)
        VALUES (?, ?, ?, ?)";

        $request = Utility::prepareRequest(Database::getConnection(), $query);
        
        $uuid = Utility::gen_uuid();
        
        $request->execute(array($uuid, $_POST['data'], $params->questions, $params->submissions)); 
		
		$this->response = [
			"id" => $uuid,
			"data" => $_POST['data'],
			"fk_Questions" => $params->questions,
			"fk_Submissions" => $params->submissions
		];    

        Utility::returnJSON($this->response);
    }

}