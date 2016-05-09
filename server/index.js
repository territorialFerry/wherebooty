var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var url = require('url');

// controller functions
var controller = require('./controllers/apiAccess.js');

// handlebar setup
var engines = require('consolidate');

app.engine('hbs', engines.handlebars);
// setting up view engines
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// static files
app.use(express.static(__dirname));

app.get('/wherebooty', function(req, res, next){
  res.render('index');
})

app.get('/wherebooty/data', function(req, res, next){
  var URL = url.parse(req.url, true);
  // console.log('URL: ', URL.query);
  controller.getData(URL.query.region, URL.query.username, req, res);
  // res.send('blah')
})

// server.listen(8080,'127.0.0.1',function(){
//  server.close(function(){
//    server.listen(8080,'192.241.238.234')
//  })
// })


server.listen(8931, function(){
  console.log('listening on 8931');
})