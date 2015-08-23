
$(function(){
    getSettingInfo();

	function getSettingInfo(){
    
		$.ajax({
      // 결과를 한글로 받을 수 있다.
			   url : "http://"+localStorage.ipAddress+"/mgmg_api.php",
		  dataType : "html",
	          type : "POST",
	          data : { "function" : "getSettingInfo"},
	  
		   success : function(jsontext) {
		  	var data = JSON.parse(jsontext);               
	                if(data.result=='success'){
						if(data.cloudOnOff==1){
							$('#cloud-on-label').addClass('ui-btn-active');
							$('#cloudOn').attr('checked', true);
							$('#cloud-off-label').removeClass('ui-btn-active');
							$('#cloudOff').attr('checked', false);
						}else{
							$('#cloud-off-label').addClass('ui-btn-active');
							$('#cloudOff').attr('checked', true);
							$('#cloud-on-label').removeClass('ui-btn-active');
							$('#cloudOn').attr('checked', false);
							$(".second-List").hide();	
						}
						if(data.monitoringOnOff==1){
							$('#monitor-on-label').addClass('ui-btn-active');
							$('#monitorOn').attr('checked', true);
							$('#monitor-off-label').removeClass('ui-btn-active');
							$('#monitorOff').attr('checked', false);
						}else{
		    				$('#monitor-off-label').addClass('ui-btn-active');
		    				$('#monitoringOff').attr('checked', true);
		    				$('#monitor-on-label').removeClass('ui-btn-active');
		        			$('#monitoringOn').attr('checked', false);
						}
						if(data.soundOnOff==1){
							$('#sound-on-label').addClass('ui-btn-active');
							$('#soundOn').attr('checked', true);
							$('#sound-off-label').removeClass('ui-btn-active');
							$('#soundOff').attr('checked', false);
	    				}else{
		        			$('#sound-off-label').addClass('ui-btn-active');
							$('#rb5').attr('checked', true);
							$('#sound-on-label').removeClass('ui-btn-active');
							$('#rb6').attr('checked', false);
	        			}
	    
	        			$("input:radio[name=alertLed]").each(function(){
		    				if($(this).val()==data.alertLight){
		    					$(this).attr('checked', true);
	
		    				}else{
		    					$(this).attr('checked', false);
			   				}
						});
	       				$("input:radio[name=basicLed]").each(function(){
	           				if($(this).val()==data.normalLight){
								$(this).attr('checked', true);
							}else{
								$(this).attr('checked', false);
							}
	
						});
	
						$("#basic-light-"+data.normalLight).removeClass("ui-radio-off").addClass('ui-btn-active ui-radio-on');
						$("#alert-light-"+data.alertLight).removeClass("ui-radio-off").addClass('ui-btn-active ui-radio-on');
					
					}else{
	                	alert(data.result_text);
					}
	      	},
		  	error: function(request, textStatus, errorThrown) {
				alert('error: ' + textStatus);
		  	}	
	    });
	
	}

	function setSettingInfo(){
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
	    
	    $.ajax({
      // 결과를 한글로 받을 수 있다.
		  url : "http://"+localStorage.ipAddress+"/mgmg_api.php",
		  dataType : "html",
	          type : "POST",
	          data : { "function" : "setSettingInfo", "cloudOnOff" 	 	: cloudOnOff,
			  										  "monitoringOnOff" : moniterOnOff,
													  "normalLight"	 	: $("input:radio[name=basicLed]:checked").val(),
													  "alertLight" 		: $("input:radio[name=alertLed]:checked").val(),
													  "soundOnOff"   	: soundOnOff 
					 }, 
	   	   success : function(jsontext) {
		  				var data = JSON.parse(jsontext);               
	        			if(data.result=='success'){
							location.href="./home.html";
						}else{
	        			    alert(data.result_text);
						}
	      			},
		  	 error : function(request, textStatus, errorThrown) {
						alert('error: ' + textStatus);
		 	 		}
	   });
   }


	$("input:radio[name='cloud']").on("change",function(){
	    if($("input:radio[id='cloudOn']").is(':checked')){
	    	$(".second-List").show();
	    } 

	    if($("input:radio[id='cloudOff']").is(':checked')){
	    	$(".second-List").hide();
	    } 
	
	});

   $("#OK").on("click",function(){
	   setSettingInfo();
   });

    // DB에서 모든 데이터를 불러와 페이지가 완성됐을 때 진입
        // 현재 체크되어있는 radio button이 있다면initValue에 저장
	if ($("input:radio[name='alertLed']:checked").length > 0) {
       var initAlertValue = $("input:radio[name='alertLed']:checked").val();
       $("input:radio[name='alertLed']").prop("init", initAlertValue);
    }
    if ($("input:radio[name='basicLed']:checked").length > 0) {
       var initBasicValue = $("input:radio[name='basicLed']:checked").val();
       $("input:radio[name='basicLed']").prop("init", initBasicValue);
    }

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
            var checkedvalue = $("input:radio[name='basicLed']:checked").val();
            $("input:radio[name='basicLed']").prop("checkedval", checkedvalue);
		}
	});

	function ChkDuplicateLedColor(dataList){
	    if($(dataList[2]).attr('value') === $(dataList[3]).attr('value')){
		return false;
	    }else{
		return true;
	    }
	}

	$('#Bled1').click(function(){
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": "testLed",
				"mode" : "Normal",
				"color":"Red"
			},
			dataType: 'html',
			});
	});
	
	$('#Bled2').click(function(){
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": "testLed",
				"mode" : "Normal",
				"color":"Blue"
			},
			dataType: 'html',
			});
	});
	
		$('#Bled3').click(function(){
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": "testLed",
				"mode" : "Normal",
				"color":"Green"
			},
			dataType: 'html',
			});
	});
	
		$('#Bled4').click(function(){
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": "testLed",
				"mode" : "Normal",
				"color":"White"
			},
			dataType: 'html',
			});
	});
	
		$('#led1').click(function(){
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": "testLed",
				"mode" : "Alert",
				"color":"Red"
			},
			dataType: 'html',
			});
	});
	
		$('#led2').click(function(){
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": "testLed",
				"mode" : "Alert",
				"color":"Blue"
			},
			dataType: 'html',
			});
	});
	
		$('#led3').click(function(){
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": "testLed",
				"mode" : "Alert",
				"color":"Green"
			},
			dataType: 'html',
			});
	});
	
		$('#led2').click(function(){
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": "testLed",
				"mode" : "Alert",
				"color":"White"
			},
			dataType: 'html',
			});
	});
	
		$('#PlaySample').click(function(){
			alert("dadsfasf");
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": "testLed",
				"mode" : "Sound",
			},
			dataType: 'html',
			});
		});
	
	
});
