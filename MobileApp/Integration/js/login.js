  $(document).on('pageinit', '#splash', function(){
      setTimeout(function(){
          $.mobile.changePage("#login", {transition: "fade"});
      }, 2000)
  });
        
$(function(){
    $('a#connect').click(function() {
         location.href="./loginProc.php?ip="+$("#ip_address").val();
	//if(document.getElementById('ip_address').value == "1234") {
  
         //	$.mobile.changePage("Home.html#Home", {transition: "slide"} );
        //}
        //else {
        //    alert('ip가 정확하지 않습니다.');
        // }
    });

//    $('a#exit').click(function() {
//        $(window).bind("beforeunload", function() { 
//        return confirm("Do you really want to close?"); 
//        });
//    });
});
