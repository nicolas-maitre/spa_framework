function ApiManager(){
    //direct call
    this.get = {};
    this.put = {};
    this.update = {};
    this.delete = {};

    //create self properties tree
    fetch("/views/manage.php")
    .then(function(response){
        return response.text();
    })
    .then(function(text){
        //console.log("fetch test", text);
    });

    this.call = function(url, options){
        /*
        url: string
        options: {
            urlParams: array of {
                name: string,
                value: any
            }
            bodyParams: array of {
                name: string,
                value: any
            }
        }
        */
        
    };
	
	//CONSTRUCTOR
	function init(){
		//initiateDataClasses();
	}
	init();
}