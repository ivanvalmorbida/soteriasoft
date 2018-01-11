exports.dbConect = {
    host     : 'localhost',
    database : 'soteriasoft',
    user     : 'root',
    password : 'ivanluis'
};

var url = "http://localhost";
var webPort = 3000;
exports.webPort = webPort;

exports.facebook_api_key        = "658178304289739";
exports.facebook_api_secret     = "e644ae893299e9feb1e4bc5513e41a9c";
exports.facebook_callback_url   = url+":"+webPort+"/facebook/auth/callback";

exports.google_api_key          = "878663579438-dclpn2usuq6siu650nd4ftmrl2hgr6cd.apps.googleusercontent.com";
exports.google_api_secret       = "m5zDRBvMzMUDH9wZA_1Bxk9q";
exports.google_callback_url     = url+":"+webPort+"/google/auth/callback";

exports.httpMsgsFormat = "HTML";

exports.webservice = function (modulo) {
    return "http://172.16.171.251/webservice/" + modulo + ".asmx?wsdl"
};
// git config --global credential.helper wincred
// git config --global user.email "ivanvalmorbida@gmail.com"
// git config --global user.name "ivanvalmorbida"
// git clone https://github.com/ivanvalmorbida/soteriasoft.git

// https://git-scm.com/download
// git remote add origin https://github.com/ivanvalmorbida/soteriasoft.git
