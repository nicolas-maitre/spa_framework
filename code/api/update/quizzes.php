<?php 
require_once 'database/database.php';

class Quizzes
{
    //Définition des tables dans la bdd
    private $ansTable = 'tblanswers';
    private $quesTable = 'tblquestions';
    private $quizTable = 'tblquizzes';

    private $conn;
	
	private $name;
	private $description;
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
		$query = "UPDATE
					 $this->quizTable
				SET
					name = :name,
					description = :description
				WHERE
					idQuizzes = :id";
		
		//prepare de la query
		$stmt = $this->conn->prepare($query);
	 
		//Filtre de nettoyage
		$this->name=htmlspecialchars(strip_tags($_PUT['name']));
		$this->description=htmlspecialchars(strip_tags($_PUT['description']));
		$this->id=htmlspecialchars(strip_tags($id->quiz));
	 
		//bind des valeurs
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':description', $this->description);
		$stmt->bindParam(':id', $id->quiz);
	 
		// Execution
		if($stmt->execute()){
			
			return true;
		}
		
		
		return false;
	}
}