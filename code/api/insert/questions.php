<?php 
require_once 'database/database.php';
require_once 'utility.php';

class Questions
{
    private $uuid;

    public function insertQuestion($id)
    {
    
        $query = "INSERT INTO ". Utility::getTableQuestions() ." (`idQuestions`, `fk_Quizzes`, `statement`, `type`, `order`)
        VALUES (?, ?, ?, ?, ?)";

        $request = Utility::prepareRequest(Database::getConnection(), $query);

        $uuid = Utility::gen_uuid();
        
        $request->execute(array($uuid, $id->quizzes, $_POST['statement'], $_POST['type'], $_POST['idOrder'])); 

        $query2 = "SELECT * FROM ". Utility::getTableQuestions() ." where active = '1' AND idQuestions = '$uuid'";

        $request = Utility::prepareRequest(Database::getConnection(), $query2);
        
        $request->execute();

        while($row = $request->fetch(PDO::FETCH_ASSOC))
        {
            $this->response[] = [
                "id" => $row['idQuestions'],
                "dataQuestions" => $row['dataQuestions'],
                "id_Quizzes" => $row['fk_Quizzes'],
                "statement" => $row['statement'],
                "type" => $row['type'],
                "active" => $row['active'],
                "order" => $row['order']
            ];
        }
       
        Utility::returnJSON($this->response);
    }

}