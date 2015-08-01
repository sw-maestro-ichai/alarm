$(document).on('pageinit', '#Environment', function() {
    $.ajax({
      // 결과를 한글로 받을 수 있다.
	  url : "http://api.wunderground.com/api/b39018f807993dcb/geolookup/conditions/lang:KR/q/Korea/Seoul.json",
	  dataType : "jsonp",
	  success : function(parsed_json) {
	  	 var observ = parsed_json.current_observation;
         // 날씨 관측 시간 
		 var weather_time = observ.observation_time;
		 $("#observ_time").append(weather_time);
         // 현재 날씨 아이콘
         var weather_state = "<img src='"+observ.icon_url+"'/>";
         $("#observ_state").append(weather_state);
         // 현재 온도 (섭씨) 
         var weather_temper = observ.temp_c+"°C";
         $("#observ_temper").append(weather_temper);    
         // 현재 습도
         var weather_humi = observ.relative_humidity;
         $("#observ_humi").append(weather_humi);
      }
	});
});