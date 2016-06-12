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
- [`DcardAPI.getAllFriendInfo`](#getAllFriendInfo)
- [`DcardAPI.deteleFriend`](#deleteFriend)
- [`DcardAPI.getMessage`](#getMessage)

---

<a name="getAllSchool" />

### Dcard.getAllSchool()

取得目前開放的所有學校<br>

__參數__

- `allSchool`: 一個陣列，包含目前開放的所有學校

```js
Dcard.getAllSchool().then(function(allSchool){
    console.log(allSchool);
});
```

---

<a name="login" />

### Dcard.login(Dcard_Account, Dcard_Password)

登入並獲取權限<br>

__參數__

- `Dcard_Account`: Dcard 的帳號
- `Dcard_Password`: Dcard 的密碼
- `response`: 一個字串，登入成功會傳回 "success"

```js
DcardAPI.login(Dcard_Account, Dcard_Password).then(function(response){
    console.log(response);
});
```

---

<a name="getCollection" />

### Dcard.getCollection()

得到前幾篇收藏文章的資訊<br>

__參數__

- `collection`: 一個陣列，包含前幾篇收藏文章的資訊

```js
DcardAPI.getCollection().then(function(collection){
    console.log(collection);
});
```

---

<a name="getDcard" />

### Dcard.getDcard()

得到今日卡友的資訊<br>

__參數__

- `dcard`: 一個物件，包含名字、系級、照片等等，若沒有卡則傳回 "today no card"

```js
DcardAPI.getDcard().then(function(dcard){
    console.log(dcard);
});
```

---

<a name="getAllFriendInfo" />

### Dcard.getAllFriendInfo()

得到所有好友的資訊<br>

__參數__

- `allFriendInfo`: 一個陣列，每個元素都是一個好友，包含 id、名字、系級、照片等等

```js
DcardAPI.getAllFriendInfo().then(function(allFriendInfo){
    console.log(allFriendInfo);
});
```

---

<a name="deleteFriend" />

### Dcard.deteleFriend(id)

刪掉某個卡友<br>

__參數__

- `id`: 你要刪掉的那個好友 id，可以從`getAllFriendInfo()`得到
- `response`: 一個字串，刪除成功會傳回 "delete success"

```js
DcardAPI.getAllFriendInfo().then(function(allFriendInfo){
    var id = allFriendInfo[0].id              // 第一個卡友的 id
    return DcardAPI.deleteFriend(id);   // 刪掉第一個卡友
}).then(function(response){
    console.log(response);      // 檢查 response 看有沒有成功刪掉
});
```

---

<a name="getMessage" />

### Dcard.getMessage(id)

得到跟某個卡友的寫信記錄<br>

__參數__

- `id`: 你要得到記錄的那個好友 id，可以從`getAllFriendInfo()`得到
- `message`: 一個陣列裡面包了很多封信，每一封信都包含內容、時間等等

```js
DcardAPI.getAllFriendInfo().then(function(allFriendInfo){
    var id = allFriendInfo[0].id        // 第一個卡友的 id
    return DcardAPI.getMessage(id);     // 得到跟第一個卡友的記錄
}).then(function(message){
    console.log(message);
});
```
