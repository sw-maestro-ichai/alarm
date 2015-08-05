/*
 * Using Weather api (www.wunderground.com) 
 * Display current weather infomation
 * connect by Ajax
 */
$(document).on('pageinit', '#Environment', function() {
    $.ajax({
      // can get weather infomation by korean
	  url : "http://api.wunderground.com/api/b39018f807993dcb/geolookup/conditions/lang:KR/q/Korea/Seoul.json",
	  dataType : "jsonp",
	  success : function(parsed_json) {
	  	 var observ = parsed_json.current_observation;
         // observation time
		 var weather_time = observ.observation_time;
		 $("#observ_time").append(weather_time);
         // current weather icon
         var weather_state = "<img src='"+observ.icon_url+"'/>";
         $("#observ_state").append(weather_state);
         // current temperature (celsius) 
         var weather_temper = observ.temp_c+"°C";
         $("#observ_temper").append(weather_temper);    
         // current humidity
         var weather_humi = observ.relative_humidity;
         $("#observ_humi").append(weather_humi);
      }
	});
});