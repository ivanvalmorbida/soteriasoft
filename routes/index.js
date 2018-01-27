var express = require('express');
var router  = express.Router();
var auth = require('../authetication');
var settings = require("../settings");

router.get('/', function(req, res) {
  auth.active_user(req, res, render_index)
});

function render_index(req, res) {
  res.render('index', {empresa: settings.empresa});
}

module.exports = router;
