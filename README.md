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

這套 API 不使用 reject，如果有錯誤會在 resolve 時傳回去

- [`DcardAPI.getAllSchool`](#getAllSchool)
- [`DcardAPI.login`](#login)
- [`DcardAPI.getCollection`](#getCollection)
- [`DcardAPI.getDcard`](#getDcard)
- [`DcardAPI.getFriends`](#getFriends)

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

---

<a name="login"></a>

### Dcard.login(Dcard_Account, Dcard_Password)

登入並獲取權限<br>

__參數__

- `Dcard_Account`: Dcard 的帳號
- `Dcard_Password`: Dcard 的密碼
- `response`: 一個字串，登入成功會傳回 success，若登入失敗則傳回 error

```js
DcardAPI.login(Dcard_Account, Dcard_Password).then(function(response){
    console.log(response);
});
```

---

<a name="getCollection"></a>

### Dcard.getCollection()

得到前幾篇收藏文章的資訊<br>

__參數__

- `collection`: 一個陣列，包含前幾篇收藏文章的資訊，若失敗則傳回 error

```js
DcardAPI.getCollection().then(function(collection){
    console.log(collection);
});
```

---

<a name="getDcard"></a>

### Dcard.getDcard()

得到今日卡友的資訊<br>

__參數__

- `dcard`: 一個物件，包含名字、系級、照片等等，若沒有卡則傳回 "today no card"，失敗則傳回 error

```js
DcardAPI.getDcard().then(function(dcard){
    console.log(dcard);
});
```
