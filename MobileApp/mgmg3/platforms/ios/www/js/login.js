$(document).on('pageinit', '#splash', function(){
      setTimeout(function(){
          $.mobile.changePage("#login", {transition: "fade"});
      }, 2000)
});
        
$(function(){
    $('a#connect').click(function() {
		localStorage.ipAddress = $('#ip_address').val();
	
		$.ajax({
			type: 'POST',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				"function": 'login'
			},
			dataType: 'html',
			}).done(function(response){
				alert("OK!");
				location.href="./home.html";
			}).fail(function(error){
				alert("Fail!!");
    });
		
    });
});
