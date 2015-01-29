function getTime(){
	var date = new Date();
	var h = date.getHours() % 12;
	var m = date.getMinutes();
	var s = date.getSeconds();
	
	m = alignTime(m);
	s = alignTime(s);
	
	var time = h + ":" + m + ":" + s;
	
	
	
	if (h > 12){
		
	}
	
	$("#clock").html(time);
	setTimeout(getTime, 1000);
}

function alignTime(t){
	if(t < 10){
		t = "0" + t;
	}
	
	return t;
}

function getTemp(){
	var imgSrc = "img/";
	var maxTemp;
	
	$.getJSON("https://api.forecast.io/forecast/c173b25a2b8409c9b60653479a83787c/35.300399,-120.662362?callback=?", function(json){
	
		$("#forecastLabel").html(json.daily.summary);
		
		imgSrc = imgSrc + json.daily.icon + ".svg";
		$("#icon").attr('src', imgSrc);
		
		maxTemp = json.daily.data[0].temperatureMax;
		setColor(maxTemp);
	});
}

function setColor(temp){
	if(temp < 60){
		$("body").addClass("cold");
	}
	
	else if(temp < 70){
		$("body").addClass("chilly");
	}
	
	else if(temp < 80){
		$("body").addClass("nice");
	}
	
	else if(temp < 90){
		$("body").addClass("warm");
	}
	
	else{
		$("body").addClass("hot");
	}
}

function load(){
	getTime();
	getTemp();
}