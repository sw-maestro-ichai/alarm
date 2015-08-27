/**
 * 
 */
		
var casper = require('casper').create({
	verbose: true,
	logLevel: 'debug'
});
casper.log("hello World!!!");
casper.options.waitTimeout = 10000;
var checkTime=0;

setInterval("timer()",10);
function timer(){
checkTime++;

}
casper.start("http://1.234.20.120/");

   casper.waitForText("Proudly", function then() {

			      }, 
			      function timeout() { 
				    casper.open("http://127.0.0.1/ledModule.php",{
  			            	method: 'post',
			            	data  :	 {
						'data' : 'error',
						'time' : checkTime/100
					         }
	      		      	    });
				    this.exit();
			      }, 10000);
   casper.thenOpen("http://1.234.20.120/?page_id=6", 
	   	   function (){
		   this.echo(this.getTitle());
		   }
   );
   casper.waitForText("Proudly", function then() {

			      }, 
			      function timeout() { 
				    casper.open("http://127.0.0.1/ledModule.php",{
  			            	method: 'post',
			            	data  :	 {
						'data' : 'error',
						'time' : checkTime/100
					         }

	      		      	    });
			            this.exit();
			      }, 10000);
 
   casper.thenOpen("http://1.234.20.120/?page_id=4", 
	   	   function (){
		   this.echo(this.getTitle());
		   }
   );
   casper.waitForText("Proudly", function then() {
         		            casper.open("http://127.0.0.1/ledModule.php",{
  			            	method: 'post',
			            	data  :	 {
			      			'data' : 'success',
			      			'time' : checkTime/100
		              	        }
	      		            });

			      }, 
			      function timeout() { 
				    casper.open("http://127.0.0.1/ledModule.php",{
  			            	method: 'post',
			            	data  :	 {
						'data' : 'error',
						'time' : checkTime/100
					         }
	      		      	    });
				    this.exit();
			      }, 10000);
 

casper.run();
