function redirect_init(){
	alert(getAccessToken('access_token'));
	window.close();
}

function getAccessToken(){
	var query = window.location.hash.substring(1);
	var vars = query.split("&");

	for(var i=0; i <vars.length;i++){
		var pair = vars[i].split("=");
		if(pair[0] == "access_token")
			return pair[1];
	}
	return 'I got this far, but can\'t figure out how to extract the access token from the hash';
}
