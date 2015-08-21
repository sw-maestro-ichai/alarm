<?
include_once("./dbconfig.php");
$time = $_POST['time'];
$now = date ("Y-m-d H:i:s", time());
 $result=mysql_query("select * from Setting", $connect_db);
    $row= mysql_fetch_object($result);
    $normalLight = $row -> normalLight;
    $alertLight  = $row -> alertLight;
    $cloudOnOff  = $row -> monitoringOnOff;
    $soundOnOff  = $row -> soundOnOff;
    if($soundOnOff=='1'){
       $soundOnOff='ON';
    }else{
       $soundOnOff='OFF';
    }
    
if($_POST['data']=="error"){
	
    sql_query("insert into Monitoring set takeTime = '$time',
				                            isTime   = '$now'
		   	 ");

   
     exec("sudo python WS2801Control.py Alert ".$alertLight." ".$soundOnOff);

	$regid = "APA91bEIHuLU0MpRU14aZ60JSwAtHBiVVcJe7_63Uz7lG1e8tVn3FxCWQsTh8mFYu3Htebb9zuiYZCIy38phR-f3iutguL87nTKQNwfeyNX-RBCMJ0d0C8XzcLGuO7MYdsCNpPaZLqeg";

// 헤더 부분
	$headers = array(
		'Content-Type:application/json',
		'Authorization:key=AIzaSyBL1jbDDyjlYpzTNkjm2vCGPaaWE6tCF6U'
	);

// 푸시 내용, data 부분을 자유롭게 사용해 클라이언트에서 분기할 수 있음.
	$arr = array();
	$arr['data'] = array();
	$arr['data']['title'] = '모니터링 경고'; 
	$arr['data']['message'] = '모니터링에 이상이 발생하였습니다. 서버를 확인하세요.';
	$arr['registration_ids'] = array();
	$arr['registration_ids'][0] = $regid;
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://android.googleapis.com/gcm/send');
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($arr));
	$response = curl_exec($ch);
	curl_close($ch);
	
	// 푸시 전송 결과 반환.
	$obj = json_decode($response);
	
	// 푸시 전송시 성공 수량 반환.
	$cnt = $obj->{"success"};
	
	echo $cnt;


}else{
    sql_query("insert into Monitoring set takeTime = '$time',
		                            		isTime   = '$now'
		   	   ");
     exec("sudo python WS2801Control.py Normal ".$normalLight." ".$soundOnOff);

}




?>
