<?php 

$test = $_SERVER['REQUEST_URI'];
$id = substr(strrchr($test, '/'), 1 );


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
}
