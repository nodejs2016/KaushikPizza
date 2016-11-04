var express = require('express');
var exphbs  = require('express-handlebars'); 
var path = require('path');
var fs = require('fs');
var url = require('url');
var jsonQuery = require('json-query')
var sql = require('mssql'); 


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


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodeapp"
});


app.get('/', function(req,res){
	var pizzaData = JSON.parse(fs.readFileSync('./data/pizza.json', 'utf8'));
	console.log(pizzaData);
    res.render('home',pizzaData);
});

app.get('/authenticate', function(req,res){
	var queryData = url.parse(req.url, true).query;
	var username = queryData.username;
	var password = queryData.password;
	console.log('username ::' +username );
	console.log('password ::' +password );
	var userdata = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'));
	var result = jsonQuery('user[*username='+username +']', {data: userdata}).value
	console.log(result);
	if (result.length > 0 && result[0].password === password) {
		res.render('myaccount',result[0]);
	} else {

				var pizzaData = JSON.parse(fs.readFileSync('./data/pizza.json', 'utf8'));
				pizzaData.error = "your credentials are wrong";
	console.log(pizzaData);
    res.render('home',pizzaData);
	}

});

app.get('/feature', function (req, res) {
	var queryData = url.parse(req.url, true).query;
	var selectedId = queryData.id;
	console.log('selectedId : '+selectedId);
	var pizzadata = JSON.parse(fs.readFileSync('./data/pizza.json', 'utf8'));
	
	var result = jsonQuery('pizza[*id='+selectedId +']', {data: pizzadata}).value
	console.log(result);
    res.render('feature',result[0]);
});

app.get('/registration', function(req,res){
	res.render('registration');
});

app.get('/signup', function(req,res){
	res.render('signup');

});

 app.get('/aboutus', function (req, res) {
    res.render('aboutus');
});


app.get('/contactus', function (req, res) {
    res.render('contactus');
});

app.listen(3300, function () {
    console.log('express-handlebars example server listening on: 3300');
});
