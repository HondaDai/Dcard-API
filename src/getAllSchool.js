var request = require('request');

var getAllSchool = function(util, param){
    var url = 'https://www.dcard.tw/_api/forums';
    return new Promise(function(resolve, reject){
        request({url: url}, function(err, res, body){
            if(res.statusCode != 200){
                reject(new Error(body));
                return;
            }

            var allSchool = [];
            body = JSON.parse(body);
            body.forEach((e) => {
                if(e.isSchool) allSchool.push(e.name);
            });
            resolve(allSchool);
        });
    });
};

module.exports = getAllSchool;
