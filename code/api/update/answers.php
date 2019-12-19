<?php 

require_once 'database/database.php';

class Answers
{
    //Définition des tables dans la bdd
    private $ansTable = 'tblAnswers';
    private $quesTable = 'tblQuestions';
    private $quizTable = 'tblQuizzes';
    private $conn;
	private $id;
    public function __construct(){
        $database = new Database();
		$this->conn = $database->getConnection();
	}
	
	//Update du nom et de la description d'un quiz
	function updateAnswer($params){
		//Récupération des infos envoyées par la méthode PUT
		parse_str(file_get_contents('php://input'), $_PUT);
		//query
		$query = "UPDATE $this->ansTable SET";
		foreach($_PUT as $index=>$param){
			$query .= " ".$index. "= :".$index.",";
		}
		//Supprime la dernière virgule
		$query = substr($query,0,-1);
		$query .= " WHERE idAnswers = :id";
		//prepare de la query
		$stmt = $this->conn->prepare($query);
		foreach($_PUT as $index=>$param)
		{
			$this->bindParam($stmt, $index, $param);
		}
		$stmt->bindParam(':id', $params->answers);
		// Execution
		header('Access-Control-Allow-Origin: *'); 
		$stmt->execute();
		echo "[]";
	}

	function bindParam($stmt, $index, $param){
		htmlspecialchars(strip_tags($index));
		$stmt->bindParam(':'.$index, $param);
	}
}