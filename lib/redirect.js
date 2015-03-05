function redirect_init(){
	console.log("Printing Hash:");
	alert(getURLParameter('access_token'));
	window.close();
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location)||[,""])[1].replace(/\+/g, '%20'))||null
}