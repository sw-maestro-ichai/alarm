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
<script>
<? include_once("./dbconfig.php");
$result=mysql_query("select * from Setting", $connect_db);
$row= mysql_fetch_object($result);
?>
$(function(){
	//Setting정보를 첫화면에 세팅
	<?
	if($row->cloudOnOff==1){
	?>
		$('#cloud-on-label').addClass('ui-btn-active');
		$('#cloudOn').attr('checked', true);
		$('#cloud-off-label').removeClass('ui-btn-active');
		$('#cloudOff').attr('checked', false);
	<?
	}else{
	?>
		$('#cloud-off-label').addClass('ui-btn-active');
		$('#cloudOff').attr('checked', true);
		$('#cloud-on-label').removeClass('ui-btn-active');
		$('#cloudOn').attr('checked', false);
		$(".second-List").hide();	
	<?
	}
	?>
	<?
	if($row->monitoringOnOff==1){
	?>
		$('#monitor-on-label').addClass('ui-btn-active');
		$('#monitorOn').attr('checked', true);
		$('#monitor-off-label').removeClass('ui-btn-active');
		$('#monitorOff').attr('checked', false);
	<?
	}else{
	?>
	    	$('#monitor-off-label').addClass('ui-btn-active');
	    	$('#monitoringOff').attr('checked', true);
	    	$('#monitor-on-label').removeClass('ui-btn-active');
	        $('#monitoringOn').attr('checked', false);
	<?
	}
	?>
        <?
	if($row->soundOnOff==1){
	?>
		$('#sound-on-label').addClass('ui-btn-active');
		$('#soundOn').attr('checked', true);
		$('#sound-off-label').removeClass('ui-btn-active');
		$('#soundOff').attr('checked', false);
	<?
    	}else{
	?>
	        $('#sound-off-label').addClass('ui-btn-active');
		$('#rb5').attr('checked', true);
		$('#sound-on-label').removeClass('ui-btn-active');
		$('#rb6').attr('checked', false);
	<?
        }
	?>
    
        $("input:radio[name=alertLed]").each(function(){
	    	if($(this).val()=="<?echo $row->alertLight?>"){
	    		$(this).attr('checked', true);

	    	}else{
	    		$(this).attr('checked', false);
	   	}

	});
        $("input:radio[name=basicLed]").each(function(){
           	if($(this).val()=="<?echo $row->normalLight?>"){
			$(this).attr('checked', true);

		}else{
			$(this).attr('checked', false);
		}

	});

$("#basic-light-<?echo $row->normalLight?>").removeClass("ui-radio-off").addClass('ui-btn-active ui-radio-on');
$("#alert-light-<?echo $row->alertLight?>").removeClass("ui-radio-off").addClass('ui-btn-active ui-radio-on');
});


</script>

<title>Settings</title>
</head>
<body>
<!---->
<section id="Settings" data-role="page" data-position="fixed" data-theme="a">
<header data-role="header">
<a href="./home.php" data-icon="back">뒤로</a>
<h1>환경설정</h1>
<a data-icon="check" data-rel="dialog" data-transition="pop" id="OK">완료</a>
</header>

<div data-role="content">

<!--			-->

<ul data-role="listview" data-inset="true">
<li>
<h4>Cloud</h4>
<fieldset data-role="controlgroup" data-type="horizontal" class="ui-li-aside" data-mini="true">
<label class="CloudState" id="cloud-on-label" for="cloudOn">On</label>
<input type="radio" name="cloud" id="cloudOn" value="on" checked="checked"/>
<label for="cloudOff" id="cloud-off-label">Off</label>
<input type="radio" name="cloud" id="cloudOff" value="off"/>
</fieldset>
</li>

<li class="second-List">
<h4>Monitoring</h4>
<fieldset data-role="controlgroup" data-type="horizontal" class="ui-li-aside" data-mini="true">
<label class="MonitoringState" id="monitor-on-label" for="monitoringOn">On</label>
<input type="radio" name="monitoring" id="monitoringOn" value="on" checked="checked"/>
<label for="monitoringOff" id="monitor-off-label" >Off</label>
<input type="radio" name="monitoring" id="monitoringOff" value="off"/>
</fieldset>
</li>

<li class="BasicLEDstate second-List">
<h4>평상시 LED</h4>
<div class="colorBtnGroup" id="basic-led" data-role="controlgroup" data-type="horizontal" data-mini="true">
<label class="NoneBtn" for="Bnone" id="basic-light-none">None</label>
<input type="radio" name="basicLed" id="Bnone" value="none" />
<label class="RedBtn" for="Bled1" id="basic-light-red">Red</label>
<input type="radio" name="basicLed" id="Bled1" value="red"/>
<label class="BlueBtn" for="Bled2" id="basic-light-blue">Blue</label>
<input type="radio" name="basicLed" id="Bled2" value="blue"/>
<label class="GreenBtn" for="Bled3" id="basic-light-green">Green</label>
<input type="radio" name="basicLed" id="Bled3" value="green"/>
<label class="WhiteBtn" for="Bled4"id="basic-light-white" >White</label>
<input type="radio" name="basicLed" id="Bled4" value="white"/>
</div>
</li>

<li class="second-List">
<h4>경고 LED</h4>
<div class="colorBtnGroup" id="alert-led" data-role="controlgroup" data-type="horizontal" data-mini="true">
<label class="NoneBtn" id="alert-light-none" for="none">None</label>
<input type="radio" name="alertLed" id="none" value="none" />
<label class="RedBtn" id="alert-light-red" for="led1">Red</label>
<input  type="radio" name="alertLed" id="led1" value="red"/>
<label class="BlueBtn" id="alert-light-blue" for="led2">Blue</label>
<input type="radio" name="alertLed" id="led2" value="blue"/>
<label class="GreenBtn" for="led3" id="alert-light-green">Green</label>
<input type="radio" name="alertLed" id="led3" value="green"/>
<label class="WhiteBtn" for="led4" id="alert-light-white">White</label>
<input type="radio" name="alertLed" id="led4" value="white"/>
</div>
</li>

<li class="second-List">
<h4>경고 Sound</h4>
<fieldset data-role="controlgroup" data-type="horizontal" class="ui-li-aside" data-mini="true">
<label class="AlertSndState" for="rb5" id="sound-on-label">On</label>
<input type="radio" name="rbtn" id="rb5" value="on" checked="checked"/>
<label for="rb6" id="sound-off-label">Off</label>
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

