var request = require('request');

var getDcard = function(util, param){
    var url = 'http://www.dcard.tw/_api/dcard';
    var headers = {
        'x-csrf-token': util.CSRFToken
    };

    return new Promise(function(resolve, reject){
        request.get({url: url, jar: util.jar, headers: headers}, function(err, res, body){

            if(res.statusCode != 200){
                reject(new Error(body));   
            } else {
                util.CSRFToken = res.headers['x-csrf-token'];
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

module.exports = getDcard;
