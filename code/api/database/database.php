<?php
class Database{
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "kaphoot_db";
    private $username = "kaphoot_db";
    private $password = 'Pa$$w0rd';
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password,[ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION ]);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
