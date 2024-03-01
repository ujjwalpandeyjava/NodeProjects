const axios = require("axios");

var data = {
	"streamId": "strm_eFLEE-LGzkdkcSsslmZDa",
	"sessionId": "AWSALB=IGU9S8lv6fGhRuR5F/ihZxh7tpUXwA/pCZx3XBWj2xEWNPbuAcexdAHqjGPYFhYXtM4qiUZxaw8p7Rh5hA9fGD9BNDDn8PxZNT5w/UNI9OvC9G8PFeaRhuJSQdaR; Expires=Thu, 07 Dec 2023 12:15:57 GMT; Path=/; AWSALBCORS=IGU9S8lv6fGhRuR5F/ihZxh7tpUXwA/pCZx3XBWj2xEWNPbuAcexdAHqjGPYFhYXtM4qiUZxaw8p7Rh5hA9fGD9BNDDn8PxZNT5w/UNI9OvC9G8PFeaRhuJSQdaR; Expires=Thu, 07 Dec 2023 12:15:57 GMT; Path=/; SameSite=None; Secure",
	"Authorization": "Basic c2FuamF5LmNoYWRoYUBzYWZldHlsYWJzLm9yZw:TeMen4hZwvoUa2F6hPL1R"
}

const options = {
	method: 'DELETE',
	headers: {
		accept: 'application/json',
		'content-type': 'application/json',
		authorization: data.Authorization
	},
	body: JSON.stringify({
		session_id: data.sessionId
	})
};

console.log("+++++++++++Deleting\n\n", options);
fetch('https://api.d-id.com/talks/streams/'+data.streamId, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));