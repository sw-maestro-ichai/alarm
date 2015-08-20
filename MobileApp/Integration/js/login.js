  $(document).on('pageinit', '#splash', function(){
      setTimeout(function(){
          $.mobile.changePage("#login", {transition: "fade"});
      }, 2000)
  });
        
$(function(){
    $('a#connect').click(function() {

    $.ajax({
      // 결과를 한글로 받을 수 있다.
	  url : "http://172.16.101.207/mgmg_api.php",
	  dataType : "html",
          type : "POST",
          data : { "function" : "login", "ip" : $("#ip_address").val()},
  
	  success : function(jsontext) {
	  	var data = JSON.parse(jsontext);               
		//alert(data.result_text);
                if(data.result=='success'){
		location.href="./home.php";
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
