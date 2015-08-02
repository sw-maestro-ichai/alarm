<?
$mysql_host = 'localhost';
$mysql_user = 'hbyullee';
$mysql_password = 'casper';
$mysql_db = 'alarm_db';
$connect_db= mysql_connect($mysql_host,$mysql_user,$mysql_password);
$select_db= mysql_select_db($mysql_db,$connect_db);

?>
