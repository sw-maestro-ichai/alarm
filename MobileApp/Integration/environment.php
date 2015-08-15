<html> 
<head> 
	<title>근무 환경</title> 

	<meta name="viewport" content="width=device-width, initial-scale=1" charset="utf-8"> 
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css"/>
    <link rel="stylesheet" href="CSS/style_home.css">
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script src="./js/weather.js"></script>
    <script src="./lib/jquery.xdomainajax.js"></script>
    <? include_once("./dbconfig.php");
    	$result=mysql_query("select * from Setting", $connect_db);
    	$row= mysql_fetch_object($result);
    ?>
    </head> 
<body> 


<section id="Environment" data-role="page">

	<div data-role="header">
		<h1>근무 환경</h1>
        <a href="./home.php" data-icon="back">뒤로</a>
	</div>

	<div data-role="content">
			<h2>실외 날씨</h2>
            <ul data-role="listview" data-inset="true" data-type="horizontal">
                <li><div id="observ_time" align="right" class="ui-li-count"></div></li>
                <li>날씨<div id="skyState" class="ui-li-aside" align="right"></div></li>
                <li>온도<div id="temperature" class="ui-li-aside"></div></li>
                <li>강수 상태<div id="rainsnow" class="ui-li-aside"></div></li>
                <li>습도<div id="humidity" class="ui-li-aside"></div></li>
            </ul>
        
            <h2>사무실</h2>
            <ul data-role="listview" data-inset="true" data-type="horizontal">
                <li>온도<div class="ui-li-aside"><?echo $row->temperature?></div></li>
                <li>습도<div class="ui-li-aside"><?echo $row->humidity?></div></li>
        </ul>
	</div>

    </section>
</body>
</html>
