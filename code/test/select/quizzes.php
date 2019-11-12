<?php 

trait MonTrait
{
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

    function getQuestions($id=0)
    {
        $query = "SELECT * FROM $this->quesTable 
        INNER JOIN $this->quizTable on idQuizzes = fk_Quizzes
        WHERE idQuizzes=".$id;
        
        $response = array();
        $result = mysqli_query($this->dbConnect, $query);
     
        while($row = mysqli_fetch_array($result))
        {
            $response[] = [
                "id" => $row['idQuestions'],
                "dataQuestions" => $row['dataQuestions'],
                "name quiz" => $row['name'],
                "statement" => $row['statement'],
                "type" => $row['type'],
                "active" => $row['active']
               
            ];
        }
    

       $this->returndata($response);
    }
}
