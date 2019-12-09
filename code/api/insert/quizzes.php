<?php 
require_once 'database/database.php';

class Quizzes
{
    //Définition des tables dans la bdd
    private $ansTable = 'tblanswers';
    private $quesTable = 'tblquestions';
    private $quizTable = 'tblquizzes';

    private $conn;

    private $uuid;


    public function __construct(){
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function insertQuiz()
    {
    
        $query = "INSERT INTO tblquizzes (`idQuizzes`, `name`, `description`, `datecreation`, `active`)
        VALUES (?, ?, ?, ?, ?)";

        $sth = $this->conn->prepare($query);

        $uuid = $this->gen_uuid();
        
        $sth->execute(array($uuid, $_POST['name'], $_POST['description'], date("Y-m-d"),1)); 

        $query2 = "SELECT * FROM $this->quizTable where active = '1' AND idQuizzes = '$uuid'";

        $response = array();

        $sth = $this->conn->prepare($query2);
        
        $sth->execute();

        while($row = $sth->fetch(PDO::FETCH_ASSOC))
        {
            $response[] = [
                "id" => $row['idQuizzes'],
                "name" => $row['name'],
                "description" => $row['description'],
                "datecreation" => $row['datecreation'],
                "status" => $row['status']
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