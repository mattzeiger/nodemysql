// server.js
// load the things we need
var express = require('express');
var path = require('path');
var app = express();

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/customers', function(req, res) {
    res.render('customers');
});


app.listen(8080);
console.log('8080 is the magic port');