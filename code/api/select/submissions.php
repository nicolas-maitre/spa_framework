<?php 
require_once 'database/database.php';
require_once 'utility.php';

class Submissions
{
	public $response = array();

	public function getSubmissionsWithAnswers($params){

		$querySub = "SELECT * FROM ". Utility::getTableSubmissions() ." where fk_Quizzes = '$params->quizzes'";

		$requestSub = Utility::prepareRequest(Database::getConnection(), $querySub);
		
		$requestSub->execute();

		while($rowSub = $requestSub->fetch(PDO::FETCH_ASSOC))
        {
			$idSub = $rowSub['idSubmissions'];
			$queryAns = "SELECT * FROM ". Utility::getTableAnswers() ." where fk_Submissions = '$idSub'";
			$answers = array();
			$requestAns = Utility::prepareRequest(Database::getConnection(), $queryAns);
			$requestAns->execute();
			while($rowAns = $requestAns->fetch(PDO::FETCH_ASSOC))
			{
				$answers[$rowAns['fk_Questions']] = [
					"id" => $rowAns['idAnswers'],
					"data" => $rowAns['data'],
					"fk_Questions" => $rowAns['fk_Questions'],
					"fk_Submissions" => $rowAns['fk_Submissions']
				];
			}
            $this->response[] = [
				"id" => $rowSub['idSubmissions'],
				"datecreation" => $rowSub['datecreation'],
				"fk_Quizzes" => $rowSub['fk_Quizzes'],
				"answers" => $answers
			];
        }
		
		Utility::returnJSON($this->response);
		
	}
	
    public function getSubmission($params)
    {
        $querySub = "SELECT * FROM ". Utility::getTableSubmissions() ." where idSubmissions = '$params->submissions'";
		$queryAns = "SELECT * FROM ". Utility::getTableAnswers() ." where fk_Submissions = '$params->submissions'";

		$requestSub = Utility::prepareRequest(Database::getConnection(), $querySub);
		$requestAns = Utility::prepareRequest(Database::getConnection(), $queryAns);
		
		$requestSub->execute();
		$requestAns->execute();

		$row = $requestSub->fetch(PDO::FETCH_ASSOC);
		$this->response = [
			"id" => $row['idSubmissions'],
			"datecreation" => $row['datecreation'],
			"fk_Quizzes" => $row['fk_Quizzes'],
			"answers" => []
		];
		while($row = $requestAns->fetch(PDO::FETCH_ASSOC))
        {
            $this->response["answers"][$row['fk_Questions']] = [
                "id" => $row['idAnswers'],
                "data" => $row['data'],
                "fk_Questions" => $row['fk_Questions'],
                "fk_Submissions" => $row['fk_Submissions']
            ];
		}
		
        Utility::returnJSON($this->response);
    }
}