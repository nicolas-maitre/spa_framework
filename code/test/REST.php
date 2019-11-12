<?php

$path = $type."/".$name.".php";
require_once($path);

    class Rest
    {
        use MonTrait;
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

        /** Generator UUID
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

