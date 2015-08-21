$(document).on('pageinit', '#splash', function(){
      setTimeout(function(){
          $.mobile.changePage("#login", {transition: "fade"});
      }, 2000)
});
        
$(function(){
    $('a#connect').click(function() {
		localStorage.ipAddress = $('#ip_address').val();
	    $.ajax({
	      // 결과를 한글로 받을 수 있다.
	    	   url : "http://"+localStorage.ipAddress + "/mgmg_api.php",
		  dataType : "html",
	          type : "POST",
	          data : { "function" : "login"},
	  
		  success : function(text) {
	                if(text == "OK"){
			location.href="./home.html";
			}else{
	                alert(data.result_text);
			}
	      },
		  error: function(request, textStatus, errorThrown) {
			alert('error: ' + textStatus);
		  }
	    });
    });
});
