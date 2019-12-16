<?php 
require_once 'database/database.php';

class Questions
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

    public function deleteQuestion($id)
    {
        $query = "DELETE FROM $this->quesTable WHERE id = ?";
    
        $sth = $this->conn->prepare($query);
        
        $sth->execute($id);

       // show products data in json format
       header('Content-Type: application/json');
	   header('Access-Control-Allow-Origin: *');
       echo json_encode($response,JSON_PRETTY_PRINT);
    }
}