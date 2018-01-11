var express = require('express');
var router = express.Router();
var settings = require("../settings");
var mysql = require('mysql');

exports.active_user = function (req, res, callback) {
    if(req.session.UserGoo==null){req.session.UserGoo=''}
    if(req.session.UserFac==null){req.session.UserFac=''}
    if(req.session.UserTwi==null){req.session.UserTwi=''}
    if(req.session.UserCod==null){req.session.UserCod=''}
    
    // credenciais do face ou google
     if (req.session.UserFac!='' || req.session.UserGoo!='' || req.session.UserTwi!=''){
        var str_ip = req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;  

        /*var args = {cl: {Codigo: req.session.UserCod, Email: req.session.UserEma, Nome: req.session.UserNom, Senha: '', Tel1: '', Tel2: '', 
            Face: req.session.UserFac, Google: req.session.UserGoo, IP: str_ip, Twitter: req.session.UserTwi}};
        */
        
        sql.connect(settings.dbConfig).then(function() {
            new sql.Request()
            .input('em', sql.NVarChar, req.session.UserEma)
            .input('fa', sql.NVarChar, req.session.UserFac)
            .input('go', sql.NVarChar, req.session.UserGoo)
            .input('tw', sql.NVarChar, req.session.UserTwi)
            .query("SELECT codigo, email, nome FROM tbSiteUsuario Where (email=@em and isnull(email,'')<>'') "+
                "or (IDTwitter=@tw and isnull(IDTwitter,'')<>'') or (IDFacebook=@fa and isnull(IDFacebook,'')<>'') or (IDGoogle=@go and isnull(IDGoogle,'')<>'')").then(function(rs) {
                if (rs.length==0){
                    /*soap.createClient(settings.webservice('usuario'), function(err, client) {
                        client.UpdateAnonimo(args, function(err, result) {
                            SalvarCookie(req, res);
                            AcessoUsuario(req, res, callback);
                        });
                    });*/
                    sql.close();
                } else {
                    req.session.UserCod=rs[0].codigo;
                    req.session.UserEma=rs[0].email;
                    req.session.UserNom=rs[0].nome;
                    sql.close();
                    AcessoUsuario(req, res, callback);
                }
            }).catch(function(err) {
                console.dir(err); 
            });
        });        
    }

    else {
        if(req.session.UserCod=='' || req.session.UserCod=='-1'){
            req.session.UserCod='-1';
            res.cookie('teste', req.session.UserCod, {maxAge: 1000});
            req.session.UserCod=req.cookies.teste;
            if (req.session.UserCod=='-1'){
                req.session.UserCod=req.cookies.codigo;
                if (req.session.UserCod==null){
                    sql.connect(settings.dbConfig).then(function() {
                        new sql.Request()
                        .execute('spSiteUserInsertAnonimo').then(function(rs) {
                            req.session.UserCod=rs.returnValue;
                            req.session.UserEma='';
                            req.session.UserNom='anonimo_temp_636';
                            SalvarCookie(req, res);
                            sql.close();
                            AcessoUsuario(req, res, callback);
                        })
                    })
                }
                else{
                    sql.connect(settings.dbConfig).then(function() {
                        var rq1 = new sql.Request();
                        rq1.stream = true;
                        rq1.input('co', sql.NVarChar, req.session.UserCod)
                        rq1.query("SELECT codigo, email, nome FROM tbSiteUsuario where codigo=@co");
                        rq1.on('row', function(r1) {
                            req.session.UserCod=r1.codigo;
                            req.session.UserEma=r1.email;
                            req.session.UserNom=r1.nome;
                            sql.close();
                            AcessoUsuario(req, res, callback);
                        });
                    });
                }
            } else{
                req.session.UserCod='-1';
                req.session.UserEma='';
                req.session.UserNom='anonimo_temp_636';
                AcessoUsuario(req, res, callback);
            }
        }
        else{
            AcessoUsuario(req, res, callback);
        }
    }
};

function AcessoUsuario(req, res, callback) {
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

    sql.connect(settings.dbConfig).then(function() {
        new sql.Request()
        .input('usu', sql.Int, req.session.UserCod)
        .input('ip', sql.VarChar(30), ip)
        .execute('spSiteUserAcess').then(function(rs) {
            sql.close();
            callback(req, res);
        })
    })
}

function SalvarCookie(req, res) {
    var minute = 60 * 1000;
    var hour = 60 * minute;
    var day = 24 * hour;
    var month = 30 * day;
    res.cookie('codigo', req.session.UserCod, {maxAge: month});
}