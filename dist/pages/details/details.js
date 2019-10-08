"use strict";

require(["../../scripts/conf/config"], function () {
  require(["jquery", "swiper", "cloudzoom", "accordion"], function ($, swiper) {
    function exit() {
      delCookie('username');
      $('.myaccount').html('我的账户');
      $('.exit').remove();
    }

    var username = getCookie('username');

    if (username) {
      $('.myaccount').html(username);
      var a = $('<a href="../home/index.html" class="exit" style="color:blue; margin-left:10px;">  退出</a>');
      a.click(exit);
      a.insertAfter($('.myaccount'));
    }

    $.get('/Cartier', function (data) {
      var id = getUrlParam('id');
      var com = data.listing.all[id]; //获取到具体商品

      var div = $('<div>');
      var str = "\n                    <p class=\"name\">".concat(com.productName, "</p>\n                    <p class=\"desc\">").concat(com.desc, "</p>\n                    <p class=\"type\">\u578B\u53F7\uFF1A").concat(com.reference, "</p>\n                    <p class=\"price\">").concat(com.priceFormatted, "</p>\n                    <button class=\"").concat(com.reference, "\">\u6DFB\u52A0\u81F3\u8D2D\u7269\u888B</button>\n               ");
      div.html(str);
      $('.decri').append(div);
    });
    CloudZoom.quickStart();
    $('.decri').click(tocar);
    $(function () {
      $('dl#my-foldpanel').foldpanel({
        init: true,
        // 初始第一个展开, 默认为 true
        time: 100,
        // panel展开动画时间, 默认为 100ms
        dbclose: true // 在此点击关闭, 默认为 true

      });
    });

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
      //window.location.search获取问号以及后面的参数

      var r = window.location.search.substr(1).match(reg); // 获取所要参数

      if (r != null) //获取到所要的参数的情况下
        //r是个数组，包括匹配到的结果和子项
        return unescape(r[2]); //返回解码后的数据

      return null; // 返回参数值
    }

    function tocar(ev) {
      //判断是否是登录状态
      if (username) {
        var bag = ev.target.className;
        var obj = getData(username);

        if (obj.car) {
          var car = obj.car;
        } else {
          var car = '';
        }

        car += bag + ';';
        obj.car = car;
        saveData(username, JSON.stringify(obj));
      } else {
        alert("未登录，请登录");
      }
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

    function saveData(key, value) {
      localStorage.setItem(key, value);
    }

    function getData(key) {
      var str = localStorage.getItem(key);
      var obj = {};
      obj = JSON.parse(str);
      return obj;
    }
  });
});