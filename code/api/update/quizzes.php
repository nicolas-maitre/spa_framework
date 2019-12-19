<?php 

require_once 'database/database.php';
require_once 'utility.php';

class Quizzes
{

	private $id;
   	
	//Update du nom et de la description d'un quiz
	function updateQuiz($id){
		//Récupération des infos envoyées par la méthode PUT
		parse_str(file_get_contents('php://input'), $_PUT);

		//query
		$query = "UPDATE ". Utility::getTableQuizzes() ." SET";
		foreach($_PUT as $index=>$param){
			$query .= " ".$index. "= :".$index.",";
		}
		//Supprime la dernière virgule
		$query = substr($query,0,-1);
		$query .= " WHERE idQuizzes = :id";
		//prepare de la query
		$request = Utility::prepareRequest(Database::getConnection(), $query);

		$this->id=htmlspecialchars(strip_tags($id->quizzes));

		foreach($_PUT as $index=>$param)
		{
			$this->bindParam($request, $index, $param);
		}
		$request->bindParam(':id', $id->quizzes);
		// Execution
		if($request->execute()){
			header('Access-Control-Allow-Origin: *'); 
			return true;
		}
		return false;
	}

	//Update active to 0
	public function deleteQuizz($params)
	{
		//query
		$query = "UPDATE ". Utility::getTableQuizzes() ." SET active = '0' WHERE idQuizzes = :id";
		//prepare de la query
		$request = Utility::prepareRequest(Database::getConnection(), $query);
		
		$this->id = htmlspecialchars(strip_tags($params->quizzes));
		$request->bindParam(':id',$this->id);
		// Execution
		if ($request->execute()) {
			header('Access-Control-Allow-Origin: *');
			return true;
		}
		return false;
	}

	function bindParam($request, $index, $param){
		htmlspecialchars(strip_tags($index));
		$request->bindParam(':'.$index, $param);
	}
}