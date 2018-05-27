module.exports = function(){

    var express = require('express');
    var router = express.Router();

    function getSalesPeople(res, mysql, context, done){
        var sql_query = "SELECT salesrep_id, first_name, last_name, salary FROM proj_sales_reps";
        mysql.pool.query(sql_query, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.salesreps = result;

            done();
        });
    }

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO proj_sales_reps(first_name, last_name, salary) VALUES (?, ?, ?)";
        console.log(req.body);
        var inserts = [req.body.fname_input, req.body.lname_input, req.body.salary];
        
        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log("SALESREP ADDED TO DATABASE");
                res.redirect('/salespeople');
            }
        });
    });

    router.get('/', function(req, res){

        var callbackCount = 0;
        var context = {};
        context .jsscripts = ["deletesalesrep.js"];

        var mysql = req.app.get('mysql');

        getSalesPeople(res, mysql, context, done);

        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('salespeople', context);
            }
        }
    });

    router.delete('/:cid', function(req, res){

        console.log("DELETE ROUTE HIT");

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM proj_sales_reps WHERE salesrep_id = ?";
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

    return router;
}();