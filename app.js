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
app.use('/products', require('./products.js'));
app.use('/orders', require('./orders.js'));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/view-latest', function(req, res){
    res.render('latest_info');
});

