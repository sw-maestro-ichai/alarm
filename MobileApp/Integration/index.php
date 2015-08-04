<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

<title>Login</title>
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css"/>
<link rel="stylesheet" href="./CSS/style_home.css">
<link rel="stylesheet" href="./CSS/style.css">
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
<script src="./js/login.js"></script>
    
</head>

<body>
   <section data-role="page" id="splash">
        <div class="splash vCenter"><span>
           <div data-role="controlgroup" data-type="vertical" style="margin:100px;" >
              
               <img src="http://rain43.com/wp-content/themes/june19-rain43/images/cloud-normal2.png" 
               alt="splash image" id="cloud" style="width:200px; height:150px;"/>
               <p id="title" style="text-align:center; color:white; font-size:30px;">Cloud</p>
               
           </div>
           </span>
        </div>
    </section>
    
    <section data-role="page" id="login">
       <div data-role="content">
            <div data-role="image" id="usr-wrapper">
                <img src="./res/user.png" alt="user image" id="usr"/>
            </div>
            <div data-role="fieldcontain" class="login">
                <input type="text" name="ip_address" id="ip_address" style="width:300px" value="" placeholder="IP Address" />
            </div>
            <div id="button-wrapper" align="center">
                 <a href="#" data-role="button" data-inline="true" id="connect" data-theme="">로그인</a>
                 <a href="#" data-role="button" data-inline="true" id="exit">종료</a>
            </div>
       </div>
    </section>
</body>
</html>
