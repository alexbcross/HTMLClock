function redirect_init(json){
	console.log("Printing Hash:");
	alert(getURLParameter('access_token'));
	window.close();
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}