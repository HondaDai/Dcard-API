var request = require('request');

var jar = request.jar();
var cookie1 = request.cookie('dcard-web=eyJjc3JmU2VjcmV0IjoibFZoZnpPSjFWRlhKRlpNRjBPcjRXY1JtIiwidG9rZW4iOm51bGx9');
var cookie2 = request.cookie('dcard-web.sig=1EBWILvJ8hcmnOQYnshGrFEpotw');
var CSRFToken = 'k3aAmCQ2-GXWP9MfFxKHUcGiIa_6N93dIzuQ';
jar.setCookie(cookie1, 'http://www.dcard.tw');
jar.setCookie(cookie2, 'http://www.dcard.tw');

var saveCookies = function(headers){
    var setCookie = headers['set-cookie'];
    var len = setCookie.length;
    for(var i=0 ; i<len ; i++){
        var cookie = request.cookie(setCookie[i].split(';')[0]);
        jar.setCookie(cookie, 'http://www.dcard.tw');
    }
};

var util = {
    jar: jar,
    CSRFToken: CSRFToken,
    saveCookies: saveCookies
};

var funList = [
    'getDcard',
    'getMessage',
    'getAllSchool',
    'getAllFriendInfo',
    'deleteFriend',
    'login'
];

var api = {};
funList.map((text, index) => {
    api[text] = function(param){
        return (require('./src/' + text)(util, param));
    }
});

module.exports = api;

