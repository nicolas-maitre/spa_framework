<?php 
require_once 'database/database.php';

class Questions
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

    public function getQuestion($params)
    {
		$query = "SELECT * FROM $this->quesTable where active = 1 AND idQuestions = '$params->questions'";
		
		$sth = $this->conn->prepare($query);
		
        $sth->execute();

		$row = $sth->fetch(PDO::FETCH_ASSOC);
		$response = [
			"id" => $row['idQuestions'],
			"data" => $row['dataQuestions'],
			"fk_Quizzes" => $row['fk_Quizzes'],
			"statement" => $row['statement'],
			"type" => $row['type'],
			"order" => $row['order']
		];
        // show products data in json format
        header('Content-Type: application/json');
		header('Access-Control-Allow-Origin: *');
		
        echo json_encode($response,JSON_PRETTY_PRINT);
    }
}