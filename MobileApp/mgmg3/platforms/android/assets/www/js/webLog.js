$(document).on('pageinit', '#webLog', function() {
//$(function(){
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
                        
                        //google.load('visualization', '1', {packages: ['corechart', 'line']});
                        //google.setOnLoadCallback(drawBasic);
					}else{
        			    alert(data.result_text);
					}
      			},
	  	 error : function(request, textStatus, errorThrown) {
					alert('error: ' + textStatus);
	 	 		}
	    });
	}	
    
	/*
    //$(document).ready(){
	//google.load('visualization', '1', {packages: ['corechart', 'line']});
    //google.setOnLoadCallback(drawBasic);
    
    function drawBasic() {
        var graphData = new google.visualization.DataTable();
        graphData.addColumn('number', 'X');
        graphData.addColumn('number', 'takeTime');
        graphData.addRows([
            [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
            [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
            [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
            [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
            [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
            [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
            [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
            [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
            [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
            [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
            [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
            [66, 70], [67, 72], [68, 75], [69, 80]
        ]);
        
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
    }
    //}
    */
});
