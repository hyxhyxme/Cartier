require(["../../scripts/conf/config.js"],function(){
    require(["jquery"],function($){
          function exit(){
               delCookie('username');
               $('.myaccount').html('我的账户');
               $('.exit').remove();
          }
          //判断是否已经登录
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

          $('.bags').click(tocar);
          
          $.ajax({
               type:'get',
               url:'/Cartier',
               success:function(data){
                    var baglist = data.listing.all;
                    console.log(baglist);
                    for(var i = 0; i < baglist.length; i++){
                         var bagdiv = $('<div>');
                         var str = `
                         <a href="../details/details.html?id=${i}">
                              <img src = "https://www.cartier.cn${baglist[i].image}">
                              <p class="name">${baglist[i].productName}</p>
                              <p class="desc">${baglist[i].desc}</p>
                              <p class="price">${baglist[i].priceFormatted}</p>
                         </a>
                         <button class="${baglist[i].reference}">添加至购物袋</button>
                         `;
                         bagdiv.html(str);
                         $('.bags').append(bagdiv);
                    }
               }
          });
        /*   $.get('/Cartier',function(data){
               var baglist = data.listing.all;
               console.log(baglist);
               for(var i = 0; i < baglist.length; i++){
                    var bagdiv = $('<div>');
                    var str = `
                    <a href="../details/details.html?id=${i}">
                         <img src = "https://www.cartier.cn${baglist[i].image}">
                         <p class="name">${baglist[i].productName}</p>
                         <p class="desc">${baglist[i].desc}</p>
                         <p class="price">${baglist[i].priceFormatted}</p>
                    </a>
                    <button class="${baglist[i].reference}">添加至购物袋</button>
                    `;
                    bagdiv.html(str);
                    $('.bags').append(bagdiv);
               }
          }) */
          
          function tocar(ev){
               //判断是否是登录状态
               if(username){
                    var bag = ev.target.className;
                    var obj = getData(username);
                    if(obj.car){
                         var car = obj.car;
                    }
                    else{
                         var car = {};
                    }
                    car[bag]= 1;
                    obj.car = car;
                    saveData(username, JSON.stringify(obj));
               }
               else{
                    alert("未登录，请登录");
               }
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
          function saveData(key,value){
               localStorage.setItem(key,value);
          }
          function getData(key){
               var str = localStorage.getItem(key);
               var obj = {};
               obj = JSON.parse(str);
               return obj;
          }
    })
})