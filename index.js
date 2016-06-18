var DcardAPI = require('./api');

var email = 'Dcard_Account';
var password = 'Dcard_Password';

DcardAPI.login({email: email, password: password}).then(function(res){
    
    return DcardAPI.getDcard();

}).then(function(dcard){

    console.log('今天的卡:');
    console.log(dcard);
    console.log();

}).catch((err) => {

    console.log(err);

});
