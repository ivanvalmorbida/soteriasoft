var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

/* GET home page. */
router.get('/', function(req, res) {
  var connection = mysql.createConnection(settings.dbConect);

  connection.connect();

  connection.query('SELECT * from tb_uf', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
  });

  connection.end();


  res.render('index', { title: 'Express' });
});

module.exports = router;
