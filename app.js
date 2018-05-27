const express = require('express');
const mysql = require('./dbcon.js');
const bP = require('body-parser');
const path = require('path');
const handleBars = require('express-handlebars').create({ 
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
});

// EXPRESS server config
var app = express();
app.set('port', 65234);
var server = app.listen( process.env.PORT || 65234 || app.get('port'), function(){
    console.log('Listening on port ' + server.address().port);
});
app.set('mysql', mysql);
app.use(bP.urlencoded({extended:true}));


app.use('/static', express.static('public'));

// handlebars config
app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));


app.use('/customers', require('./customers.js'));
app.use('/salespeople', require('./salespeople.js'));


app.get('/', function(req, res){
    res.render('index');
});


app.get('/new-order', function(req, res){
    res.render('add_order');
});

app.get('/orders', function(req, res){
    res.render('orders');
});

app.get('/products', function(req, res){
    res.render('products');
});

app.get('/salespeople', function(req, res){
    res.render('salespeople');
});

app.get('/view-latest', function(req, res){
    res.render('latest_info');
});

app.get('/add-product', function(req, res){
    res.render('add_product');
});


app.get('/add-salesperson', function(req, res){
    res.render('add_salesperson');
});

