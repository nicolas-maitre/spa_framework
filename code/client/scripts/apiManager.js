function ApiManager(){	
	//CONSTRUCTOR
	function init(){
		//initiateDataClasses();
	}
	/**
	 * method to call api
	 * @param {string} url
	 * @param {object} {}
	 * @return {object} ok and data
	 */
	this.call = async function(url = "", {method = "GET", urlParams = false, bodyParams = false} = {}){
		/* EXEMPLE
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
		//header of request
		var requestHeaders = new Headers({
			"Content-Type": "application/x-www-form-urlencoded"
		});
		var requestInit = { 
			method: method,
			headers: requestHeaders,
		};
		//body of request
		if(bodyParams){
			var requestBody = utils.encodeQuery(bodyParams);
			requestInit.body = requestBody;
		}
		//url params
		var requestUrlParams = "";
		if(urlParams){
			requestUrlParams = "?" + utils.encodeQuery(urlParams);
		}
		//call api
		var apiResponse = await fetch(`${config.apiPath}/${url}${requestUrlParams}`, requestInit);
		//if http error
		if(!apiResponse.ok){
			console.warn("api error : ", apiResponse.status);
			return {ok:false, error:apiResponse.status}
		}
		try{
			var jsonResponse = await apiResponse.json();
		}catch(e){
			console.warn("json couldn't be parsed, error:", e)
			return {ok:false, error:e};
		}
		//if no http error
		return {ok:true, data:jsonResponse};
    };
	/**
	 * get a few data
	 * @param {string} url quizzes, questions or answers
	 * @returns {array} data return by api
	 */
	this.getData = async function(url){
		var res = await callApi(url, "GET");
		return res.ok ? res.data : [];//return only if data
	}
	/**
	 * update data
	 * @param {string} url quizzes, questions or answers
	 * @returns {array} data return by api
	 */
	this.updateData = async function(url, data){
		var res = await callApi(url, "PUT", data);
		return res.ok ? res.data : [];//return only if data
	}
	/**
	 * create data
	 * @param {string} url quizzes, questions or answers
	 * @returns {array} data return by api
	 */
	this.createData = async function(url, data){
		var res = await callApi(url, "POST", data);
		return res.ok ? res.data : [];//return only if data
	}
	/**
	 * delete data
	 * @param {string} url quizzes, questions or answers
	 * @returns {array} data return by api
	 */
	this.deleteData = async function(url){
		var res = await callApi(url, "DELETE");
		return res.ok ? res.data : [];//return only if data
	}
	/**
	 * function to call api function
	 * @param {string} url element and +"/"+id if get, update or delete specific data
	 * @param {string} method GET / POST / PUT / DELETE
	 * @param {object} data data to send in the body of request
	 * @returns {promise} promise return by api
	 */
	function callApi(url, method, data = false){
		var options = {
			method: method,
			bodyParams: data
		}
		return apiManager.call(url, options);
	}

	//init ?
	init();
}