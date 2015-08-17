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
	
    mysql_query("insert into Monitoring set takeTime = '$time',
		                            isTime   = '$now',
					    isSuccess = 'error'	
		   ",$connect_db);

    //shell_exec("python WS2801Control.py Alert White ON"); 
    //system("python WS2801Control.py Alert White ON");
   
     exec("sudo python WS2801Control.py Alert ".$alertLight." ".$soundOnOff);




}else{
    mysql_query("insert into Monitoring set takeTime = '$time',
		                            isTime   = '$now',
                                            isSuccess= 'success'   
		   ",$connect_db);
//     $command = escapeshellcmd('python WS2801Control.py Alert White ON');
//    $output = shell_exec($command);
//    echo $output;
   
  // shell_exec("python WS2801Control.py Alert White ON"); 
  // system("python WS2801Control.py Normal White ON");
     exec("sudo python WS2801Control.py Normal ".$normalLight." ".$soundOnOff);

   

}




?>
