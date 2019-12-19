<?php
require_once 'database/database.php';
require_once 'utility.php';

class Questions
{
	private $id;

	//Update active to 0
	public function deleteQuestion($id)
	{
		//query
		$query = "UPDATE ". Utility::getTableQuestions() ." SET active = '0' WHERE idQuestions = :id";
		//prepare de la query
		$request = Utility::prepareRequest(Database::getConnection(), $query);
		
		$this->id = htmlspecialchars(strip_tags($id->questions));
		
		$request->bindParam(':id',$this->id);
		
		// Execution
		if ($request->execute()) {
			header('Access-Control-Allow-Origin: *');
			return true;
		}
		return false;
	}

	//update content
	public function updateQuestion($params){
		//Récupération des infos envoyées par la méthode PUT
		parse_str(file_get_contents('php://input'), $_PUT);
		//query
		$query = "UPDATE ". Utility::getTableQuestions() ." SET";
		foreach($_PUT as $index=>$param){
			$query .= " `$index` = :$index,";
		}
		//Supprime la dernière virgule
		$query = substr($query,0,-1);
		$query .= " WHERE idQuestions = :id";
		//prepare de la query
		$request = Utility::prepareRequest(Database::getConnection(), $query);
		$this->id=htmlspecialchars(strip_tags($params->question));
		foreach($_PUT as $index=>$param)
		{
			$this->bindParam($request, $index, $param);
		}
		$request->bindParam(':id', $params->questions);
		// Execution
		if($request->execute()){
			header('Access-Control-Allow-Origin: *'); 
			return true;
		}
		return false;
	}

	function bindParam($request, $index, $param)
	{
		htmlspecialchars(strip_tags($index));
		$request->bindParam(':' . $index, $param);
	}
}