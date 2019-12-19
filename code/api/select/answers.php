<?php 
require_once 'database/database.php';

class Answers
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

    public function getAnswer($params)
    {
		$query = "SELECT * FROM $this->ansTable where idAnswers = '$params->answers'";
		
		$sth = $this->conn->prepare($query);
		
        $sth->execute();

		$row = $sth->fetch(PDO::FETCH_ASSOC);
		$response = [
			"id" => $row['idAnswers'],
			"data" => $row['data'],
			"fk_Questions" => $row['fk_Questions'],
			"fk_Submissions" => $row['fk_Submissions']
		];
        // show products data in json format
        header('Content-Type: application/json');
		header('Access-Control-Allow-Origin: *');
		
        echo json_encode($response,JSON_PRETTY_PRINT);
    }
	
	public function getAnswersByQuestion($params){
		$query = "SELECT * FROM $this->ansTable where fk_Questions = '$params->questions'";
		
		$sth = $this->conn->prepare($query);
		
        $sth->execute();

		while($row = $sth->fetch(PDO::FETCH_ASSOC)){
			$idSub = $row['fk_Submissions'];
			$query = "SELECT datecreation FROM $this->subTable where idSubmissions = '$idSub'";
			$sthSub = $this->conn->prepare($query);
			$sthSub->execute();
			$rowSub = $sthSub->fetch(PDO::FETCH_ASSOC);
			$response[] = [
				"id" => $row['idAnswers'],
				"data" => $row['data'],
				"fk_Questions" => $row['fk_Questions'],
				"fk_Submissions" => $row['fk_Submissions'],
				"date_Submissions" => $rowSub['datecreation']
			];
		}
        // show products data in json format
        header('Content-Type: application/json');
		header('Access-Control-Allow-Origin: *');
		
        echo json_encode($response,JSON_PRETTY_PRINT);
	}
}