var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_shimm',
  password        : '2344',
  database        : 'cs340_shimm'
});

module.exports.pool = pool;
