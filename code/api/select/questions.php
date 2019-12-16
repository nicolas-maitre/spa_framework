<?php 

trait MonTrait
{
    function getQuestions()
    {
        $query = "SELECT * FROM $this->quesTable WHERE active=1";
        $response = array();
        $result = mysqli_query($this->dbConnect, $query);
     
        while($row = mysqli_fetch_array($result))
        {
            $response[] = [
                "id" => $row['idQuestions'],
                "dataQuestions" => $row['dataQuestions'],
                "fkQuizzes" => $row['fk_Quizzes'],
                "statement" => $row['statement'],
                "type" => $row['type'],
                "active" => $row['active']
               
            ];
        }
    

       $this->returndata($response);
    }

    function getQuestion($id=0)
    {
        $query = "SELECT * FROM $this->quesTable";
        if($id != 0)
        {
            $query .= " WHERE idQuestions=".$id." AND active=1 LIMIT 1";
        }
        $response = array();
        $result = mysqli_query($this->dbConnect, $query);
        while($row = mysqli_fetch_array($result))
        {
            $response[] = [
                "id" => $row['idQuestions'],
                "name" => $row['1'],
                "description" => $row['2'],
                "datecreation" => $row['3']
            ];
        }

        $this->returndata($response);
    }
}
