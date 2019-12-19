<?php 

require_once 'database/database.php';
require_once 'utility.php';


class Quizzes

{
	private $id;

    //Update active to 0
    public function deleteQuiz($id){
     
		//query
		$query = "UPDATE ". Utility::getTableQuizzes() ." SET active = '0' WHERE idQuizzes = '$id->quiz'";
			
		$request = Utility::prepareRequest(Database::getConnection(), $query);

		$this->id=htmlspecialchars(strip_tags($id->quiz));	 

		// Execution
		if($request->execute()){
			header('Access-Control-Allow-Origin: *'); 
			return true;
		}
		return false;
    }

}