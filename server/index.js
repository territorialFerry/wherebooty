var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

// handlebar setup
var engines = require('consolidate');

app.engine('hbs', engines.handlebars);
// setting up view engines
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// static files
app.use(express.static(__dirname));

app.get('/wherebooty', function(req, res, next){
  console.log('haha');
  res.render('index');
})

app.get('/wherebooty/:data', function(req, res, next){
  console.log('blah');
  res.send('blah')
})

// server.listen(8080,'127.0.0.1',function(){
//  server.close(function(){
//    server.listen(8080,'192.241.238.234')
//  })
// })


server.listen(8931, function(){
  console.log('listening on 8931');
})