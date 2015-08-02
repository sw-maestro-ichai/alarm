<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
 
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css"/>
<link rel="stylesheet" href="./CSS/style_home.css">
<link rel="stylesheet" href="./CSS/style.css">
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
<script src="./js/settings.js"></script>


	<title>Settings</title>
</head>
<body>
<!---->
	<section id="Settings" data-role="page" data-position="fixed" data-theme="a">
		<header data-role="header">
			<a href="Home.html" data-icon="back">뒤로</a>
			<h1>환경설정</h1>
			<a data-icon="check" data-rel="dialog" data-transition="pop" id="OK">완료</a>
		</header>
		
		<div data-role="content">
		
<!--			-->

        <ul data-role="listview" data-inset="true">
            <li>
                <h4>Cloud</h4>
            <fieldset data-role="controlgroup" data-type="horizontal" class="ui-li-aside" data-mini="true">
    		    <label class="CloudState" for="cloudOn">On</label>
			    <input type="radio" name="cloud" id="cloudOn" value="on" checked="checked"/>
    		    <label for="cloudOff">Off</label>
			    <input type="radio" name="cloud" id="cloudOff" value="off"/>
            </fieldset>
            </li>
            
            <li class="second-List">
                <h4>Monitoring</h4>
   	          <fieldset data-role="controlgroup" data-type="horizontal" class="ui-li-aside" data-mini="true">
    		    <label class="MoniteringState" for="moniteringOn">On</label>
			    <input type="radio" name="monitering" id="moniteringOn" value="on" checked="checked"/>
    		    <label for="moniteringOff">Off</label>
			    <input type="radio" name="monitering" id="moniteringOff" value="off"/>
            </fieldset>
			</li>
        
        <li class="BasicLEDstate second-List">
                <h4>평상시 LED</h4>
   	          <div class="colorBtnGroup" data-role="controlgroup" data-type="horizontal" data-mini="true">
    		    <label id="none" class="NoneBtn" for="Bnone">None</label>
			    <input type="radio" name="basicLed" id="Bnone" value="none" checked="checked"/>
    		    <label class="RedBtn" for="Bled1">Red</label>
				<input type="radio" name="basicLed" id="Bled1" value="red"/>
			   <label class="BlueBtn" for="Bled2">Blue</label>
			   <input type="radio" name="basicLed" id="Bled2" value="blue"/>
				 <label class="GreenBtn" for="Bled3">Green</label>
			    <input type="radio" name="basicLed" id="Bled3" value="green"/>
           		<label class="WhiteBtn" for="Bled4">White</label>
			    <input type="radio" name="basicLed" id="Bled4" value="white"/>
            </div>
			</li>
        
        <li class="second-List">
                <h4>경고 LED</h4>
   	          <div class="colorBtnGroup" data-role="controlgroup" data-type="horizontal" data-mini="true">
    		    <label class="NoneBtn" for="none">None</label>
			    <input type="radio" name="alertLed" id="none" value="none" checked="checked"/>
    		    <label class="RedBtn" for="led1">Red</label>
			    <input  type="radio" name="alertLed" id="led1" value="red"/>
           <label class="BlueBtn" for="led2">Blue</label>
			    <input type="radio" name="alertLed" id="led2" value="blue"/>
           <label class="GreenBtn" for="led3">Green</label>
			    <input type="radio" name="alertLed" id="led3" value="green"/>
           <label class="WhiteBtn" for="led4">White</label>
			    <input type="radio" name="alertLed" id="led4" value="white"/>
            </div>
			</li>
        
        <li class="second-List">
                <h4>경고 Sound</h4>
   	          <fieldset data-role="controlgroup" data-type="horizontal" class="ui-li-aside" data-mini="true">
    		    <label class="AlertSndState" for="rb5">On</label>
			    <input type="radio" name="rbtn" id="rb5" value="on" checked="checked"/>
    		    <label for="rb6">Off</label>
			    <input type="radio" name="rbtn" id="rb6" value="off"/>
            </fieldset>
			</li>

        </ul>
        
<!--        -->

		</div>
		
	</section>
<!--	-->
<!--	-->

	<script>
		
	</script>

<!---->
</body>
</html>
