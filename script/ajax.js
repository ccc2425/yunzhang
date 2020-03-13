var timestamp,
appid = 1000, // 回拨域名
host = 'http://jy.10010zx.cn/',//原版
apiUrl = 'api/'
appsecret = '888a078121e276abfb26697ff4dc640c',//原版
shopappid = 1424,
shopappkey = '22a6f81e55c2ab44a113679fd07baa90',//原版
shopurl = 'http://ntstk.hr999999.com/';
function ajax(data,complete){
  // 请求数据及配置
  data.method = data.method || 'post'
  data.url = host + apiUrl + data.url
  data.data = data.data || {}
  timestamp = Date.parse(new Date()) / 1000
  // console.log(timestamp);

  if ($api.getStorage('token')===undefined) {
    $api.setStorage('token', '');
  }
  data.data.token = $api.getStorage('token')
  data.data.timeline = timestamp
  data.data.appid=appid
  // 获取sign
  var arr = []
  for(var key in data.data){
    arr.push(key)
  }
  arr.sort()
  var sign = ''
    for (var i =0 ;i< arr.length;i++){
      sign += data.data[arr[i]]
    }
    console.log(sign + appsecret);
  data.data.sign=md5(sign + appsecret)
  // 请求接口
  console.log(data.url);
  console.log(JSON.stringify(data.data))
  api.ajax({
    url: data.url,
    method: data.method,
    encode: false,
    dataType: 'json',
    data: {
      values:data.data
    }
  }, function(ret, err) {
    console.log(data.data.sign);
    if(ret){
      complete(ret)
      // console.log(JSON.stringify(ret));
    }else {
      complete(err)
    }
  });
}

function shopajax(data,complete){
  // 请求数据及配置
  data.method = data.method || 'post'
  data.url = shopurl + data.url
  data.data = data.data || {}
  timestamp = Date.parse(new Date()) / 1000
  // console.log(timestamp);

  // if ($api.getStorage('token')===undefined) {
  //   $api.setStorage('token', '');
  // }
  // data.data.token = $api.getStorage('token')
  data.data.timeline = timestamp
  data.data.appid=shopappid
  // 获取sign
  var arr = []
  for(var key in data.data){
    arr.push(key)
  }
  arr.sort()
  var sign = ''
    for (var i =0 ;i< arr.length;i++){
      sign += data.data[arr[i]]
    }
  data.data.sign=md5(sign + shopappkey)
  // console.log(data.data.sign);
  // 请求接口
  console.log(JSON.stringify(data.data))
  api.ajax({
    url: data.url,
    method: data.method,
    encode: false,
    dataType: 'json',
    data: {
      values:data.data
    }
  }, function(ret, err) {
    if(ret){
      complete(ret)
      // console.log(JSON.stringify(ret));
    }else {
      complete(err)
        // console.log(JSON.stringify(err));
    }
  });
}

function Base64() {

  // private property
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = _utf8_encode(input);
      while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }
          output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
      }
      return output;
  }

  // public method for decoding
  this.decode = function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
          enc1 = _keyStr.indexOf(input.charAt(i++));
          enc2 = _keyStr.indexOf(input.charAt(i++));
          enc3 = _keyStr.indexOf(input.charAt(i++));
          enc4 = _keyStr.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }
      }
      output = _utf8_decode(output);
      return output;
  }

  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
              utftext += String.fromCharCode(c);
          } else if((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          } else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }

      }
      return utftext;
  }

  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;
      while ( i < utftext.length ) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          } else if((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i+1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          } else {
              c2 = utftext.charCodeAt(i+1);
              c3 = utftext.charCodeAt(i+2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }
      }
      return string;
  }
}

var jiami = function(username){
  var appsecrets = md5(appsecret)
  var iv1 = 1;
  var returnString='';
  for (var i =0; i<username.length;i++){
    var asciiCode1 = Number(username.charAt(i).charCodeAt());
    var asciiCode2 = Number(appsecrets.charAt(i).charCodeAt());
    var asciiCode = asciiCode1+asciiCode2+100;
    returnString += asciiCode
    iv1+=asciiCode1
  }
  var b = new Base64();
  var stringNormal = b.encode(returnString);
  var authKey = md5(username+'|'+appsecrets)
  stringNormal = stringNormal.replace(/=/g, '%3D')
  authKey = md5(authKey+stringNormal)
  var authKey_1 = authKey.substring(0,16)
  var authKey_2 = authKey.slice(16)
   return authKey_1+stringNormal+authKey_2
}
window.jiami = jiami
window.axios = ajax
window.axiosShop = shopajax
