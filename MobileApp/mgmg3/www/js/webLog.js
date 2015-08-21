$(function(){
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
		
	var d= new Date();
        /* 가상 데이터 */
	var DataList=[];
/*	<? include_once("../dbconfig.php"); 
	$result = mysql_query("select * from Monitering");
	        while($row=mysql_fetch_array($result)){
		$int i=0;
 		?> DataList[<?echo i;?>]=[<?echo $row[isTime].','.$row[takeTime];?>];
                <?i++; 
		}?>

  //      var DataList=[[d, 20.13],[d-3*60000, 19.17],[d-6*60000, 19.27],[d-9*60000, 19.10],[d-12*60000, 20.17],[d-15*60000, 21.17],[d-18*60000, 30.17],[d-21*60000, 40.17],[d-24*60000, 19.20],[d-27*60000, 18.17],[d-30*60000, 20.17]];
    
        var xy=[]; var x=[]; var y=[];
        var currentTime=new Date(DataList[0][0]).getMinutes();
        for(var i=0;i < DataList.length ; i++){
            var d2= new Date(DataList[i][0]);
            if(i>0){
                var d1= new Date(DataList[i-1][0]);
                if(d2.getHours()<d1.getHours()){
                    x[i]=(d2.getMinutes()-60)+(-currentTime);
                }else{
                    if(d2.getMinutes()-currentTime>0){
                        x[i]=d2.getMinutes()-currentTime-60;
                    }else{
                        x[i]=d2.getMinutes()-currentTime;
                    }
                }
            }else{
                if((d2.getMinutes()-currentTime)>0){
                    x[i]=d2.getMinutes()-currentTime-60;
                }else{
                    x[i]=d2.getMinutes()-currentTime;
                }
            }
            y[i]=DataList[i][1];
            xy[i]=[x[i],y[i]];
        */
            /* 로그 데이터 리스트 */
         /*   $("#log-list").append(' <li><a href="#"><h3 style="margin:5px"> 모니터링 시간 </h3> <span style="margin-left:5px" >'+
                                  (d2.getYear()+1900)+'/'+(d2.getMonth()+1)+'/'+ d2.getDay()+ '&nbsp;'+
                                  d2.getHours()+':'+d2.getMinutes() + 
                                  '</span><span class="ui-li-count" id ="sec" style="font-size:15px;'+
                                  (y[i]>=30?'color:red;">':'color:gray;">')+
                                  y[i] + 'sec </span></a></li>' );
        }
        /* 그래프 그리기 */
       /* var plot1 = $.jqplot ("chart1", [xy],{
            title:"상태 그래프",
            animate:true,
            axes: {
                xaxis: {
                    label: "분 전(min)",
                    pad: 0
                },
                yaxis: {
                    label: "소요 시간(sec)"
                }
            }
        });
        $( "#log-list" ).listview( "refresh" );
*/
});
