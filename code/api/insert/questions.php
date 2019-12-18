<?php 
require_once 'database/database.php';

class Questions
{
    //Définition des tables dans la bdd
    private $ansTable = 'tblAnswers';
    private $quesTable = 'tblQuestions';
    private $quizTable = 'tblQuizzes';

    private $conn;

    private $uuid;


    public function __construct(){
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function insertQuestion($id)
    {
    
        $query = "INSERT INTO $this->quesTable (`idQuestions`, `fk_Quizzes`, `statement`, `type`, `order`)
        VALUES (?, ?, ?, ?, ?)";

    
        $sth = $this->conn->prepare($query);

        $uuid = $this->gen_uuid();
        
        $sth->execute(array($uuid, $id->quizzes, $_POST['statement'], $_POST['type'], $_POST['idOrder'])); 

        $query2 = "SELECT * FROM $this->quesTable where active = '1' AND idQuestions = '$uuid'";

        $response = array();

        $sth = $this->conn->prepare($query2);
        
        $sth->execute();

        while($row = $sth->fetch(PDO::FETCH_ASSOC))
        {
            $response[] = [
                "id" => $row['idQuestions'],
                "dataQuestions" => $row['dataQuestions'],
                "id_Quizzes" => $row['fk_Quizzes'],
                "statement" => $row['statement'],
                "type" => $row['type'],
                "active" => $row['active'],
                "order" => $row['order']
            ];
        }
       // show products data in json format
       header('Content-Type: application/json');
	   header('Access-Control-Allow-Origin: *');
       echo json_encode($response,JSON_PRETTY_PRINT);
    }

    static private function gen_uuid() {
        return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            // 32 bits for "time_low"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),

            // 16 bits for "time_mid"
            mt_rand( 0, 0xffff ),

            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand( 0, 0x0fff ) | 0x4000,

            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand( 0, 0x3fff ) | 0x8000,

            // 48 bits for "node"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
        );
    }
}