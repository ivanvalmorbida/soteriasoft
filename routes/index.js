var express = require('express');
var router  = express.Router();
var auth = require('../authetication');
var settings = require("../settings");
var mysql   = require('mysql')

const mongoose = require('mongoose');

const uri = "mongodb+srv://ivan:ivanluis@cluster0-rqbkq.mongodb.net/ivan?retryWrites=true&w=majority";
//mongodb+srv://ivan:*****@cluster0-rqbkq.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true

router.get('/teste', teste)
router.post('/exportar', exportar)
router.get('/', index)
router.get('*', index)

function index(req, res) {
  auth.active_user(req, res, render_index)
}

function render_index(req, res) {
  res.render('index', {empresa: settings.empresa});
}

function exportar(req, res) {
  //var ati = bb.bairro_tudo()
  //var ati = req.body.ati

  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query("select codigo,nome from tb_bairro order by Nome;", function(err, rows) {
    if (!err){
      //var ati=rows

      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          id: {type: Number},
          nome: {type: String}
        })
        var Bairro = mongoose.model('Bairro', Schema)
    
        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].codigo)
          a = new Bairro({
            id: rows[i].codigo,
            nome: rows[i].nome
          })
    
          a.save()
        }
      })
      .catch(err => console.log(err))
    }
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function teste(req, res) { 
  res.render('teste');
}

module.exports = router;
