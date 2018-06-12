module.exports = function(){

    var express = require('express');
    var router = express.Router();

    function getSalesPeople(res, mysql, context, done){
        var sql_query = "SELECT salesrep_id, proj_sales_reps.first_name, last_name, salary FROM proj_sales_reps";
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

    function getSalesRep(res, mysql, context, salesrep_id, complete) {
        var sql = "SELECT salesrep_id, first_name, last_name, salary FROM proj_sales_reps WHERE salesrep_id = ?";
        var inserts = [salesrep_id];
        mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            }
            context.salesreps = results[0];
            complete();
        });
    }

    //*************ADDED SALES REPS & THEIR CUSTOMERS */
    function getSalesRepsAndCustomers(res, mysql, context, done){
        var sql_query = "SELECT cust_rep.cid AS cid, cust_rep.sid AS sid, cust.first_name AS custFirstName, cust.last_name AS custLastName, reps.first_name AS repFirstName, reps.last_name AS repLastName FROM proj_customers cust INNER JOIN proj_customer_salesreps cust_rep ON cust_rep.cid = cust.customer_id INNER JOIN proj_sales_reps reps ON cust_rep.sid = reps.salesrep_id ORDER BY reps.last_name";
        mysql.pool.query(sql_query, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.customers_salesreps = result;
            // console.log(context.customers);
            done();
        });
    }

    // add Salesrep
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

    // assign salesrep to customer
    router.post('/associate', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO proj_customer_salesreps (cid, sid) VALUES (?, ?)";
        var hasError = false;
        console.log(req.body);
        var inserts = [req.body.customers, req.body.salesperson];
        console.log("Customer: ", req.body.customers);
        console.log("Sales Rep: ", req.body.salesperson);
        
        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){   
                console.log("ERROR");
                hasError = true;  
                res.redirect('/salespeople'); 
           //     res.redirect('/salespeople');
            //    alert("Cannot associate Sales Person with Customer that they are already associated with.")       
              // res.write(JSON.stringify(err));
             //  res.end();
            }else{
                res.redirect('/salespeople');
            }
        }); 
        console.log(sql);
        console.log(hasError);

        if (hasError) {
            alert("Cannot associate Sales Person with Customer that they are already associated with.");       
        }
      /*  if (err) {
            res.redirect('/salespeople');
            alert("Cannot associate Sales Person with Customer that they are already associated with.");       
        }
        else {
            res.redirect('/salespeople');
        } */
    });


    router.get('/', function(req, res){

        var callbackCount = 0;
        var context = {};
        context .jsscripts = ["deletesalesrep.js", "disassociateRepAndCust.js"];

        var mysql = req.app.get('mysql');

        getSalesPeople(res, mysql, context, done);
        getCustomers(res, mysql, context, done);
        getSalesRepsAndCustomers(res, mysql, context, done)

        function done(){
            callbackCount++;

            if(callbackCount >= 3){

                //console.log(context);

                res.render('salespeople', context);
            }
        }
    });

    router.delete('/:cid', function(req, res){
        console.log("DELETE ROUTE HIT");

        var cid = req.params.cid.substring(0, req.params.cid.indexOf('_'));
        var sid = req.params.cid.split('_')[1];

        var mysql = req.app.get('mysql');

        if (typeof sid === "string") {
            var sql = "DELETE FROM proj_customer_salesreps WHERE cid = ? AND sid = ?";
            var inserts = [cid, sid];
            console.log("Not Defined.");
        } else {
             var sql = "DELETE FROM proj_sales_reps WHERE salesrep_id = ?";
             var inserts = req.params.cid;
             console.log("Defined.");
        }

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

    //Update Sales Rep

    router.get('/:salesrep_id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatesalesrep.js"];
        var mysql = req.app.get('mysql');
        getSalesRep(res, mysql, context, req.params.salesrep_id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1)
            {
                res.render('update-salesrep', context);
            }
        }
    });

    //The URI that update data is sent to in order to update the sales person
    router.put('/:salesrep_id', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE proj_sales_reps SET first_name=?, last_name=?, salary=? WHERE salesrep_id =?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.salary, req.params.salesrep_id];
        sql = mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
            } else {
                res.status(200);
                res.end();
                console.log("Updated Sales Rep");
            }
        });
    });
    
    return router;
}();