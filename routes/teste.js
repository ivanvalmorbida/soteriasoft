var express = require('express');
var router  = express.Router();
var settings = require("../settings");
var mysql   = require('mysql');

exports.index = function (req, res) {
    res.render('testex');
};

exports.AjustarTabela = function (req, res) {
    var txt = req.query.txt;
    var strsql = '', strset = '', strsub = '';
    var connection = mysql.createConnection(settings.dbConect);
    connection.connect();
    connection.query("SELECT codigo,setor,subsetor FROM tb_atividade_economica", function(err, rows) {
        if (!err){
            for (i = 0; i < rows.length; i++) {
                if (rows[i].setor.trim()!=''){strset=rows[i].setor}
                if (rows[i].subsetor.trim()!=''){strsub=rows[i].subsetor}

                strsql = "Update tb_atividade_economica set setor='"+strset+
                "', subsetor='"+strsub+"' Where codigo="+rows[i].codigo;
                connection.query(strsql, function(err2, rows2) {
                    console.dir(err2);
                });
            }
            res.json({data: rows});
        }
    });   
};