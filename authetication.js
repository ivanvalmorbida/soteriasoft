var settings = require("./settings")

exports.active_user = function (req, res, callback) {
  if(req.session.UserCod==null){req.session.UserCod=''}

  if(req.session.UserCod==''){
    res.render('login', {empresa: settings.empresa})
  }
  else{
    callback(req, res)
  }
}