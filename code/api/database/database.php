<?php
class Database{
    // specify your own database credentials
    static $host = "localhost";
    static $db_name = "kaphoot_db";
    static $username = "root";
    static $password = 'root';
    static $conn;
 
    // get the database connection
    public static function getConnection(){
 
        try{
            self::$conn = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$db_name, self::$username, self::$password,[ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION ]);
            self::$conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return self::$conn;
    }
}
