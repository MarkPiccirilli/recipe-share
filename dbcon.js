var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'SCIwsp123!',
  database        : 'recipe_share'
});
module.exports.pool = pool;
