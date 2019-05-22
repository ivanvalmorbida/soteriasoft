var 
  express         = require('express'), 
  bodyParser      = require('body-parser'),
  cookieParser    = require('cookie-parser'),
  path            = require('path'),
  logger          = require('morgan'),
 	http            = require('http'),
  session         = require('express-session'),
  settings        = require("./settings")
  
var server = http.createServer(app),
	io = require('socket.io').listen(server)

var app = express()

app.use(cookieParser('soteriasoft'))
app.use(bodyParser())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('port', process.env.PORT || settings.webPort)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret: '7C77-3D33-WppQ38S'}))

///////////// Modulos
app.use(require('./routes/atividade_economica'))
app.use(require('./routes/bairro'))
app.use(require('./routes/cbo'))
app.use(require('./routes/cep'))
app.use(require('./routes/cidade'))
app.use(require('./routes/cliente_imovel'))
app.use(require('./routes/cliente_imovel_construcao'))
app.use(require('./routes/cliente_imovel_financeiro'))
app.use(require('./routes/cliente_imovel_terreno'))
app.use(require('./routes/cliente_imovel_localizacao'))
app.use(require('./routes/cliente_imovel_tipo'))
app.use(require('./routes/endereco'))
app.use(require('./routes/estado_civil'))
app.use(require('./routes/estado'))
app.use(require('./routes/imovel_busca'))
app.use(require('./routes/imovel_construcao'))
app.use(require('./routes/imovel_financeiro'))
app.use(require('./routes/imovel_imagem'))
app.use(require('./routes/imovel_terreno'))
app.use(require('./routes/imovel_tipo'))
app.use(require('./routes/imovel'))
app.use(require('./routes/nacionalidade'))
app.use(require('./routes/pessoa_email'))
app.use(require('./routes/pessoa_fisica'))
app.use(require('./routes/pessoa_fone'))
app.use(require('./routes/pessoa_juridica'))
app.use(require('./routes/pessoa'))
app.use(require('./routes/usuario'))

app.use(require('./routes/index'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

//module.exports = app
http.createServer(app).listen(app.get('port'), function () {
  console.log('SoteriaSoft rodando na porta ' + app.get('port'))
})
