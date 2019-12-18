<?php 

trait MonTrait
{
    function getAllAnswers()
    {
        $query = "SELECT * FROM $this->ansTable";
        $response = array();
        $result = mysqli_query($this->dbConnect, $query);
     
        while($row = mysqli_fetch_array($result))
        {
            $response[] = [
                "id" => $row['idAnswers'],
                "data" => $row['data'],
                "fkQuestion" => $row['fk_Questions'],
                "fkSubmissions" => $row['fk_Submissions']
            ];
        }

       $this->returndata($response);
    }

    function getAnswersByQuizz($id=0)
    {
        $query = "SELECT * FROM $this->ansTable";
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
