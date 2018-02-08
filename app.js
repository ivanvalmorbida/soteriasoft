var express = require('express'), 
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan');

var methodOverride = require('method-override'),
  errorHandler = require('error-handler'),
	http = require('http'),
  session = require('express-session'),
  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  settings = require("./settings"),
  fs = require('fs');
  
var server = http.createServer(app),
	io = require('socket.io').listen(server);

var routes = require('./routes/index'),
  cep = require('./routes/cep'),
  estado = require('./routes/estado'),
  cidade = require('./routes/cidade'),
  bairro = require('./routes/bairro'),
  endereco = require('./routes/endereco'),
  
  nacionalidade = require('./routes/nacionalidade'),
  estado_civil = require('./routes/estado_civil'),
  cbo = require('./routes/cbo'),
  atividade_economica = require('./routes/atividade_economica'),

  pessoa = require('./routes/pessoa'),
  pessoa_email = require('./routes/pessoa_email'),
  pessoa_fone = require('./routes/pessoa_fone'),  
  pessoa_fisica = require('./routes/pessoa_fisica'),  
  pessoa_juridica = require('./routes/pessoa_juridica'),

  imovel = require('./routes/imovel'),  
  imovel_construcao = require('./routes/imovel_construcao'),    
  imovel_financeiro = require('./routes/imovel_financeiro'),    
  imovel_terreno = require('./routes/imovel_terreno'),
  imovel_imagem = require('./routes/imovel_imagem'),
  imovel_busca = require('./routes/imovel_busca'),
  
  cliente_imovel = require('./routes/cliente_imovel');
  
var index = require('./routes/index');
var usuario = require('./routes/usuario');

var app = express();

app.use(cookieParser('soteriasoft'));
app.use(bodyParser());
  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', process.env.PORT || settings.webPort);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: '7C77-3D33-WppQ38S'}));

app.use(passport.initialize());
app.use(passport.session());

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID      : settings.facebook_api_key,
    clientSecret  : settings.facebook_api_secret ,
    callbackURL   : settings.facebook_callback_url,
    profileFields : ['id','emails', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      global.UserCod=0;
      global.UserEma=profile.emails[0].value;
      global.UserNom=profile.displayName;
      global.UserFac=profile.id;

      return done(null, profile);
    });
  }
));

passport.use(new GoogleStrategy({
    clientID        : settings.google_api_key,
    clientSecret    : settings.google_api_secret ,
    callbackURL     : settings.google_callback_url,
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      global.UserCod=0;
      global.UserEma=profile.emails[0].value;
      global.UserNom=profile.displayName;
      global.UserGoo=profile.id;

      return done(null, profile);
    }
  )}
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
// Fim passport

app.use('/', index);

app.get('/facebook/auth', passport.authenticate('facebook',{scope:'email'}));
app.get('/facebook/auth/callback',
  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/' }),
  function(req, res) {res.redirect('/');}
);
app.get('/google/auth', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/google/auth/callback',
  passport.authenticate('google', { successRedirect : '/', failureRedirect : '/'}),
  function(req, res) {res.redirect('/');}
);

app.get('/cep', cep.index);
app.get('/cep/dlg/localizar', cep.dlg_localizar);
app.get('/cep/dlg/apagar', cep.dlg_apagar);

app.get('/estado/estado_nome', estado.estado_nome);
app.get('/estado/estado_sigla', estado.estado_sigla);

app.get('/cidade/cidade_nome', cidade.cidade_nome);
app.get('/cidade/cidade_estado_nome', cidade.cidade_estado_nome);

app.get('/bairro/bairro_nome', bairro.bairro_nome);
app.get('/bairro/bairro_cidade_nome', bairro.bairro_cidade_nome);

app.get('/endereco/endereco_nome', endereco.endereco_nome);
app.get('/endereco/endereco_cidade_nome', endereco.endereco_cidade_nome);

app.get('/estado/estado_todos', estado.estado_todos);
app.get('/nacionalidade/nacionalidade_pais', nacionalidade.nacionalidade_pais);
app.get('/estado_civil/estado_civil_descricao', estado_civil.estado_civil_descricao);
app.get('/cbo/cbo_descricao', cbo.cbo_descricao);
app.get('/atividade_economica/atividade_economica_descricao', atividade_economica.atividade_economica_descricao);

app.get('/pessoa', pessoa.index);
app.get('/pessoa/pessoa_nome', pessoa.pessoa_nome);
app.get('/pessoa/dlg/apagar', pessoa.dlg_apagar);
app.get('/pessoa/dlg/localizar', pessoa.dlg_localizar);

app.get('/imovel', imovel.index);
app.get('/imovel/dlg/apagar', imovel.dlg_apagar);
app.get('/imovel/dlg/localizar', imovel.dlg_localizar);

app.get('/usuario', usuario.index);
app.get('/usuario/dlg/apagar', usuario.dlg_apagar);
app.get('/usuario/dlg/localizar', usuario.dlg_localizar);
app.get('/usuario/pessoa_nome', usuario.pessoa_nome);

app.get('/imovel_busca', imovel_busca.index);

app.get('/cliente_imovel', cliente_imovel.index);

app.post('/cep/cep', cep.cep);
app.post('/cep/endereco', cep.endereco);
app.post('/cep/gravar', cep.gravar);
app.post('/cep/apagar', cep.apagar);

app.post('/pessoa/gravar', pessoa.gravar);
app.post('/pessoa/codigo', pessoa.codigo);
app.post('/pessoa/localizar', pessoa.localizar);

app.post('/pessoa_email/apagar', pessoa_email.apagar);
app.post('/pessoa_email/gravar', pessoa_email.gravar);
app.post('/pessoa_email/pessoa', pessoa_email.pessoa);

app.post('/pessoa_fone/apagar', pessoa_fone.apagar);
app.post('/pessoa_fone/gravar', pessoa_fone.gravar);
app.post('/pessoa_fone/pessoa', pessoa_fone.pessoa);

app.post('/pessoa_fisica/gravar', pessoa_fisica.gravar);
app.post('/pessoa_fisica/pessoa', pessoa_fisica.pessoa);

app.post('/pessoa_juridica/gravar', pessoa_juridica.gravar);
app.post('/pessoa_juridica/pessoa', pessoa_juridica.pessoa);

app.post('/imovel/gravar', imovel.gravar);
app.post('/imovel/codigo', imovel.codigo);
app.post('/imovel/localizar', imovel.localizar);

app.post('/imovel_construcao/gravar', imovel_construcao.gravar);
app.post('/imovel_construcao/imovel', imovel_construcao.imovel);

app.post('/imovel_financeiro/gravar', imovel_financeiro.gravar);
app.post('/imovel_financeiro/imovel', imovel_financeiro.imovel);

app.post('/imovel_terreno/gravar', imovel_terreno.gravar);
app.post('/imovel_terreno/imovel', imovel_terreno.imovel);

app.post('/imovel_imagem/imovel', imovel_imagem.imovel);
app.post('/imovel_imagem/adicionar', imovel_imagem.adicionar);
app.post('/imovel_imagem/remover', imovel_imagem.remover);
app.post('/imovel_imagem/ordem', imovel_imagem.ordem);

app.post('/imovel_busca/localizar', imovel_busca.localizar);
app.post('/imovel_busca/palavra_chave', imovel_busca.palavra_chave);

app.post('/usuario/gravar', usuario.gravar);
app.post('/usuario/codigo', usuario.codigo);
app.post('/usuario/localizar', usuario.localizar);
app.post('/usuario/login', usuario.login);

app.post('/cliente_imovel/codigo', cliente_imovel.codigo);
app.post('/cliente_imovel/pessoa', cliente_imovel.pessoa);

app.get('*', routes);

///////////////////////////////////
///////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server escutando na porta ' + app.get('port'));
});
