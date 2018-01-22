var express = require('express');
var router  = express.Router();

exports.active_user = function (req, res, callback) {
    if(req.session.UserCod==null){req.session.UserCod=''}

    if(req.session.UserCod==''){
        res.render('login');
    }
    else{
        callback(req, res);
    }
}