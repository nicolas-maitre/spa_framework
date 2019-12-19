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
        
        $request->execute(array($uuid, $_POST['data'], $params->question, $params->submission)); 
		
		$this->response = [
			"id" => $uuid,
			"data" => $_POST['data'],
			"fk_Questions" => $params->question,
			"fk_Submissions" => $params->submission
		];    

        Utility::returnJSON($this->response);
    }

}