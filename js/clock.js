function getTime(){
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	
	m = alignTime(m);
	s = alignTime(s);
	
	var time = h + ":" + m + ":" + s;
	
	
	
	if (h > 12){
		
	}
	
	document.getElementById("clock").innerHTML = time;
	setTimeout(getTime, 1000);
}

function alignTime(t){
	if(t < 10){
		t = "0" + t;
	}
	
	return t;
}