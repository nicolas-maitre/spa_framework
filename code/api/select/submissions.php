<?php 
require_once 'database/database.php';

class Submissions
{
    //Définition des tables dans la bdd
    private $ansTable = 'tblAnswers';
    private $quesTable = 'tblQuestions';
    private $quizTable = 'tblQuizzes';
	private $subTable = 'tblSubmissions';

    private $conn;


    public function __construct(){
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function getSubmission($id)
    {
        $querySub = "SELECT * FROM $this->subTable where idSubmissions = '$id->submission'";
		$queryAns = "SELECT * FROM $this->ansTable where fk_Submissions = '$id->submission'";
		$response = array();
		
		$sthSub = $this->conn->prepare($querySub);
		$sthAns = $this->conn->prepare($queryAns);
		
        $sthSub->execute();
        $sthAns->execute();

		$row = $sthSub->fetch(PDO::FETCH_ASSOC);
		$response = [
			"id" => $row['idSubmissions'],
			"datecreation" => $row['datecreation'],
			"fk_Quizzes" => $row['fk_Quizzes'],
			"answers" => []
		];
		while($row = $sthAns->fetch(PDO::FETCH_ASSOC))
        {
            $response["answers"][] = [
                "id" => $row['idAnswers'],
                "data" => $row['data'],
                "fk_Questions" => $row['fk_Questions'],
                "fk_Submissions" => $row['fk_Submissions']
            ];
        }
        // show products data in json format
        header('Content-Type: application/json');
		header('Access-Control-Allow-Origin: *');
		
        echo json_encode($response,JSON_PRETTY_PRINT);
    }
}