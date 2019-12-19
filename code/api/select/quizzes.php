<?php 
require_once 'database/database.php';
require_once 'utility.php';

class Quizzes
{

    public $response = array();
    public function getQuizzes()
    {
        $query = "SELECT * FROM ". Utility::getTableQuizzes() ." where active = '1' ORDER BY datecreation DESC";
    

        $request = Utility::prepareRequest(Database::getConnection(), $query);

        while($row = $request->fetch(PDO::FETCH_ASSOC))
        {
            $this->response[] = [
                "id" => $row['idQuizzes'],
                "name" => $row['name'],
                "description" => $row['description'],
                "datecreation" => $row['datecreation'],
                "status" => $row['status']
            ];
        }
        
	    Utility::returnJSON($this->response);

    }

     public function getQuiz($id)
    {
      
        $query = "SELECT * FROM ". Utility::getTableQuizzes();

        if(isset($id->quizzes))
        {
            $query .= " WHERE idQuizzes='".$id->quizzes."' LIMIT 1";
        }

        $request = Utility::prepareRequest(Database::getConnection(), $query);

        $row = $request->fetch(PDO::FETCH_ASSOC);
		$this->response = [
			"id" => $row['idQuizzes'],
			"name" => $row['name'],
			"description" => $row['description'],
			"datecreation" => $row['datecreation']
		];

        Utility::returnJSON($this->response);
    }

    public function getQuestions($id)
    {
        $query = "SELECT * FROM ". Utility::getTableQuestions() ."
        INNER JOIN ". Utility::getTableQuizzes() ." on idQuizzes = fk_Quizzes 
        WHERE idQuizzes='$id->quizzes' AND ". Utility::getTableQuestions() .".active=1";

        $request = Utility::prepareRequest(Database::getConnection(), $query);
    
        while($row = $request->fetch(PDO::FETCH_ASSOC))
        {
            $this->response[] = [
                "id" => $row['idQuestions'],
                "dataQuestions" => $row['dataQuestions'],
                "name_quiz" => $row['name'],
				"fkQuizzes" => $row['fk_Quizzes'],
                "statement" => $row['statement'],
                "type" => $row['type'],
				"order" => $row['order']               
            ];
        }
    
        Utility::returnJSON($this->response);
    }
}