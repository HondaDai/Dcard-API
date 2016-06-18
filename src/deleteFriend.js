var request = require('request');

var deleteFriend = function(util, param){
    var id = param;
    var url = 'https://www.dcard.tw/_api/friends/' + id.toString();
    var headers = {
        'x-csrf-token': util.CSRFToken
    };

    return new Promise((resolve, reject) => {
        request.delete({url: url, jar: util.jar, headers: headers}, function(err, res, body){
            if(res.statusCode == 204){
                resolve('delete success');   
            } else {
                reject(new Error(body));
            }
        });
    });
};

module.exports = deleteFriend;
