var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_bruskea',
  password        : '5914',
  database        : 'cs340_bruskea'
});

module.exports.pool = pool;
