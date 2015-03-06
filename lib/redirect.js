function redirect_init(){
	var accessToken = getAccessToken('access_token');
	window.close();
	if(accessToken){
		var authorization = 'Bearer ' + access_token
		  $.ajax({
		      url: 'https://api.imgur.com/3/account/me',
		      method: 'GET',
		      headers: {
		          Authorization: authorization,
		          Accept: 'application/json'
		      },
		      success: function(result) {
		        alert(result.data)
		      }
		  });
	}

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
