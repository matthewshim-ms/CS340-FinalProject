module.exports = function(){

    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, done){
        var sql_query = "SELECT first_name, last_name FROM proj_customers";
        mysql.pool.query(sql_query, function(err, result, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }
            context.customers = result;
            complete();
        });
    }

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "proj_customers(first_name, last_name) VALUES (?, ?)";
        console.log(req);
        var inserts = [req.body.fname_input, req.body.lname_input];
        
        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }else{
                res.redirect('/customers');
            }
        });
    });

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};

        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('customers', context);
            }
        }
    });

    router.delete('/:cid', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM proj_customers WHERE customer_id ?";
        var insert = req.params.cid;

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(Err){
                res.write(JSON.stringify(err));
                res.end();
            }else{
                res.status(202);
                res.end();
            }
        });
    });

    return router;
}();