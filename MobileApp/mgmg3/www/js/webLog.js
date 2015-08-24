$(document).on('pageinit', '#webLog', function() {
	google.load('visualization', '1', {packages: ['corechart', 'line']});
    google.setOnLoadCallback(drawBasic);
    
    function drawBasic() {
        
        var graphData = new google.visualization.DataTable();
        graphData.addColumn('number', 'X');
        graphData.addColumn('number', 'takeTime');
        
        getWebLogInfoForGraph();
	
	function getWebLogInfoForGraph(){
		$.ajax({
	  	   url : "http://"+localStorage.ipAddress+"/mgmg_api.php",
	  dataType : "html",
          type : "POST",
          data : { "function" : "getWebLogInfoForGraph"
				 }, 
   	   success : function(jsontext) {
	  				var data = JSON.parse(jsontext);
                    var row = [];
        			if(data.result=='success'){
                        var currentTime = new Date(data.logList[0].isTime).getMinutes();
                        for(var i=0; i<data.logList.length; i++){
                            var t2 = new Date(data.logList[i].isTime);
                            if ( i > 0 ) {
                                var t1 = new Date(data.logList[i-1].isTime);
                                if (t2.getHours() < t1.getHours()) {
                                    var isTime = ( t2.getMinutes()-60 ) + ( -currentTime );
                                } else {
                                    if (t2.getMinutes()-currentTime > 0) {
                                        var isTime = t2.getMinutes() - currentTime - 60;
                                    } else {
                                        var isTime = t2.getMinutes() - currentTime;
                                    }
                                }
                            } else {
                                if (t2.getMinutes() - currentTime > 0) {
                                    var isTime = t2.getMinutes() - currentTime - 60;
                                } else {
                                    var isTime = t2.getMinutes() - currentTime;
                                }
                            }
                            var takeTime = data.logList[i].takeTime;    
                            row[i]=[isTime, takeTime];    
						}
                        
                        graphData.addRows(row);
                           var options = {
                                    hAxis: {
                                    title: 'isTime'
                                            },
                                    vAxis: {
                                    title: 'takeTime'
                                            }
                                        };
                        var chart = new google.visualization.LineChart(document.getElementById('chart1'));
                        chart.draw(graphData, options);
					
                    }else{
        			    alert(data.result_text);
					}
      			},
	  	 error : function(request, textStatus, errorThrown) {
					alert('error: ' + textStatus);
	 	 		}
	    });
	}   
     
    }
    
    
    getWebLogInfo();
	
	function getWebLogInfo(){
		$.ajax({
	  	   url : "http://"+localStorage.ipAddress+"/mgmg_api.php",
	  dataType : "html",
          type : "POST",
          data : { "function" : "getWebLogInfo"
				 }, 
   	   success : function(jsontext) {
	  				var data = JSON.parse(jsontext);               
        			if(data.result=='success'){
					     for(var i=0; i<data.logList.length; i++){
				  		 $("#log-list").append(' <li><h3 style="margin:5px"> 모니터링 시간 </h3> <span style="margin-left:5px" >'+
                                  data.logList[i].isTime + 
                                  '</span><span class="ui-li-count" id ="sec" style="font-size:15px;'+
                                  (data.logList[i].takeTime>=4?'color:red;">':'color:gray;">')+
                                  data.logList[i].takeTime + 'sec </span></li>' );
						}
					}else{
        			    alert(data.result_text);
					}
      			},
	  	 error : function(request, textStatus, errorThrown) {
					alert('error: ' + textStatus);
	 	 		}
	    });
	}	
});
