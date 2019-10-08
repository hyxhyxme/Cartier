require(["../../scripts/conf/config.js"],function(){
    require(["jquery"],function($){
       $('.nav li').mouseover(function(){
            $('.secnav').show();
       });
       $('.nav li').mouseout(function(){
            $('.secnav').hide();
       });
       $('.secnav').mouseover(function(){
            $('.secnav').show();
       });
       $('.secnav').mouseout(function(){
            $('.secnav').hide();
       });

       var username = getCookie('username');
       function exit(){
           delCookie('username');
           $('.myaccount').html('我的账户');
           $('.exit').remove();
       }
       if(username){
            $('.myaccount').html(username);
            var a = $('<a href="index.html" class="exit" style="color:blue; margin-left:10px;">  退出</a>');
            a.click(exit);
            a.insertAfter($('.myaccount'));
       }
       function setCookie(key, value){
          document.cookie = key + '=' + value + ';path=/';
      }
      function getCookie(key){
          var a = document.cookie.split(';');
          for(var i = 0; i < a.length; i++){
              var b = a[i].split('=');
              if(b[0] == key){
                  return b[1];
              }
          }
      }
      function delCookie(key){
          setCookie(key, '', -1);
      }
    })
})