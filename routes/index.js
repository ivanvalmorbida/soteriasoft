var express = require('express');
var router  = express.Router();
var auth = require('../authetication');
var settings = require("../settings");
var mysql   = require('mysql')

const mongoose = require('mongoose');

const uri = "mongodb+srv://ivan:ivanluis@cluster0-rqbkq.mongodb.net/ivan?retryWrites=true&w=majority";
//const uri = "mongodb://localhost:27017/ivan"

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
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query("select * from tb_cidade order by nome", function(err, rows) {
    if (!err){
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          id: {type: Number},
          nome: {type: String},
        })
        var Cidade = mongoose.model('Cidade', Schema)

        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].Codigo)
          a = new Cidade({
            id: rows[i].Codigo,
            nome: rows[i].Nome
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
