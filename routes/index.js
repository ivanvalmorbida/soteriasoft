var express = require('express');
var router  = express.Router();
var auth = require('../authetication');
var settings = require("../settings");
var mysql   = require('mysql')

const mongoose = require('mongoose');

//const uri = "mongodb+srv://ivan:ivanluis@cluster0-rqbkq.mongodb.net/ivan?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/ivan"

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
  connection.query("select * from tb_cep order by cep limit 800000, 100000;", function(err, rows) {
    if (!err){
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('MongoDB Connected…')
    
        var Schema = new mongoose.Schema({
          cep: {type: String},
          complemento: {type: String},
          endereco: {type: Number},
          bairro: {type: Number},
          cidade: {type: Number},
          estado: {type: Number}
        })
        var CEP = mongoose.model('CEP', Schema)

        for (i = 0; i < rows.length; i++) {
          console.dir(rows[i].cep)
          a = new CEP({
            cep: rows[i].cep,
            complemento: rows[i].complemento,
            endereco: rows[i].endereco,
            bairro: rows[i].bairro,
            cidade: rows[i].cidade,
            estado: rows[i].estado,
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
