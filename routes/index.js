var express = require('express');
var router  = express.Router();
var auth = require('../authetication');

router.get('/', function(req, res) {
  auth.active_user(req, res, render_index)
});

function render_index(req, res) {
  res.render('index', { title: 'Express' });
}

module.exports = router;
