var request = require('request');


var login = function(util, param){
    var url = 'https://www.dcard.tw/_api/sessions';
    var headers = {
        'method': 'POST',
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-csrf-token': util.CSRFToken
    };

    var form = {
        'email': param.email,
        'password': param.password
    };

    return new Promise(function(resolve, reject){
        request.post({url: url, jar: util.jar, body: JSON.stringify(form), headers: headers}, function(err, res, body){
            if(res.statusCode != 204){
                reject(new Error(body));
                return;
            }
            resolve('login success');
            util.saveCookies(res.headers);
        });
    });

};

module.exports = login;
