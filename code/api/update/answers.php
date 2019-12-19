<?php 

require_once 'database/database.php';
require_once 'utility.php';

class Answers
{

	private $id;

	//Update du nom et de la description d'un quiz
	function updateAnswer($params){
		//Récupération des infos envoyées par la méthode PUT
		parse_str(file_get_contents('php://input'), $_PUT);
		//query
		$query = "UPDATE ". Utility::getTableAnswers() ." SET";
		foreach($_PUT as $index=>$param){
			$query .= " ".$index. "= :".$index.",";
		}
		//Supprime la dernière virgule
		$query = substr($query,0,-1);
		$query .= " WHERE idAnswers = :id";
		//prepare de la query
		$request = Utility::prepareRequest(Database::getConnection(), $query);
		foreach($_PUT as $index=>$param)
		{
			$this->bindParam($request, $index, $param);
		}
		$request->bindParam(':id', $params->answers);
		// Execution
		header('Access-Control-Allow-Origin: *'); 
		$request->execute();
		echo "[]";
	}

	function bindParam($request, $index, $param){
		htmlspecialchars(strip_tags($index));
		$request->bindParam(':'.$index, $param);
	}
}