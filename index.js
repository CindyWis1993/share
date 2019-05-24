// 利用回调函数达到同步操作数据并获取信息的效果
var mysql = require('mysql')
var dbUtil = require('./dbUtil');
var express = require('express');
var request = require("request");
var querystring = require('querystring');
var bodyParser = require('body-parser');
var app = express();
var WXBizDataCrypt = require('./WXBizDataCrypt');
var qs = require('querystring');
var https = require("https");
var fs = require("fs");

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World');
});
var httpsServer = https.createServer(credentials. app);
httpsServer.listen(8088, function (e) {
    console.log('Example app listening on port 8088!');
});
httpsServer.setTimeout(0);