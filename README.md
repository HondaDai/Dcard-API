# Dcard-API

這是一個 Nodejs module
這個 module 提供很簡單的 API
包刮登入、取得好友、今日抽卡等等功能

因為還在開發階段 API 沒有很多
之後會慢慢新增
如果需要什麼 API 也可以開個 Issue 讓我知道

## 環境需求

- node >= 3.22.34

## 安裝

```bash
npm install Larry850806/Dcard-API
```

## 如何使用

```js
DcardAPI.login(account, password).then(function(res){

    return DcardAPI.getCollection();

}).then(function(collection){

    console.log('你收藏的文章:');
    console.log(collection);
    console.log();

    return DcardAPI.getDcard();

}).then(function(dcard){

    console.log('今天的卡:');
    console.log(dcard);
    console.log();

});
```
