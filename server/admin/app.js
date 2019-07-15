const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(compress());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});

//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(compress());
// app.use(express.static("dist"));

module.exports = app;