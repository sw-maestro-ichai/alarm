p?php
if( ini_get('safe_mode') ){
echo 'safe';    // Do it the safe mode way
}else{
echo 'not safe';
    // Do it the regular way
}
 
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
