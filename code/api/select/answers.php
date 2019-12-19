<?php 
require_once 'database/database.php';
require_once 'utility.php';

class Answers
{
    public $response = array();
    
    public function getAnswer($params)
    {
		$query = "SELECT * FROM ". Utility::getTableAnswers() ." where idAnswers = '$params->answers'";
        
        $request = Utility::prepareRequest(Database::getConnection(), $query);
		
        $request->execute();

		$row = $request->fetch(PDO::FETCH_ASSOC);
		$this->response = [
			"id" => $row['idAnswers'],
			"data" => $row['data'],
			"fk_Questions" => $row['fk_Questions'],
			"fk_Submissions" => $row['fk_Submissions']
        ];
        
        Utility::returnJSON($this->response);
    }
	
	public function getAnswersByQuestion($params){
		$query = "SELECT * FROM ". Utility::getTableAnswers() ." where fk_Questions = '$params->questions'";
        
        $request = Utility::prepareRequest(Database::getConnection(), $query);
		
        $request->execute();

		while($row = $request->fetch(PDO::FETCH_ASSOC)){
			$idSub = $row['fk_Submissions'];
			$query = "SELECT datecreation FROM ". Utility::getTableSubmissions() ." where idSubmissions = '$idSub'";
			$requestSub = Utility::prepareRequest(Database::getConnection(), $query);
			$requestSub->execute();
			$rowSub = $requestSub->fetch(PDO::FETCH_ASSOC);
			$this->response[] = [
				"id" => $row['idAnswers'],
				"data" => $row['data'],
				"fk_Questions" => $row['fk_Questions'],
				"fk_Submissions" => $row['fk_Submissions'],
				"date_Submissions" => $rowSub['datecreation']
			];
		}
        Utility::returnJSON($this->response);
	}
}