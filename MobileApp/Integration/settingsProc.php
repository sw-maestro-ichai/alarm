<? 
include_once("./dbconfig.php");
if($_GET[cloudOnOff]==0){

    $result=mysql_query("update Setting set cloudOnOff='$_GET[cloudOnOff]'",$connect_db);
    if($result){
	echo '<script>location.href="./home.php"</script>';
    }else{
	echo '<script>location.href="./settings.php?data=alert"</script>';
    }
}else{
    $result=mysql_query("update Setting set cloudOnOff='$_GET[cloudOnOff]',
	    moniteringOnOff='$_GET[moniterOnOff]',
	    soundOnOff='$_GET[soundOnOff]',
	    normalLight='$_GET[basicLed]',
	    alertLight='$_GET[alertLed]'", $connect_db);
    if($result){
	echo '<script>location.href="./home.php"</script>';
    }else{
	echo '<script>location.href="./settings.php?data=alert"</script>';
    }
}
?>
