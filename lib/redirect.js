function redirect_init(){
	alert(window.getAccessToken());
	window.close();
}

function getAccessToken(){
	var query = window.location.search.substring(1);
	var vars = query.split("&");

	for(var i=0; i <vars.length;i++){
		var pair = vars[i].split("=");
		if(pair[0] == "access_token")
			return pair[1];
	}
	return false;
}