var request = require('request');
var cheerio = require('cheerio');

var getAllSchool = function(){
    var url = 'https://www.dcard.tw/_api/forums';
    return new Promise(function(resolve, reject){
        request.get({url: url}, function(err, res, body){
            if(res.statusCode != 200){
                reject('getAllSchool error:' + err);
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
        getAllSchool().then(function(allSchool){
            resolve();
        }, function(err){
            reject('testInternet error');
        });
    });
};

var getCollection = function(session){
    var url = 'http://www.dcard.tw/my/collections';
    var headers = {
        cookie: session.cookie
    };

    return new Promise(function(resolve, reject){
        request.get({url: url, headers: headers}, function(err, res, body){
            if(res.statusCode != 200){
                reject('getCollection error:' + err);
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

    var CSRFToken = 'k3aAmCQ2-GXWP9MfFxKHUcGiIa_6N93dIzuQ';
    var dcardWeb = 'eyJjc3JmU2VjcmV0IjoibFZoZnpPSjFWRlhKRlpNRjBPcjRXY1JtIiwidG9rZW4iOm51bGx9;';
    var dcardWebSig = '1EBWILvJ8hcmnOQYnshGrFEpotw;';
    var cookie = 'dcard-web=' + dcardWeb + ' dcard-web.sig=' + dcardWebSig;

    var headers = {
        'x-csrf-token': CSRFToken,
        'content-type': 'application/json',
        'accept': 'application/json',
        'cookie': cookie
    };

    var form = {
        'email': email,
        'password': password
    };

    return new Promise(function(resolve, reject){
        request.post({url: url, body: JSON.stringify(form), headers: headers}, function(err, res, body){
            if(res.statusCode != 204){
                reject('login error: ' + err);
                return;
            }

            var headers = res.headers;
            var setCookie = headers['set-cookie'];
            var cookie = setCookie[0].split(' ')[0] + ' ' + setCookie[1].split(' ')[0];
            var session = {
                'x-csrf-token': headers['x-csrf-token'],
                'cookie': cookie
            };
            resolve(session);
        });
    });

};

testInternet().then(function(rst){

    return login('pudding850806@gmail.com', 's5334');

}).then(function(session){

    return getCollection(session);

}).then(function(collection){

    console.log(collection);

});


