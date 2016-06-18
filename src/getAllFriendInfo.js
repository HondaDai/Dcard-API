var request = require('request');

var getAllFriendInfo = function(util, param){
    var url = 'http://www.dcard.tw/_api/me/friends';
    var headers = {
        'x-csrf-token': util.CSRFToken
    };

    return new Promise(function(resolve, reject){
        request({url: url, jar: util.jar, headers: headers}, function(err, res, body){

            if(res.statusCode == 200 || res.statusCode == 304){
                resolve(JSON.parse(body));
            } else {
                reject(new Error(body));
            }

        });
    });
};

module.exports = getAllFriendInfo;
