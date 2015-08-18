$(function(){
       
	$("input:radio[name='cloud']").on("change",function(){
	    if($("input:radio[id='cloudOn']").is(':checked')){
	    $(".second-List").show();
	    } 

	    if($("input:radio[id='cloudOff']").is(':checked')){
	    $(".second-List").hide();
	    } 

	});

    // DB에서 모든 데이터를 불러와 페이지가 완성됐을 때 진입
    $(document).ready(function() {
        // 현재 체크되어있는 radio button이 있다면initValue에 저장
        if ($("input:radio[name='alertLed']:checked").length > 0) {
            var initAlertValue = $("input:radio[name='alertLed']:checked").val();
            $("input:radio[name='alertLed']").prop("init", initAlertValue);
        }
        if ($("input:radio[name='basicLed']:checked").length > 0) {
            var initBasicValue = $("input:radio[name='basicLed']:checked").val();
            $("input:radio[name='basicLed']").prop("init", initBasicValue);
        }
    });

    // alert 시 LED setting event
    $("input:radio[name='alertLed']").on("change",function(){
	    if( $("input:radio[name='basicLed']:checked").val() == $("input:radio[name='alertLed']:checked").val()) {
		    // None 은 중복 가능하도록 만들어줌
		    if ( ( $("input:radio[name='alertLed']:checked").val() == "None" ) && ( $("input:radio[name='basicLed']:checked").val() == "None" ) ) {
	    	}
	        else {
                // 중복되기 전에 선택됐던 값을 가져옴
                var preCheckedValue = $("input:radio[name='alertLed']").prop("checkedval");
                $("input:radio[name='alertLed']:checked").attr("checked",false);
	            // radio button을 누른 적이 있는가? 없다면 undefined이므로 else절로 이동
                if (preCheckedValue != undefined) { 
                    alert("같은 색상으로 변경할 수 없습니다.");
	                //      $(this).attr("checked",true);
	                $('input[name=alertLed][value="'+preCheckedValue+'"]').prop('checked','checked');
	                $("#alert-light-none").removeClass("ui-radio-off").addClass("ui-btn-active ui-radio-on");
                }
                else {
                    // 페이지를 로딩한 후 처음 선택한 radio button이 중복일 경우 처음 선택값으로 선택되도록 해줌
                    var initValue = $("input:radio[name='alertLed']").prop("init");
                    $('input[name=alertLed][value="'+initValue+'"]').prop('checked','checked');
                }
            }
	    }
	    else{
        }
        // 가장 최근에 선택된 값을 저장
        var checkedvalue = $("input:radio[name='alertLed']:checked").val();
        $("input:radio[name='alertLed']").prop("checkedval", checkedvalue);
	});

    // 평상 시 LED setting event
	$("input:radio[name='basicLed']").on("change",function(){
        if( $("input:radio[name='basicLed']:checked").val() == $("input:radio[name='alertLed']:checked").val()) {
            // None 은 중복 가능하도록 만들어줌
		    if ( ( $("input:radio[name='alertLed']:checked").val() == "None" ) && ( $("input:radio[name='basicLed']:checked").val() == "None" ) ) {
		    }
		    else {
                // 중복되기 전에 선택됐던 값을 가져옴
                var preCheckedValue = $("input:radio[name='basicLed']").prop("checkedval");
		        $("input:radio[name='basicLed']:checked").attr("checked",false);
		        // radio button을 누른 적이 있는가? 없다면 undefined이므로 else절로 이동
                if (preCheckedValue != undefined) { 
                    alert("같은 색상으로 변경할 수 없습니다.");
		            //      $(this).attr("checked",true);
		            $('input[name=basicLed][value="'+preCheckedValue+'"]').prop('checked','checked');
		            $("#basic-light-none").removeClass("ui-radio-off").addClass("ui-btn-active ui-radio-on");
                }
                else {
                    // 페이지를 로딩한 후 처음 선택한 radio button이 중복일 경우 처음 선택값으로 선택되도록 해줌
                    var initValue = $("input:radio[name='basicLed']").prop("init");
                    $('input[name=basicLed][value="'+initValue+'"]').prop('checked','checked');
                }
            }
		}
		else{
            // 가장 최근에 선택된 값을 저장
            var checkedvalue = $("input:radio[name='basicLed']:checked").prop("checkedval");
            $("input:radio[name='basicLed']").prop("checkedval", checkedvalue);
		}
    });

    // ok button눌렸을 때
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
