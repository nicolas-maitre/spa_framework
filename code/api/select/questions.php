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

    public function getAllAnswersFromAllQuestionsFromAQuiz($id){
        $query = "SELECT tblquizzes.idQuizzes, tblquizzes.name, tblquestions.statement,tblquestions.idQuestions, tblanswers.idAnswers, tblanswers.dataAnswers FROM tblquizzes
        INNER JOIN tblquestions ON tblquestions.fk_Quizzes = tblquizzes.idQuizzes
        INNER JOIN tblanswers ON tblanswers.fk_Questions = tblquestions.idQuestions
        WHERE tblquizzes.idQuizzes ='$id->questions'";

        $response = array();
        $sth = $this->conn->prepare($query);
        $sth->execute();

        while($row = $sth->fetch(PDO::FETCH_ASSOC)){
            $response[$row['idQuestions']][] = [
                "statement_Questions" => $row['statement'],
                "id_Answers" => $row['idAnswers'],
                "data_Answers" => $row['dataAnswers']
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

