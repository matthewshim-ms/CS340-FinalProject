module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProducts(res, mysql, context, done){

        var sql = "SELECT product_id, name, description, quantity, price FROM proj_products";

        mysql.pool.query(sql, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.products = result;
            // console.log(context.products);
            done();
        });
    }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};

        context.jsscripts = ["deleteproduct.js"];

        var mysql = req.app.get('mysql');

        // callbacks
        getProducts(res, mysql, context, done);

        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('products', context);
            }
        }
    });

    router.post('/', function(req, res){
        var callbackCount = 0;
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO proj_products(name, description, quantity, price) VALUES (?, ?, ?, ?)";

        var inserts = [req.body.product_name, req.body.description, req.body.quantity, req.body.price];

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log('PRODUCT ADDED TO DATABASE');
                res.redirect('/products');
            }
        });
    });

    router.delete('/:pid', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM proj_products WHERE product_id = ?";

        var inserts = [req.body.pid];

        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.status(400);
                res.end();
            }else{
                res.status(202);
                res.end();
            }
        });
    });


    return router;
}();