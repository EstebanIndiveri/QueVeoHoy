var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'user',
  password : 'admin',
  database : 'queveo'
});

module.exports = connection;
