module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // GET ALL ORDERS
    function getOrders(res, mysql, context, done){

        var sql = "SELECT orders_id, date, cust.first_name, cust.last_name, reps.first_name, reps.last_name FROM proj_orders INNER JOIN proj_sales_reps reps ON sid = salesrep_id INNER JOIN proj_customers cust ON cid = customer_id;";

        mysql.pool.query(sql, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.orders = result;
            // console.log(context.products);
            done();
        });
    }
}