<?
@header("Content-Type: application/json;charset=utf-8");
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


$arr = urlencode_data($arr);
echo json_encode($arr);
?>
