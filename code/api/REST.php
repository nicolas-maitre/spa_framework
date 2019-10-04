<?php


    class Rest
    {

        static private $instance;

        //Credentials
        private $host = 'localhost';
        private $user = 'root';
        private $password = "root";
        private $database = "kaphootdb";

        //Définition des tables dans la bdd
        private $ansTable = 'tblanswers';
        private $quesTable = 'tblquestions';
        private $quizTable = 'tblquizzes';


        private $dbConnect = false;

        //Constructeur de la base de données
        public function __construct()
        {
            if (!$this->dbConnect) {
                $conn = new mysqli($this->host, $this->user, $this->password, $this->database);
                if ($conn->connect_error) {
                    //Return avec erreur 500 (A modifier)
                    die("Error failed to connect to MySQL: " . $conn->connect_error);
                } else {
                    $this->dbConnect = $conn;
                }
            }
        }

        function getExercises()
        {
            $query = "SELECT * FROM $this->quizTable";
            $response = array();
            $result = mysqli_query($this->dbConnect, $query);
            while($row = mysqli_fetch_array($result))
            {
                $response[] = [
                    "id" => $row['idQuizzes'],
                    "name" => $row['1'],
                    "description" => $row['2'],
                    "datecreation" => $row['3']
                ];
            }

            $this->returndata($response);
        }

        function getExercise($id=0)
        {
            $query = "SELECT * FROM $this->quizTable";
            if($id != 0)
            {
                $query .= " WHERE idQuizzes=".$id." LIMIT 1";
            }
            $response = array();
            $result = mysqli_query($this->dbConnect, $query);
            while($row = mysqli_fetch_array($result))
            {
                $response[] = [
                    "id" => $row['idQuizzes'],
                    "name" => $row['1'],
                    "description" => $row['2'],
                    "datecreation" => $row['3']
                ];
            }

            $this->returndata($response);
        }


        private function returndata($data)
        {

            header('Content-Type: application/json');
            echo json_encode($data,JSON_PRETTY_PRINT);
        }

        static public function getInstance(){
            if(!isset(self::$instance)) {
                self::$instance = new Rest();
            }
            return self::$instance;
        }
    }

