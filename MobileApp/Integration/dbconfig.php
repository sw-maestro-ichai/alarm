<?
$mysql_host = 'localhost';
$mysql_user = 'root';
$mysql_password = 'mgmg222';
$mysql_db = 'alarm_db';
$connect_db= mysql_connect($mysql_host,$mysql_user,$mysql_password);
$select_db= mysql_select_db($mysql_db,$connect_db);

?>
