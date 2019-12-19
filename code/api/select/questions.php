<?php 
require_once 'database/database.php';
require_once 'utility.php';

class Questions
{
    public $response = array();

    public function getQuestion($params)
    {
		$query = "SELECT * FROM ". Utility::getTableQuestions() ." where active = 1 AND idQuestions = '$params->questions'";
        
        $request = Utility::prepareRequest(Database::getConnection(), $query);
		
        $request->execute();

		$row = $request->fetch(PDO::FETCH_ASSOC);
		$this->response = [
			"id" => $row['idQuestions'],
			"data" => $row['dataQuestions'],
			"fk_Quizzes" => $row['fk_Quizzes'],
			"statement" => $row['statement'],
			"type" => $row['type'],
			"order" => $row['order']
        ];
        
        Utility::returnJSON($this->response);
    }
}