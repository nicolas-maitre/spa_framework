function ApiManager(){	
    this.call = async function(url = "", {method = "GET", urlParams = false, bodyParams = false} = {}){
        /*
        url: string (from api endpoint)
        options: {
			method: [GET(default), PUT, POST, DELETE]
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
        var requestHeaders = new Headers();
		var requestInit = { 
			method: method,
			headers: requestHeaders,
		};

		var apiResponse = await fetch(`${config.apiPath}/${url}`, requestInit);
		
		if(!apiResponse.ok){
			console.warn("api error", apiResponse.status);
			return {ok:false, error:apiResponse.status}
		}
		
		var jsonResponse = await apiResponse.json();
		
		return {ok:true, data:jsonResponse};
    };
	
	//CONSTRUCTOR
	function init(){
		//initiateDataClasses();
	}
	init();
}