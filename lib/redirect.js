function redirect_init(){
	alert(getAccessToken('access_token'));
	window.close();
}

// function getAccessToken(){
// 	var query = window.location.search.substring(1);
// 	var vars = query.split("&");

// 	for(var i=0; i <vars.length;i++){
// 		var pair = vars[i].split("=");
// 		if(pair[0] == "access_token")
// 			return pair[1];
// 	}
// 	return false;
// }

function GetURLParameter(sParam)
{
   var sPageURL = window.location.hash.substring(1);
   var sURLVariables = sPageURL.split('&');
   for (var i = 0; i < sURLVariables.length; i++)
   {
     var sParameterName = sURLVariables[i].split('=');
     if (sParameterName[0] == sParam)
     {
        return sParameterName[1];
     }
   }
}