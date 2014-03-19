var http = require('http');

var express = require('express');
var redis = require('redis');

var api = require('./server/api');
var web = require('./server/web');

var PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var db = redis.createClient(6379, 'localhost', {retry_max_delay: 10 * 1000});

db.on('error', function(e) {});

db.on('end', function() {
  app.set('dbConnected', false);
});

db.on('connect', function() {
  app.set('dbConnected', true);
});

app.set('root', __dirname);
app.set('uploadDir', __dirname + '/images-upload');

app.use(express.static(app.get('root') + '/public'));

[api, web].forEach(function(extension) {
  extension(app, db);
});

server.listen(PORT, function() {
  console.log("Listening at http://localhost:" + PORT);
});