require(["../../scripts/conf/config.js"],function(){
    require(["jquery"],function($){
         //判断是否已经登录
        
        function exit(){
            delCookie('username');
            $('.myaccount').html('我的账户');
            $('.exit').remove();
        }
        var username = getCookie('username');
        if(username){
            $('.myaccount').html(username);
            var a = $('<a href="../home/index.html" class="exit" style="color:blue; margin-left:10px;">  退出</a>');
            a.click(exit);
            a.insertAfter($('.myaccount'));
        }


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
        
        $('.btn_register').click(register);
        $('.btn_login').click(login);
        function login(){
            var key = $('#account_l').val();
            var value = $('#password_l').val();
            if(loginJudge(key,value)){//登录账号密码都填写的情况
                var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(re.test(key)){
                    //账号格式正确的情况
                    var obj = {};
                    obj = getData(key);
                    if(obj){//账号已注册情况
                        if(obj.password == value){//输入密码正确
                            setCookie('username', key);
                            $(location).attr('href','../home/index.html');
                        }
                        else{//密码不正确
                            $('.login-tips').html('登录失败');
                        }
                    }
                    else{//账号未注册情况
                        $('.login-tips').html('账号未注册');
                    }
                }
                else{
                    $('.account-tips').html('电子邮箱格式错误');
                }
            } 
            else{
                $('.login-tips').html('登录失败，请将信息填写完善。');
            }
        }

           function register(){
                var obj = {};
                var call = $('input[name="call"]:checked').val();
                var name = $('#names').val();
                var key = $('#account_r').val();
                var newPassword = $('#password_r').val();
                var confirmPassword = $('#password_rc').val();
                if(registerJudge(call,name,key,newPassword,confirmPassword)){
                    var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if(!getData(key) && re.test(key)){
                        obj.call = call;
                        obj.name = name;
                        obj.password = newPassword;
                        var value = JSON.stringify(obj);
                        saveData(key,value);
                        setCookie('username', key);
                        $(location).attr('href','../home/index.html');
                    }
                    else if(getData(key)){
                        $('.register-tips').html('账号已注册，请直接登录');
                    }
                    else if(!re.test(key)){
                        $('.register-tips').html('电子邮箱格式不正确');
                    }
                }
                else{
                    $('.register-tips').html('注册失败');
                }
           }
           function loginJudge(key,value){
                $('.account-tips').html('');
                $('.password-tips').html('');
                $('.login-tips').html('');
               if(!key){
                    $('.account-tips').html('请输入电子邮箱账号');
               }
               if(!value){
                   $('.password-tips').html('请输入密码');
               }
               if(key&&value){
                   return true;
               }
               else{
                   return false;
               }
           }
           function registerJudge(call,name,key,newPassword,confirmPassword){
                $('.call-tips').html('');
                $('.names-tips').html('');
                $('.new-account-tips').html('');
                $('.new-password-tips').html('');
                $('.confirm-password-tips').html('');
                $('.register-tips').html('');
               if(!call){
                    $('.call-tips').html('请输入您的称谓');
               }
               if(!name){
                    $('.names-tips').html('请输入您的姓名');
               }
               if(!key){
                    $('.new-account-tips').html('请输入电子邮箱账号');
               }
               if(!newPassword){
                   $('.new-password-tips').html('请输入密码');
               }
               if(!confirmPassword){
                   $('.new-password-tips').html('请确认密码');
               }
               if(call&&name&&key&&newPassword&&confirmPassword){
                   return true;
               }
               else{
                   return false;
               }
           }
           function saveData(key,value){
               localStorage.setItem(key,value);
           }
           function getData(key){
               var str = localStorage.getItem(key);
               var obj = {};
               obj = JSON.parse(str);
               return obj;
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