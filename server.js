var express = require('express');
var exphbs  = require('express-handlebars'); 
var path = require('path');
var fs = require('fs');
var url = require('url');

var app = express();

var hbs = exphbs.create({
	defaultLayout : 'main',
	extname : '.hbs',
	layoutsDir : __dirname + '/views/layouts',
	partialsDir : __dirname + '/views'	
});
app.engine('hbs',hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/static')));