module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // GET ALL ORDERS
    function getOrders(res, mysql, context, done){
  
        var sql_query = "SELECT orders_id, date, cust.first_name AS custFirstName, cust.last_name AS custLastName, reps.first_name AS repsFirstName, reps.last_name AS respLastName FROM proj_orders INNER JOIN proj_sales_reps reps ON sid = salesrep_id INNER JOIN proj_customers cust ON cid = customer_id;";
        mysql.pool.query(sql_query, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            
            console.log(result);
            context.orders = result;
            
            done();
        });
    }    

    // GET CUSTOMERS
    function getCustomers(res, mysql, context, done){
        var sql_query = "SELECT customer_id, first_name, last_name FROM proj_customers";
        mysql.pool.query(sql_query, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.customers = result;
            // console.log(context.customers);
            done();
        });
    }    


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


    function getSalesPeople(res, mysql, context, done){
        var sql_query = "SELECT salesrep_id, first_name, last_name, salary FROM proj_sales_reps";
        mysql.pool.query(sql_query, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.salesreps = result;
            // console.log(context.salesreps);
            done();
        });
    }

    router.get('/', function(req, res){

        var callbackCount = 0;
        var context = {};
        // context .jsscripts = ["deletecustomer.js"];

        var mysql = req.app.get('mysql');

        getCustomers(res, mysql, context, complete);
        getProducts(res, mysql, context, complete);
        getSalesPeople(res, mysql, context, complete);
        getOrders(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 4) {

                //console.log(context);

                res.render('orders', context);
            }
        }
    });


    // Add Orders
    router.post('/', function(req, res){
        var callbackCount = 0;
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO proj_orders(date, cid, sid, pid, quantity) VALUES (?, ?, ?, ?, ?);";

        var inserts = [req.body.date, req.body.cid, req.body.sid, req.body.pid, req.body.quantity];

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{

                res.redirect('/orders');
            }
        });
    });

    return router;
}();

