  $(document).on('pageinit', '#splash', function(){
      setTimeout(function(){
          $.mobile.changePage("#login", {transition: "fade"});
      }, 2000)
  });
        
$(function(){
    $('a#connect').click(function() {
        if(document.getElementById('ip_address').value == "1234") {
            $.mobile.changePage("Home.html#Home", {transition: "slide"} );
        }
        else {
            confirm('연결에 실패했습니다.');
        }
    });

//    $('a#exit').click(function() {
//        $(window).bind("beforeunload", function() { 
//        return confirm("Do you really want to close?"); 
//        });
//    });
});