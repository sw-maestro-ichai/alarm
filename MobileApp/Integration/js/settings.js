$(function(){
       
	$("input:radio[name='cloud']").on("change",function(){
	    if($("input:radio[id='cloudOn']").is(':checked')){
	    $(".second-List").show();
	    } 

	    if($("input:radio[id='cloudOff']").is(':checked')){
	    $(".second-List").hide();
	    } 

	    });
		
	$("input:radio[name='alertLed']").on("click",function(){
		if( $("input:radio[name='basicLed']:checked").val()==
		$("input:radio[name='alertLed']:checked").val()){
			// None 은 중복 가능하도록 만들어줌
			if ( ( $("input:radio[name='alertLed']:checked").val() == "None" ) && ( $("input:radio[name='basicLed']:checked").val() == "None" ) ) {
	    		}
	    		else {
	    			$("input:radio[name='alertLed']:checked").attr("checked",false);
	    			alert("같은 색상으로 변경할 수 없습니다.");
				//	$(this).attr("checked", true);
	    			$('input[name=alertLed][value="None"]').prop('checked','checked');
	    			$("#alert-light-none").removeClass("ui-radio-off").addClass("ui-btn-active ui-radio-on"); 
			}
	    	}
	    	else{
	    	}
	});
	

	$("input:radio[name='basicLed']").on("change",function(){
		if( $("input:radio[name='basicLed']:checked").val()==
		    $("input:radio[name='alertLed']:checked").val()){
		    // None 은 중복 가능하도록 만들어줌
		    if ( ( $("input:radio[name='alertLed']:checked").val() == "None" ) && ( $("input:radio[name='basicLed']:checked").val() == "None" ) ) {
		    }
		else {
		$("input:radio[name='basicLed']:checked").attr("checked",false);
		alert("같은 색상으로 변경할 수 없습니다.");
		//      $(this).attr("checked",true);
		$('input[name=basicLed][value="None"]').prop('checked','checked');
		$("#basic-light-none").removeClass("ui-radio-off").addClass("ui-btn-active ui-radio-on");}
		}
		else{
		}
		});


	$(document).ready(function(){
		$('#OK').click(function(){
		    var cloudOnOff;
		    var moniterOnOff;
		    var soundOnOff;
		    if($("input:radio[name=cloud]:checked").val()=="on"){
		    cloudOnOff=1;
		    }else{
		    cloudOnOff=0;
		    }
		    if($("input:radio[name=monitering]:checked").val()=="on"){
		    moniterOnOff=1;
		    }else{
		    moniterOnOff=0;
		    }
		    if($("input:radio[name=rbtn]:checked").val()=="on"){
		    soundOnOff=1;
		    }else{
		    soundOnOff=0;
		    }
		    location.href="./settingsProc.php?cloudOnOff="+cloudOnOff+"&moniterOnOff="+moniterOnOff+
		    "&basicLed="+$("input:radio[name=basicLed]:checked").val()+
		    "&alertLed="+$("input:radio[name=alertLed]:checked").val()+
		    "&soundOnOff="+soundOnOff;	

		    //		if(!ChkDuplicateLedColor($(':checked'))){
		    // 중복되는 경우. 에러 발생
		    //			alert("평상시, 경고 LED의 색은 달라야합니다.");
		    //		}else{
		    //			alert("설정 완료");
		    //		}

		});


	});


	var ServerIP; // 환경설정 들어갈 때 서버에서 가져와야됨

	function SettingData(dataList){
	    // 설정 데이터 json 클래스

	    this.cloud = $(dataList[0]).attr('value');
	    this.monitering = $(dataList[1]).attr('value');
	    this.basicLEDcolor = $(dataList[2]).attr('value');
	    this.alertLEDcolor = $(dataList[3]).attr('value');
	    this.alertSound = $(dataList[4]).attr('value');
		
	    this.pushDataToServer = function(){
		// Todo 완료 버튼 누르면 서버로 전송하는 코드 작성
	    }	

	    this.pullDataFromServer = function(){
		// Todo Main -> Setting 넘어갈때 기존의 설정값들 서버에서 가져오기
	    }

	}

	function SendDataToServer(){
	}




	function ChkDuplicateLedColor(dataList){
	    if($(dataList[2]).attr('value') === $(dataList[3]).attr('value')){
		return false;
	    }else{
		return true;
	    }
	}

});
