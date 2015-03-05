var userid;

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
	// getAllAlarms();
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
								deleteAlarm(alarmName)
							})
			)
		);
		
		
}

function addAlarm(){
	var hours = $("#hours option:selected").text();
	var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var alarmName = $("#alarmName").val();

	ga('send', 'event', 'Alarm', 'Add');
	
	var time = hours + ":" + mins + " " + ampm;
		
	var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"time": time,"alarmName": alarmName, "userid": userid}, {
      success: function(object) {
        insertAlarm(time, alarmName);
		hideAlarmPopup();
       }
     });

	
}


function deleteAlarm(alarmName){
	var deleteObject = new Parse.Object.extend("Alarm");
	var query = new Parse.Query(deleteObject);
	query.equalTo("alarmName", alarmName);
	query.equalTo("userid", userid);
	
	ga('send', 'event', 'Alarm', 'Delete');

	query.find({
		success: function(results) {
			for(var i = 0; i < results.length; i++){
				results[i].destroy();
			}
		}
	})
}



// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.


      FB.api('/me', function(data) {
      	var title = data.name;
      	userid = data.id;
      	if(title[title.length-1] != "s"){
      		title = title + "'s Clock";
      	}
      	else{
      		title = title + "' Clock";
      	}





      	Parse.initialize("iZl5gAf0XujK9MUmQG7s3Ishl0RjpBnFjKRhcPRt", "gfLcVKBvJ3uY0sIXYbBfF2wTQpx7rpVYyfRXVxNt");
	
		var AlarmObject = Parse.Object.extend("Alarm");
	    var query = new Parse.Query(AlarmObject);
	    query.find({
	        success: function(results) {
	          for (var i = 0; i < results.length; i++) {
	          	if(results[i].get("userid") == userid){ 
	            	insertAlarm(results[i].get("time"), results[i].get("alarmName"));
	           	}
	          }
	        }
	    });

      	$(".title").html(title);
      	$("title").html(title);
      	$("#login").addClass("hide");
      });


      
    } /*else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }*/
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
	  FB.init({
	    appId      : '1544779465792217',
	    cookie     : true,  // enable cookies to allow the server to access 
	                        // the session
	    xfbml      : true,  // parse social plugins on this page
	    version    : 'v2.1' // use version 2.1
	  });

	  // Now that we've initialized the JavaScript SDK, we call 
	  // FB.getLoginStatus().  This function gets the state of the
	  // person visiting this page and can return one of three states to
	  // the callback you provide.  They can be:
	  //
	  // 1. Logged into your app ('connected')
	  // 2. Logged into Facebook, but not your app ('not_authorized')
	  // 3. Not logged into Facebook and can't tell if they are logged into
	  //    your app or not.
	  //
	  // These three cases are handled in the callback function.

	  FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));





