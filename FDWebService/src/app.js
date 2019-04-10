var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes/routing');
var errorLogger = require('./utilities/errorLogger');
var requestLogger = require('./utilities/requestLogger');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/',router);
app.use(errorLogger);
app.listen(1050);

console.log("app listening at 1050");
