function redirect_init(){
	localStorage.setItem("accessToken", getAccessToken('access_token'));
	window.close();
	window.opener.imgurCallback();
}

function getAccessToken(){
	var query = window.location.hash.substring(1);
	var vars = query.split("&");

	for(var i=0; i <vars.length;i++){
		var pair = vars[i].split("=");
		if(pair[0] == "access_token")
			return pair[1];
	}
	return false;
}
