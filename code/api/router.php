<?php 

/**
 * Auteur : PASTEUR Kévin
 * Helper : VIEIRA Diogo
 * Date : 21.11.2019
 * Version : 1.0 - 21.11.2019
 * 
 * 
*/

class Router {

    private static $routes = array();


    public static function get($path, $method){
		
        return self::add($path, $method ,'GET');
        
    }
    public static function post($path, $method){
        return self::add($path, $method,  'POST');
    }

    public static function put($path, $method){
        return self::add($path, $method, 'PUT');
    }

    public static function delete($path, $method){
        return self::add($path, $method , 'DELETE');
    }
                                        //controller@laMethode
    public static function add($path, $method, $type){
		
        array_push(self::$routes, array(
            "path"=>$path,
            "method"=>$method,
            "type"=>$type
        ));
        
        
       
    }
    

    public static function run(){
        $idRegex="([0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12})";
        //$textRegex="([A-Za-z]+)";

        $url = parse_url($_SERVER['REQUEST_URI'])['path'];
        $api = '/api';
        $urlcut = substr(stristr ($url, '/api/'), strlen($api) );
		
		
		
        foreach (self::$routes as $route)
        {
            //Sécurité afin de pouvoir laisser l'utilisateur mettre un / ou non à la fin de l'url
            if(substr($urlcut,-1)!="/")
            $urlcut.="/";

			
            $regex='^'.str_replace(array("/","id"),array("\/",$idRegex),$route['path']).'$';

		
            if(preg_match(strtolower("#".$regex."#"),strtolower($urlcut),$matches))
            {
				
				
                $arraySorted=self::sortArray($route["path"],$matches);
                
				
                self::execute($route["method"],$arraySorted);
				
                exit;
            }
			
        }
				echo 'route incorrect';
				
				http_response_code(400);
				exit;
        //self::execute(self::$dirController."/controller@error",(object)array("error"=>"Error 404 | page not found","message"=>$_SERVER['HTTP_HOST'].$url));
    }

    private static function sortArray($route,$params)
    {

        $params=array_slice($params, 1);
		
        $route=explode("/",$route);
		

        $arraySorted=array();
        $iParams=0;
        //search on the route the text "id" and before data is associated with value of params
        for($iRoute=0;$iRoute<count($route);$iRoute++){
            if($route[$iRoute]=="id"){
                $arraySorted=array_merge($arraySorted,array($route[ ($iRoute==0 ? "1" : $iRoute)-1 ]=>$params[ $iParams++ ]));
			}
		}
                
				
        return $arraySorted;
        
    }

    private static function execute($function,$param)
	{
		
        $controller=explode('@',$function); 
		
        $class=explode('/', $controller[0])[1];		
        $controller[0]=$controller[0].'.php';
		
        require_once("./$controller[0]");		

        $method=$controller[1];
		
        if( !empty($param) || count($param)>=1 )
            //convert $parm to object for easier use
            
            (new $class)->$method((object)$param);
        else
            (new $class)->$method();
           
    }
}