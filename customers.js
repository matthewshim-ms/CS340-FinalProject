module.exports = function(){

    var express = require('express');
    var router = express.Router();

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

    function getCustomer(res, mysql, context, customer_id, complete) {
        var sql = "SELECT customer_id, first_name, last_name FROM proj_customers WHERE customer_id = ?";
        var inserts = [customer_id];
        mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            }
            context.customers = results[0];
            complete();
        });
    }

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO proj_customers(first_name, last_name) VALUES (?, ?)";
        console.log(req.body);
        var inserts = [req.body.fname_input, req.body.lname_input];
        
        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }else{
                // console.log("CUSTOMER ADDED TO DATABASE");
                res.redirect('/customers');
            }
        });
    });

    router.get('/', function(req, res){

        var callbackCount = 0;
        var context = {};
        context .jsscripts = ["deletecustomer.js"];

        var mysql = req.app.get('mysql');

        getCustomers(res, mysql, context, done);

        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }
        }
    });

    router.delete('/:cid', function(req, res){

        console.log("DELETE ROUTE HIT");

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM proj_customers WHERE customer_id = ?";
        var inserts = req.params.cid;

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                // NOTE: ** WONT DELETE if CUSTOMER IS ASSOCIATED WITH SALES REP CURRENTLY
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                res.status(202);
                res.end();
            }
        });
    });

    router.get('/:customer_id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatecustomer.js"];
        var mysql = req.app.get('mysql');
        getCustomer(res, mysql, context, req.params.customer_id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1)
            {
                res.render('update-customer', context);
            }
        }
    });

    //The URI that update data is sent to in order to update the customer
    router.put('/:customer_id', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE proj_customers SET first_name=?, last_name=? WHERE customer_id=?";
        var inserts = [req.body.first_name, req.body.last_name, req.params.customer_id];
        sql = mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            } else {
                res.status(200);
                res.end();
                console.log("Updated Customer");
            }
        });
    });

    // router.put('/:cid', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     var sql = ""
    // });

    return router;
}();