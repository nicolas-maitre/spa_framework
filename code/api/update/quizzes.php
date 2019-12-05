<?php 

require_once 'database/database.php';



class Quizzes

{

    //Définition des tables dans la bdd

    private $ansTable = 'tblanswers';

    private $quesTable = 'tblquestions';

    private $quizTable = 'tblquizzes';



    private $conn;

	private $id;




    public function __construct(){

        $database = new Database();

        $this->conn = $database->getConnection();

    }

	

	//Update du nom et de la description d'un quiz

	function updateQuiz($id){

		//Récupération des infos envoyées par la méthode PUT
		parse_str(file_get_contents('php://input'), $_PUT);

		//query
		$query = "UPDATE $this->quizTable SET";
		foreach($_PUT as $index=>$param){
			$query .= " ".$index. "= :".$index.",";
		}
		//Supprime la dernière virgule
		$query = substr($query,0,-1);

		$query .= " WHERE idQuizzes = :id";

		//prepare de la query
		$stmt = $this->conn->prepare($query);

		$this->id=htmlspecialchars(strip_tags($id->quiz));

		foreach($_PUT as $index=>$param)
		{
			$this->bindParam($stmt, $index, $param);
		}
		
		$stmt->bindParam(':id', $id->quiz);

	 

		// Execution
		if($stmt->execute()){
			return true;
		}
		return false;

	}

	function bindParam($stmt, $index, $param){
		htmlspecialchars(strip_tags($index));
		$stmt->bindParam(':'.$index, $param);
	}

}