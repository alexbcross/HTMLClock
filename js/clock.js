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
		
		imgSrc = imgSrc + json.currently.icon + ".svg";
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
	getAllAlarms();
}


function showAlarmPopup(){
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

function hideAlarmPopup(){
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

function insertAlarm(time, alarmName){
	$("#alarms").append(
		$("<div>") .addClass("flexable")
			.append(
				$("<div>").addClass("name") .html(alarmName + "      "),
				$("<div>").addClass("time") .html(time),
				$("<button>Delete</button>").attr("id", alarmName)
							.click(function() {
								$(this).parent().remove(); 
								blah(alarmName)
							})
			)
		);
		
		
}

function addAlarm(){
	var hours = $("#hours option:selected").text();
	var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var alarmName = $("#alarmName").val();
	
	var time = hours + ":" + mins + " " + ampm;
		
	var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"time": time,"alarmName": alarmName}, {
      success: function(object) {
        insertAlarm(time, alarmName);
		hideAlarmPopup();
       }
     });

	
}

function getAllAlarms(){
	Parse.initialize("iZl5gAf0XujK9MUmQG7s3Ishl0RjpBnFjKRhcPRt", "gfLcVKBvJ3uY0sIXYbBfF2wTQpx7rpVYyfRXVxNt");
	
	var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            insertAlarm(results[i].get("time"), results[i].get("alarmName"));
          }
        }
    });
}

function blah(alarmName){
	var deleteObject = new Parse.Object.extend("Alarm");
	var query = new Parse.Query(deleteObject);
	query.equalTo("alarmName", alarmName);
	query.find({
		success: function(results) {
			for(var i = 0; i < results.length; i++){
				results[i].destroy();
			}
		}
	})
}