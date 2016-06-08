# Dcard-API

這是一個 Nodejs module<br>
這個 module 提供一套符合 Promise/A+ 標準的 API<br>
有登入、取得好友、今日抽卡等等功能<br>
目前還在持續新增中<br>
如果需要什麼 API 也可以開個 Issue 讓我知道<br>

## 環境需求

- node >= 3.22.34

## 安裝

```bash
npm install Larry850806/Dcard-API
```

## 如何使用

```js
var DcardAPI = require('DcardAPI');

// 登入之後抽今天的卡
DcardAPI.login(account, password).then(function(res){

    return DcardAPI.getDcard();

}).then(function(dcard){

    console.log('今天的卡:');
    console.log(dcard);
    console.log();

});
```
    
## API 文件
- [DcardAPI.getAllSchool](#getAllSchool)
- DcardAPI.login
- DcardAPI.getCollection
- DcardAPI.getDcard
- DcardAPI.getFriends

---

<a name="getAllSchool"></a>
### Dcard.getAllSchool()
取得目前開放的所有學校<br>
__參數__
- `allSchool`: 一個陣列，包含目前開放的所有學校，若失敗則傳回錯誤
```js
Dcard.getAllSchool().then(function(allSchool){
    console.log(allSchool);
});
```
