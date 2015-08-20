<?php
$regid = "APA91bEIHuLU0MpRU14aZ60JSwAtHBiVVcJe7_63Uz7lG1e8tVn3FxCWQsTh8mFYu3Htebb9zuiYZCIy38phR-f3iutguL87nTKQNwfeyNX-RBCMJ0d0C8XzcLGuO7MYdsCNpPaZLqeg";

// 헤더 부분
$headers = array(
		'Content-Type:application/json',
		'Authorization:key=AIzaSyBL1jbDDyjlYpzTNkjm2vCGPaaWE6tCF6U'
);

// 푸시 내용, data 부분을 자유롭게 사용해 클라이언트에서 분기할 수 있음.
$arr = array();
$arr['data'] = array();
$arr['data']['title'] = '푸시 테스트';
$arr['data']['message'] = '푸시 내용 ABCD~';
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



if( ini_get('safe_mode') ){
echo 'safe';    // Do it the safe mode way
}else{
echo 'not safe';
    // Do it the regular way
}
  // echo shell_exec("ls -al"); 
   echo shell_exec("sudo python WS2801Control.py Alert White ON");
   //echo exec("python White.py");
   //echo shell_exec("python White.py");
   //echo system("python White.py");
    echo system("sudo python WS2801Control.py Alert White ON");

  echo exec("sudo python WS2801Control.py Alert White ON");

   $processUser = posix_getpwuid(posix_geteuid());
   print $processUser['name'];
   
   
//www-data chown , php_ini disable function remove,  safe_mode 
//sudo chmod 777 /dev/vchiq
// 

?>
