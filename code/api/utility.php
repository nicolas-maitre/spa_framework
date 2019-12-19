<?php 
class Utility{

    const _ansTable = 'tblAnswers';
    const _quesTable = 'tblQuestions';
    const _quizTable = 'tblQuizzes';
    const _subTable = 'tblSubmissions';

    static public function getTableAnswers(){
        return self::_ansTable;
    }

    static public function getTableQuestions(){
        return self::_quesTable;
    }

    static public function getTableQuizzes(){
        return self::_quizTable;
    }

    static public function getTableSubmissions(){
        return self::_subTable;
    }
    
    static public function returnJSON ($response){

        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        echo json_encode($response,JSON_PRETTY_PRINT);
    }

    static public function prepareRequest($connexion, $query){

        $request = $connexion->prepare($query);
        $request->execute();

        return $request;
    }

    static private function gen_uuid() {
        return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            // 32 bits for "time_low"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),

            // 16 bits for "time_mid"
            mt_rand( 0, 0xffff ),

            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand( 0, 0x0fff ) | 0x4000,

            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand( 0, 0x3fff ) | 0x8000,

            // 48 bits for "node"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
        );
    }

}
 
    