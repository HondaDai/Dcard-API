var request = require('request');
var cheerio = require('cheerio');

var CSRFToken = 'k3aAmCQ2-GXWP9MfFxKHUcGiIa_6N93dIzuQ';
var cookie = '';
cookie += 'dcard-web=eyJjc3JmU2VjcmV0IjoibFZoZnpPSjFWRlhKRlpNRjBPcjRXY1JtIiwidG9rZW4iOm51bGx9; ';
cookie += 'dcard-web.sig=1EBWILvJ8hcmnOQYnshGrFEpotw; ';

var getAllSchool = function(){
    var url = 'https://www.dcard.tw/_api/forums';
    return new Promise(function(resolve, reject){
        request({url: url}, function(err, res, body){
            if(res.statusCode != 200){
                resolve('getAllSchool error:' + body);
                return;
            }

            var allSchool = [];
            body = JSON.parse(body);
            body.forEach(function(e){
                if(e.isSchool){
                    allSchool.push(e.name);
                }
            });
            resolve(allSchool);
        });
    });
};

var testInternet = function(){
    return new Promise(function(resolve, reject){
        var url = 'https://www.dcard.tw';
        request({url: url}, function(err, res, body){
            if(res.statusCode == 200){
                resolve('test OK');
            } else {
                resolve('testInternet error');
            }
        });
    });
};

var getCollection = function(){
    var url = 'http://www.dcard.tw/my/collections';
    var headers = {
        'method': 'GET',
        'cookie': cookie
    };

    return new Promise(function(resolve, reject){
        request({url: url, headers: headers}, function(err, res, body){
            if(res.statusCode != 200){
                resolve('getCollection error:' + body);
                return;
            }

            var $ = cheerio.load(body);
            var collection = []

            $('strong').each(function(){
                collection.push($(this).text());
            });

            resolve(collection);
        });
    });
};

var login = function(email, password){
    var url = 'https://www.dcard.tw/_api/sessions';

    var headers = {
        'method': 'POST',
        'content-type': 'application/json',
        'accept': 'application/json',
        'cookie': cookie,
        'x-csrf-token': CSRFToken
    };

    var form = {
        'email': email,
        'password': password
    };

    return new Promise(function(resolve, reject){
        request.post({url: url, body: JSON.stringify(form), headers: headers}, function(err, res, body){
            if(res.statusCode != 204){
                resolve('login error: ' + body);
                return;
            }

            var headers = res.headers;
            var setCookie = headers['set-cookie'];

            CSRFToken = headers['x-csrf-token'];
            cookie = setCookie[0].split(' ')[0] + ' ' + setCookie[1].split(' ')[0];
            resolve('success');
        });
    });

};

var getDcard = function(){
    var url = 'http://www.dcard.tw/_api/dcard';
    var headers = {
        'method': 'GET',
        'cookie': cookie,
        'x-csrf-token': CSRFToken
    };

    return new Promise(function(resolve, reject){
        request({url: url, headers: headers}, function(err, res, body){


            if(res.statusCode != 200){
                resolve('getDcard error: ' + body);   
            } else {
                CSRFToken = res.headers['x-csrf-token'];
                body = JSON.parse(body);
                if(body.dcard){
                    resolve(body);
                } else {
                    resolve('no card today');
                }
            }
        });
    });
};

var getFriends = function(){
    var url = 'http://www.dcard.tw/_api/me/friends';
    var headers = {
        'cookie': cookie,
        'x-csrf-token': CSRFToken
    };

    return new Promise(function(resolve, reject){
        request({url: url, headers: headers}, function(err, res, body){

            if(res.statusCode == 200 || res.statusCode == 304){
                CSRFToken = res.headers['x-csrf-token'];
                resolve(JSON.parse(body));
            } else {
                resolve('getFriends error:' + body);
            }

        });
    });
};

var deleteFriend = function(id){
    var url = 'https://www.dcard.tw/_api/friends/' + id.toString();
    var headers = {
        'cookie': cookie,
        'x-csrf-token': CSRFToken
    };

    return new Promise(function(resolve, reject){
        request.delete({url: url, headers: headers}, function(err, res, body){
            if(res.statusCode == 204){
                resolve('delete success');   
            } else {
                resolve(body);
            }
        });
    });
};

var DcardAPI = {
    testInternet: testInternet,
    getAllSchool: getAllSchool,

    // auth
    login: login,
    getCollection: getCollection,
    getDcard: getDcard,
    getFriends: getFriends,
    deleteFriend: deleteFriend
};

module.exports = DcardAPI;

