function ApiManager(){	
    this.call = async function(url = "", {method = "GET", urlParams = false, bodyParams = false} = {}){
        /*
        url: string (from api endpoint)
        options: {
			method: [GET(default), PUT, POST, DELETE]
            urlParams: {
				name: value
			}
            bodyParams: {
				name: value
			}
        }
        */
		var requestHeaders = new Headers({
			"Content-Type": "application/x-www-form-urlencoded"
		});

		var requestInit = { 
			method: method,
			headers: requestHeaders,
		};

		//body
		if(bodyParams){
			var requestBody = "";
			for(var indParam in bodyParams){
				requestBody += encodeURIComponent(indParam);
				requestBody += "=";
				requestBody += encodeURIComponent(bodyParams[indParam]);
				requestBody += "&";
			}
			requestBody = requestBody.slice(0, -1);
			requestInit.body = requestBody;
		}
		//url params
		var requestUrlParams = "";
		if(urlParams){
			requestUrlParams = "?";
			for(var indParam in urlParams){
				requestUrlParams += encodeURIComponent(indParam);
				requestUrlParams += "=";
				requestUrlParams += encodeURIComponent(urlParams[indParam]);
				requestUrlParams += "&";
			}
			requestUrlParams = requestUrlParams.slice(0, -1);
		}

		var apiResponse = await fetch(`${config.apiPath}/${url}${requestUrlParams}`, requestInit);
		
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