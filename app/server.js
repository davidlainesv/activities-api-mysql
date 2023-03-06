var express = require('express');
var router = require('./routes')
var bodyParser = require('body-parser');

var port = 8080
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(port);
console.log('API escuchando en el puerto ' + port);


module.exports = app;