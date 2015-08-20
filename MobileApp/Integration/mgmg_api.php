
<?
@header('Content-Type: application/json;charset=utf-8');
include_once("./dbconfig.php");


function login(){
			       	
	$result;
	$result_text;
	$result = sql_query("select * from Setting where ip='$_POST[ip]'");
	
	if(mysql_num_rows($result)>0){
		$result = "success";
		$result_text = "로그인 되었습니다";
	}else{
  		$result = "fail";
   		$result_text = "로그인에 실패하였습니다.";
	}
	$arr				= array();      
	$arr[result]		= $result;
	$arr[result_text]	= $result_text;

returnFunction($arr);
}

function getSettingInfo(){

	$result;
	$result_text;
	$result = sql_query("select * from Setting where ip='$_POST[ip]");
    $row 	= mysql_fetch_object($result);
    
    
	$arr		        	= array();
	$arr[result]			= 'success';
	$arr[cloudOnOff]    	= $row->cloudOnOff;
	$arr[monitoringOnOff]	= $row->monitoringOnOff;
    $arr[soundOnOff]		= $row->soundOnOff;
	$arr[alertLight]		= $row->alertLight;
	$arr[normalLight]		= $row->normalLight;
	returnFunction($arr);

}

function setSettingInfo(){
    
	sql_query("update Setting set cloundOnOff		= '$_POST[cloudOnOff]',
								  monitoringOnOff	= '$_POST[monitoringOnOff]',
								  soundOnOff		= '$_POST[soundOnOff]',
								  alertLight		= '$_POST[alertLight]',
								  normalLight		= '$_POST[normalLight]
							
							where ip				= '$_POST[ip]'
			 ");

    
	$arr = array();
	$arr[result]		= 'ok';
	$arr[result_text]	= '설정을 변경하였습니다.';
    returnFunction($arr); 
    
}

function getWebLogInfo(){

 	$result  = sql_query("select * from Monitoring order by id desc limit 10");
    $logList = array();
	while($row = mysql_fetch_array($result)){
		$logList[] = $row;

	}
	$arr	 			= array();
	$arr[result]		= 'ok';
	$arr[logList]		= $logList;
	$arr[result_text]	= '웹서비스 모니터링 로그 정보입니다.';
    returnFunction($arr); 
        
}

function getEnvironmentInfo(){
    
	$result = sql_query("select * from Setting");
	$arr = array();
	$arr[result]='ok';
	$arr[result_text]='상뭄권 정보.';
    
return $arr;
    
}
//include_once("./dbconfig.php");
eval($_POST['function']."();");

	function urlencode_data($arg){
		if(is_array($arg)){
			foreach($arg as $k => $v){
				$arg[$k] = urlencode_data($v);
			}
		}else{
			if(gettype($arg) == "string")
				$arg = urlencode($arg);
			if(is_numeric($arg))
				$arg = (float)$arg;
			if(is_int($arg))
				$arg = (int)$arg;
		}

		return $arg;
	}

	function returnFunction($arr){
		$arr2=urlencode_data($arr);
		echo urldecode(json_encode($arr2));
}

?>
	
