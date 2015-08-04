<?
Header("Content-type: text/html; charset=utf-8");
include_once("./dbconfig.php");

$result = mysql_query("select * from Setting where ip='$_GET[ip]'",
	$connect_db);
if(mysql_num_rows($result)>0){
    echo '<script>location.href="./home.php"</script>';

}else{
    echo '<script>location.href="./index.php#login"; alert("ip정보를 확인할 수 없습니다.");
    </script>';
}

?>

