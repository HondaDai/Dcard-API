var request = require('request');

var getMessage = function(util, param){
    var id = param;
    var url = 'https://www.dcard.tw/_api/friends/' + id.toString() + '/messages';
    var headers = {
        'x-csrf-token': util.CSRFToken
    };

    return new Promise(function(resolve, reject){
        request.get({url: url, jar: util.jar, headers: headers}, function(err, res, body){
            if(res.statusCode == 200){
                resolve(JSON.parse(body));
            } else {
                reject(new Error(body));
            }
        });
    });
};

module.exports = getMessage;
