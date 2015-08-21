$(document).on('pageinit', '#splash', function(){
      setTimeout(function(){
          $.mobile.changePage("#login", {transition: "fade"});
      }, 2000)
});
        
$(function(){
    $('a#connect').click(function() {
		localStorage.ipAddress = $('#ip_address').val();
	
		$.ajax({
			type: 'GET',
			url: "http://"+localStorage.ipAddress+"/mgmg_api.php",
			data: {
				function: 'login'
			},
			dataType: 'jsonp',
			crossDomain: true,
			}).done(function(response){
				location.href="/home.php";
			}).fail(function(error){
				alert(error.statusText);
    });
		
    });
});
