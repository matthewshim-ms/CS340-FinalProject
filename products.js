module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // GET ALL PRODUCTS
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

    // GET ONE PRODUCT
    function getOneProduct(res, mysql, context, pid, done){

        var sql = "SELECT product_id, name, description, quantity, price FROM proj_products WHERE product_id=?";
        var inserts = [pid];

        mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.product = result[0];
            done();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteproduct.js"];

        var mysql = req.app.get('mysql');

        getProducts(res, mysql, context, done);

        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('products', context);
            }
        }
    });

    // UPDATE ONE PRODUCT
    router.get('/:pid', function(req, res){

        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateproduct.js"];
        var mysql = req.app.get('mysql');

        getOneProduct(res, mysql, context, req.params.pid, done);

        function done(){
            callbackCount++;
            if(callbackCount >= 1){

                console.log(context);
                
                res.render('update-product', context);
            }
        }
    });

    // CREATE ONE PRODUCT
    router.post('/', function(req, res){

        console.log("ADDING PRODUCT");
        console.log(req.body);

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
                res.redirect('/products');
            }
        });
    });

    router.put('/:pid', function(req, res){

        console.log(req.params);

        var mysql = req.app.get('mysql');
        var sql = "UPDATE proj_products SET name=?, description=?, quantity=?, price=? WHERE product_id=?";
        var inserts = [req.body.product_name, req.body.description, req.body.quantity, req.body.price, req.params.pid];

        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log("PRODUCT UPDATED");
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/:pid', function(req, res){

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM proj_products WHERE product_id = ?";

        var inserts = [req.params.pid];

        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.status(400);
                res.end();
            }else{
                res.status(202);
                console.log("DELETE CONFIRMED");
                res.end();
            }
        });
    });


    return router;
}();