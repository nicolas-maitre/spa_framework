<?php 

require_once 'database/database.php';

class Questions
{
	
	//Définition des tables dans la bdd
    private $ansTable = 'tblanswers';
    private $quesTable = 'tblquestions';
    private $quizTable = 'tblquizzes';

    private $conn;


    public function __construct(){
        $database = new Database();
        $this->conn = $database->getConnection();
    }
	
	
	function getAnswers($id){
				$query = "SELECT * FROM $this->ansTable
				INNER JOIN $this->quesTable ON idQuestions = fk_Questions
				WHERE idQuestions =  :id;
				";
				
				
				//prepare de la query
				$stmt = $this->conn->prepare($query);

				//Filtre de nettoyage
				$this->id=htmlspecialchars(strip_tags($id->questions));

				//bind des valeurs
				$stmt->bindParam(':id', $id->questions);
				
				$response = array();
				$stmt->execute();
				
				while($row = $stmt->fetch(PDO::FETCH_ASSOC))
				{
					$response[] = [
						"id" => $row['idAnswers'],
						"Title_Question"=> $row['statement'],
						"dataAnswers" => $row['dataAnswers'],
					];
				}

				// show products data in json format
			header('Content-Type: application/json');
			header('Access-Control-Allow-Origin: *');
			echo json_encode($response,JSON_PRETTY_PRINT);
		}
}
