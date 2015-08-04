<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <title>Casper</title>
    <link rel="stylesheet" href="./lib/jquery.mobile.min.css" />
    <link rel="stylesheet" href="./lib/jquery.jqplot.min.css" />
    <link rel="stylesheet" href="./CSS/style_home.css">
    <link rel="stylesheet" href="./CSS/base.css">
    
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css"/>
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script src="./lib/jquery.jqplot.min.js"></script>
    <script src="./lib/jqplot.canvasAxisLabelRenderer.min.js"></script>
    <script src="./lib/jqplot.canvasTextRenderer.min.js"></script>
</head>

<body>
 <? include_once("./dbconfig.php");
  $result=mysql_query("select * from Monitoring",$connect_db);
  $text=''; 
    
 ?>
 <script> $(function(){ var DataList=[]; 
 <?
 $i=0; 
 $dateX=0;
 while($row=mysql_fetch_array($result)){
	         
		 $temp=$row;
	          $text .= '<li><a href="#"><h3 style="margin:5px"> 모니터링 시간 </h3> 
		      <span style="margin-left:5px" >'.$row[isTime].'</span>
		      <span class="ui-li-count" id ="sec" style="font-size:15px; color:gray;">'
		      .$row[takeTime].'sec </span></a></li>';
		      ?>
		    DataList[<?echo $i?>] =[<?echo $dateX?>,<?echo $temp[takeTime]?>];
	        
 <?             $i++;
                $dateX=$dateX-10;
		      }
		        $test2='';     
		          $test2='$.jqplot ("chart1", [DataList],{
			                                       title:"상태 그래프",
				                                 animate:true,
				                                   axes: {
				                                         xaxis: {
				                                               label: "분 전(min)",
				                                                 pad: 0
				                                               },
				                                                 yaxis: {
				                                                      label: "소요 시간(sec)"
					                                             }
					                                           }
					                                         });
		                       $( "#log-list" ).listview( "refresh" );';
			     echo $test2;

 ?>
 });
</script>

<section id="webLog" data-role="page">
        <header data-role="header">
        <a href="./home.php" data-icon="back">뒤로</a>
        <h1>웹 서비스 모니터링</h1>
        </header>
        
        <div data-role="content">
        <div id="chart1"> </div>
        <ul data-role="listview" data-inset="true" id="log-list">
            <li data-role="divider" class="log-header" data-theme="b">상세 로그 기록</li>
            <? echo $text;?>
        </ul>
        </div>
    </section>
</body>
</html>
