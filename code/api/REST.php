<?php
    class Rest
    {

        static private $instance;

        //Credentials
        private $host = 'localhost';
        private $user = 'kaphoot';
        private $password = "GOoTy.0Xn7";
        private $database = "kaphoot_db";

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

        /** BLOC INSERT
         *
         * @param $_POST
         */

        function insertQuiz($insData){

            $query='INSERT INTO tblquizzes (idQuizzes,name,description,datecreation) VALUES (?,?,?,?)';

            $pquery = $this->dbConnect->prepare($query);

            //var_dump($query);

            $uuid = $this->gen_uuid();
            $date = date('Y-m-d');
            $name = $insData['name'];
            $description = $insData['description'];

            $pquery->bind_param("ssss",$uuid,$name,$description,$date);

            $pquery->execute();

            $this->returndata(array("id" => $uuid));
        }

        function getQuizzes()
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

        function getQuiz($id=0)
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

        /** BLOC UPDATE
         *
         *
         */
        function updateQuiz($id)
        {

            $query='UPDATE tblquizzes SET name=?, description=? WHERE idQuizzes=?';

            $pquery = $this->dbConnect->prepare($query);

            $data = json_decode(file_get_contents("php://input"),true);
            $name = $data["name"];
            $description = $data["description"];

            $pquery->bind_param("sss",$name,$description,$id);

            $pquery->execute();

            //Effectuer un test pour savoir si insert OK

            header('Content-Type: application/json');
        }

        /** BLOC DELETE
         * @param $data
         */

        function deleteQuiz($id)
        {
            $query='DELETE FROM tblquizzes WHERE idQuizzes=?';

            $pquery = $this->dbConnect->prepare($query);

            $pquery->bind_param("s",$id);
            $pquery->execute();

            //Effectuer un test pour savoir si insert OK

            header('Content-Type: application/json');
        }


        private function returndata($data)
        {
            header('Content-Type: application/json');
            echo json_encode($data,JSON_PRETTY_PRINT);
			// if this method fails without throwing an error, 
			// it is probably because there are unsupoorted chars inside the data.
        }

        static public function getInstance(){
            if(!isset(self::$instance)) {
                self::$instance = new Rest();
            }
            return self::$instance;
        }

        /** Générateur UUID
         * Source : https://stackoverflow.com/questions/2040240/php-function-to-generate-v4-uuid
         * Date 08.10.2019
         */
        private function gen_uuid() {
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

