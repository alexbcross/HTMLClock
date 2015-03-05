var clientID;
var type;
var callbackFunction;

function init(json){
	localStorage.setItem('clientID', json.client_id);
	localStorage.setItem('type', json.type);
	localStorage.setItem('callbackFunction', json.callback_function);
}

function login() {
	var url = "https://api.imgur.com/oauth2/authorize?client_id=81098a8e7579297 
		&response_type=token&state=okay";

	imgurLoginWindow=window.open(url, "ImgurLogin",
		"location=1,scrollbars=1,"+
		"width="+500+",height="+300);
}