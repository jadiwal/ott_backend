
var crypto = require('crypto');

global.decrypt=function(value)
{
var mykey = crypto.createDecipher('aes-128-cbc', 'ummv@2021');
var mystr = mykey.update(value, 'hex', 'utf8')
mystr += mykey.final('utf8');
return mystr;
}

global.encrypt=function(value){
var mykey = crypto.createCipher('aes-128-cbc', 'ummv@2021');
var mystr = mykey.update(value, 'utf8', 'hex')
mystr += mykey.final('hex');
return mystr;
}

global.toJSONString = function(object) {
    return JSON.stringify(object);
}




global.setReqOptions = function(sess, method, jsonFlag, headers, body, url) {

    var newHeader = JSON.parse(toJSONString(headers));
    // var newHeader = headers;
    //console.log("Session : " + JSON.stringify(sess));
    if (sess.user !== undefined) {
        newHeader.x_access_token = sess.user.token;
        //body.token = sess.user.token;
    }
  
  
    //var methodType=method;
  
    var reqOptions = {
        method: method,
        json: jsonFlag,
        headers: newHeader,
        body: body,
        url: url
    };
  
  
    if (method == "get") {
        reqOptions = {
            method: method,
            json: jsonFlag,
            headers: newHeader,
            url: url
        };
    }
    return reqOptions;
  }