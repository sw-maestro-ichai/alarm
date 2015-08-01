  $(document).on('pageinit', '#splash', function(){
      setTimeout(function(){
          $.mobile.changePage("#login", {transition: "fade"});
      }, 2000)
  });
        
$("#connect").on("click", function() {
    if(document.getElementById('ip_address').value == "1234") {
        $.mobile.changePage("Home.html", {transition: "slide"} );
    }
    else {
        confirm('연결에 실패했습니다.');
    }
});