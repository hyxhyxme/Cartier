"use strict";

require(["../../scripts/conf/config.js"], function () {
  require(["jquery"], function ($) {
    function exit() {
      delCookie('username');
      $('.myaccount').html('我的账户');
      $('.exit').remove();
    } //判断是否已经登录


    var username = getCookie('username');

    if (username) {
      $('.myaccount').html(username);
      var a = $('<a href="../home/index.html" class="exit" style="color:blue; margin-left:10px;">  退出</a>');
      a.click(exit);
      a.insertAfter($('.myaccount'));
    }

    $('.nav li').mouseover(function () {
      $('.secnav').show();
    });
    $('.nav li').mouseout(function () {
      $('.secnav').hide();
    });
    $('.secnav').mouseover(function () {
      $('.secnav').show();
    });
    $('.secnav').mouseout(function () {
      $('.secnav').hide();
    });
    $('.cars').click(handle); //操作购物车

    function handle(ev) {
      /* console.log(ev.target.id); */
      if (username) {
        if (ev.target.id == 'move') {
          var obj = getData(username);

          if (obj.car) {
            //登录状态且购物车不为空
            var arr = obj.car;
            var arr2 = {};
            var j = 0;

            for (var attr in arr) {
              if (attr != ev.target.className) {
                arr2[attr] = arr[attr];
              }
            }

            obj.car = arr2;
            saveData(username, JSON.stringify(obj));
            $(location).attr('href', './car.html');
          }
        } else if (ev.target.id == 'sub') {
          var obj = getData(username);

          if (obj.car) {
            if (obj.car[ev.target.className] > 1) {
              obj.car[ev.target.className]--;
              $('span.' + ev.target.className).html(obj.car[ev.target.className]);
              saveData(username, JSON.stringify(obj));
              $(location).attr('href', './car.html');
            }
          }
        } else if (ev.target.id == 'add') {
          var obj = getData(username);

          if (obj.car) {
            obj.car[ev.target.className]++;
            $('span.' + ev.target.className).html(obj.car[ev.target.className]);
            saveData(username, JSON.stringify(obj));
            $(location).attr('href', './car.html');
          }
        } else if (ev.target.id == "checkout") {
          var obj = getData(username);

          if (obj.car) {
            obj.car = {};
            saveData(username, JSON.stringify(obj));
            $(location).attr('href', './car.html');
          }
        }
      }
    }

    if (username) {
      //登录状态
      var obj = getData(username);

      if (!$.isEmptyObject(obj.car)) {
        $.get('/Cartier', function (data) {
          var arr = obj.car;
          var baglist = data.listing.all;
          var strl = '';
          var strr = '';
          var count = 0;
          var divl = $('<div class="left">');
          var divr = $('<div class="right">');

          if (arr) {
            for (var attr in arr) {
              for (var j = 0; j < baglist.length; j++) {
                if (baglist[j].reference == attr) {
                  strl += "\n                                        <div>\n                                            <img src = \"https://www.cartier.cn".concat(baglist[j].image, "\">\n                                            <div class=\"content\">\n                                                <p class=\"name\">").concat(baglist[j].productName, "</p>\n                                                <p class=\"desc\">").concat(baglist[j].desc, "</p>\n                                                <p class=\"price\">").concat(baglist[j].priceFormatted, "</p>\n                                                <p class=\"num \"><button id=\"sub\" class=\"").concat(attr, "\">-</button><span class=\"").concat(attr, "\">").concat(arr[attr], "</span><button id=\"add\" class=\"").concat(attr, "\">+</button></p>\n                                                <button class=\"").concat(attr, "\" id=\"move\">X</button>\n                                            </div>\n                                        </div>\n                                    ");
                  var re = /[￥,\s]/g;
                  var p = Number(baglist[j].priceFormatted.replace(re, ''));
                  var p1 = p * obj.car[attr];
                  re = /(?=(?!\b)(\d{3})+$)/g;
                  p1 = String(p1).replace(re, function ($0, $1) {
                    return $0 + ',';
                  });
                  strr += "\n                                        <div>\n                                            <span class=\"name\">".concat(baglist[j].productName, "X").concat(obj.car[attr], "</span>\n                                            <span class=\"price\">\uFFE5").concat(p1, "</span>\n                                        </div>\n                                    ");
                  count += p * obj.car[attr];
                  break;
                }
              }
            }

            re = /(?=(?!\b)(\d{3})+$)/g;
            count = String(count).replace(re, function ($0, $1) {
              return $0 + ',';
            });
            strr += "\n                            <span class=\"all name\">\u603B\u4EF7:</span>\n                            <span class=\"all price\">\uFFE5".concat(count, "</span>\n                            <button id=\"checkout\">\u7ED3\u7B97</button>\n                        ");
            divl.html(strl);
            divr.html(strr);
            $('.cars').append(divl);
            $('.cars').append(divr);
          }
        });
      } else {
        //购物车为空
        console.log(1);
        $('.cars').html('');
        var h = $('<h3>糟糕，购物车是空的</h3>');
        $('.cars').append(h);
      }
    } else {
      //未登录状态
      var h = $('<h3>糟糕，还木有登录</h3>');
      $('.cars').append(h);
    }

    function saveData(key, value) {
      localStorage.setItem(key, value);
    }

    function getData(key) {
      var str = localStorage.getItem(key);
      var obj = {};
      obj = JSON.parse(str);
      return obj;
    }

    function setCookie(key, value) {
      document.cookie = key + '=' + value + ';path=/';
    }

    function getCookie(key) {
      var a = document.cookie.split(';');

      for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');

        if (b[0] == key) {
          return b[1];
        }
      }
    }

    function delCookie(key) {
      setCookie(key, '', -1);
    }
  });
});