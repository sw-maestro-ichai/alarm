/*
 * Using Weather api (www.wunderground.com) 
 * Display current weather infomation
 * connect by Ajax
 */
$(document).on('pageinit', '#Environment', function() {
//$(document).delegate('#Home', 'pageinit', function() {
    //getLocation();
    // 역삼 2동 : 61, 125
    xml2jsonCurrentWth(61,125);
	// id = monitor
	//$(this).find('#button-group').find('a').bind('click', function () {
	//	window.location.href = "environment.php?="+window.obTime;
	//});
});

//$(document).delegate('#Environment', 'pageshow', function() {
//	var obDate = location.href.substr(location.href.indexOf('=') + 1, 10);
//	var obTime = location.href.substr(location.href.lastIndexOf('=') + 1);
//	$('#observ_time').html('<div>'+obDate+' '+obTime+'</div>');
//});

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, geo_options);
    }else{
        console.log("지오 로케이션 없음")
    }
};

function locationSuccess(p){
    var latitude = p.coords.latitude,
        longitude = p.coords.longitude;
    var rs = dfs_xy_conv("toXY",latitude,longitude);
    // 위도/경도 -> 기상청 좌표x / 좌표 y 변환
    xml2jsonCurrentWth(rs.nx, rs.ny);
}

function locationError(error){
    var errorTypes = {
        0 : "무슨 에러냥~",
        1 : "허용 안눌렀음",
        2 : "위치가 안잡힘",
        3 : "응답시간 지남"
    };
    var errorMsg = errorTypes[error.code];
    console.log(errorMsg)
}

var geo_options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
};

var RE = 6371.00877; // 지구 반경(km)
var GRID = 5.0; // 격자 간격(km)
var SLAT1 = 30.0; // 투영 위도1(degree)
var SLAT2 = 60.0; // 투영 위도2(degree)
var OLON = 126.0; // 기준점 경도(degree)
var OLAT = 38.0; // 기준점 위도(degree)
var XO = 43; // 기준점 X좌표(GRID)
var YO = 136; // 기1준점 Y좌표(GRID)

function dfs_xy_conv(code, v1, v2) {
    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;
    
    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);
    var rs = {};

    if (code == "toXY") {
        rs['lat'] = v1;
        rs['lng'] = v2;
        var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        var theta = v2 * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs['nx'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs['ny'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    }
    else {
        rs['nx'] = v1;
        rs['ny'] = v2;
        var xn = v1 - XO;
        var yn = ro - v2 + YO;
        ra = Math.sqrt(xn * xn + yn * yn);
        if (sn < 0.0) - ra;
        var alat = Math.pow((re * sf / ra), (1.0 / sn));
        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

        if (Math.abs(xn) <= 0.0) {
            theta = 0.0;
        }
        else {
            if (Math.abs(yn) <= 0.0) {
                theta = Math.PI * 0.5;
                if (xn < 0.0) - theta;
            }
            else theta = Math.atan2(xn, yn);
        }
        var alon = theta / sn + olon;
        rs['lat'] = alat * RADDEG;
        rs['lng'] = alon * RADDEG;
    }
    return rs;
}

function xml2jsonCurrentWth(nx, ny){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();

    if(minutes < 30){
        // 30분보다 작으면 한시간 전 값
        hours = hours - 1;
        if(hours < 0){
            // 자정 이전은 전날로 계산
            today.setDate(today.getDate() - 1);
            dd = today.getDate();
            mm = today.getMonth()+1;
            yyyy = today.getFullYear();
            hours = 23;
        }
    }
    if (hours<10) {
        hours='0'+hours;
    }
    if(mm<10) {
        mm='0'+mm;
    }
    if(dd<0) {
        dd='0'+dd;
    }
    

    var _nx = nx,
    _ny = ny,
    apikey = "aD9gb9TzmblXnJnqUvlKuOuoSYULoFjzXUN6jPQ2CGrlB3vnXCXm0yxzZA6N%2FlmoNjvi7rSDe9nfLTvg9wuGrw%3D%3D",
    today = yyyy+""+mm+""+dd,
    basetime = hours + "00",
    fileName = "http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService/ForecastGrib";
    fileName += "?ServiceKey=" + apikey;
    fileName += "&base_date=" + today;
    fileName += "&base_time=" + basetime;
    fileName += "&nx=" + _nx + "&ny=" + _ny;
    fileName += "&pageNo=1&numOfRows=300";
    fileName += "&_type=json";

    $.ajax({
        url: fileName,
        type: 'GET',
        cache: false,
        success: function(data) {
            var myXML = rplLine(data.responseText);
            var indexS = myXML.indexOf("<body>"),
            indexE = myXML.indexOf("</body>"),
            result = myXML.substring(indexS + 6, indexE);
            var jsonObj = $.parseJSON('[' + result + ']'),
            rainsnow = jsonObj[0].response.body.items.item[1].obsrValue,
            humi = jsonObj[0].response.body.items.item[2].obsrValue,
            sky = jsonObj[0].response.body.items.item[4].obsrValue,
            temp = jsonObj[0].response.body.items.item[5].obsrValue;

            var observTime = '<div>'+yyyy+'-'+mm+'-'+dd+'&nbsp;'+hours+':00</div>'; 
            //$(this).attr('observ', observTime);
            //window.obTime = yyyy+'-'+mm+'-'+dd+'='+hours+':00';
			$('#observ_time').html(observTime);

            var skyState = '';
            if (sky == 1) {
                skyState = '<div>맑음</div>';
            }
            else if (sky == 2) {
                skyState = '<div>구름 조금</div>';
            }
            else if (sky == 3) {
                skyState = '<div>구름 많음</div>';
            }
            else {
                skyState = '<div>흐림</div>';
            }
            //$(this).attr('skysnow', skyState);
			$('#skyState').html(skyState);

            var temperature = '<div>'+temp+'°C</div>';
            //$(this).attr('temp', temperature);
			//window.temp = temperature;
			$('#temperature').html(temperature);

            var rainsnowState = '';
            if (rainsnow == 0) {
                rainsnowState = '<div>없음</div>';
            }
            else if (rainsnow == 1) {
                rainsnowState = '<div>비</div>';
            }
            else if (rainsnow == 2) {
                rainsnowState = '<div>비와 눈</div>';
            }
            else {
                rainsnowState = '<div>눈</div>';
            }
            //$(this).attr('rain', rainsnowState);
			//window.rs = rainsnowState;
			$('#rainsnow').html(rainsnowState);

            var humidity = '<div>'+humi+'%</div>';
            //$(this).attr('humi', humidity);
			//window.humi = humidity;
			$('#humidity').html(humidity);
        },
        error:function(request,status,error){
            alert("다시 시도해주세요.\n" + "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
     
}

function rplLine(value){
    if (value != null && value != "") {
        return value.replace(/\n/g, "\\n");
    }else{
        return value;
    }
}

