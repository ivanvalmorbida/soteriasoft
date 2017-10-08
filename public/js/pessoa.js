angular.module('MyApp', ['ngMaterial'])
.controller('AppCtrl', function($http,$scope) {
   
    $scope.Limpar = function() {
        $scope.codigo       = 0;
        $scope.tipo         = 0;
        $scope.nome         = '';
        $scope.cep          = '';
        $scope.estado       = 0;
        $scope.cidade       = 0;                
        $scope.bairro       = 0;
        $scope.endereco     = 0;                
        $scope.numero       = '';
        $scope.complemento  = '';
        $scope.obs          = '';
        $scope.emails       = [];
        $scope.email        = '';
        $scope.fones        = [];
        $scope.fone         = '';

        $scope.estadonasc       = 0;
        $scope.cidadenasc       = 0;
        $scope.nacionalidade    = 0;
        $scope.sexo             = 0;
        $scope.cpf              = '';
        $scope.identidade       = '';
        $scope.orgaoidentidade  = '';
        $scope.ufidentidade     = 0;
        $scope.estadocivil      = 0;
        $scope.conjuge          = 0;
        $scope.profissao        = 0;
        $scope.ctps             = '';
        $scope.pis              = '';
        
        $scope.razaosocial      = '';
        $scope.cnpj             = '';
        $scope.incricaoestadual = '';
        $scope.atividade        = 0;
        $scope.homepage         = '';
        $scope.representante    = 0;
    }

    $scope.Gravar = function() {
        $http.post('/pessoa/gravar', {codigo: $scope.codigo, tipo: $scope.tipo, 
        nome: $scope.nome, cep: $scope.cep, estado: $scope.estado.codigo, 
        cidade: $scope.cidade.codigo, bairro: $scope.bairro.codigo, 
        endereco: $scope.endereco.codigo, numero: $scope.numero, 
        complemento: $scope.complemento, obs: $scope.obs}).
        success(function (data, status, headers, config) {
            $scope.codigo = data.codigo;

            $http.post('/pessoa_email/gravar', {pessoa: $scope.codigo, emails: $scope.emails}); 

            $http.post('/pessoa_fone/gravar', {pessoa: $scope.codigo, fones: $scope.fones}); 
            
            if ($scope.tipo==1){
                $http.post('/pessoa_fisica/gravar', {pessoa: $scope.codigo, 
                nascimento: $scope.nascimento, ufnasc: $scope.ufnasc.codigo, 
                cidadenasc: $scope.cidadenasc.codigo, nacionalidade: $scope.nacionalidade.codigo, 
                sexo: $scope.sexo, cpf: $scope.cpf, identidade: $scope.identidade, 
                orgaoidentidade: $scope.orgaoidentidade, ufidentidade: $scope.ufidentidade.codigo, 
                estadocivil: $scope.estadocivil.codigo, conjuge: $scope.conjuge.codigo,
                profissao: $scope.profissao.cbo, ctps: $scope.ctps, pis: $scope.pis});
            } 
            
            if ($scope.tipo==2){
                $http.post('/pessoa_juridica/gravar', {pessoa: $scope.codigo, razaosocial: $scope.razaosocial,
                cnpj: $scope.cnpj, incricaoestadual: $scope.incricaoestadual, 
                atividade: $scope.atividade.codigo, homepage: $scope.homepage, 
                representante: $scope.representante.codigo});
            } 
        });  
    }

    $scope.addEmail = function() {
        $scope.emails.push($scope.email);
        $scope.email = '';
    }

    $scope.addFone = function() {
        $scope.fones.push($scope.fone);
        $scope.fone = '';
    }
    
    function format(mask, number) {
        var s = ''+number, r = '';
        for (var im=0, is = 0; im<mask.length && is<s.length; im++) {
          r += mask.charAt(im)=='#' ? s.charAt(is++) : mask.charAt(im);
        }
        return r;
    }  

    $scope.ApagarEfetivar = function(cep) {
        $http.post('/pessoa/pessoa_apagar', {cod: $scope.codigo}).
        success(function (data, status, headers, config) {
            $scope.Limpar(true);
            $('#myModalApagar').modal('hide');
        }).error(function (data, status, headers, config) {
            //
        });  
    }
    
    $scope.Apagar = function(cep) {
        $('#myModalApagar').modal('show');
    }
    
    $scope.ExibirCEP = function(cep) {
        $scope.cep = format('#####-###', cep);
        $scope.BuscarCEP();
        $('#myModalLocalizar').modal('hide');
    }

    $scope.BuscarCodigo = function() {
        $http.post('/pessoa/codigo', {cod: $scope.codigo}).
        success(function (data, status, headers, config) {
            $scope.Limpar();
            if (data.dados.length>0){
                $scope.codigo = data.dados[0].codigo;
                $scope.tipo = data.dados[0].tipo;
                $scope.nome = data.dados[0].nome;
                $scope.cep = data.dados[0].cep;
                if(data.dados[0].estado>0){$scope.estado = {codigo: data.dados[0].estado, nome: data.dados[0].estado_}};
                if(data.dados[0].cidade>0){$scope.cidade = {codigo: data.dados[0].cidade, nome: data.dados[0].cidade_}};
                if(data.dados[0].bairro>0){$scope.bairro = {codigo: data.dados[0].bairro, nome: data.dados[0].bairro_}};
                if(data.dados[0].endereco>0){$scope.endereco = {codigo: data.dados[0].endereco, nome: data.dados[0].endereco_}};
                $scope.numero = data.dados[0].numero;
                $scope.complemento = data.dados[0].complemento;
                $scope.obs = data.dados[0].obs;

                $http.post('/pessoa_email/pessoa', {cod: $scope.codigo}).
                success(function (data, status, headers, config) {
                    for (i = 0; i < data.dados.length; i++) {
                        $scope.emails.push(data.dados[i].email);
                    }
                }).error(function (data, status, headers, config) {

                }); 

                $http.post('/pessoa_fone/pessoa', {cod: $scope.codigo}).
                success(function (data, status, headers, config) {
                    for (i = 0; i < data.dados.length; i++) {
                        $scope.fones.push(data.dados[i].fone);
                    }
                }).error(function (data, status, headers, config) {

                });

                $http.post('/pessoa_fisica/pessoa', {cod: $scope.codigo}).
                success(function (data, status, headers, config) {
                    if (data.dados.length>0){
                        $scope.nascimento = new Date(data.dados[0].nascimento);
                        if(data.dados[0].ufnasc>0){$scope.ufnasc = {codigo: data.dados[0].ufnasc, nome: data.dados[0].ufnasc_}};
                        if(data.dados[0].cidadenasc>0){$scope.cidadenasc = {codigo: data.dados[0].cidadenasc, nome: data.dados[0].cidadenasc_}};
                        if(data.dados[0].nacionalidade>0){$scope.nacionalidade = {codigo: data.dados[0].nacionalidade, pais: data.dados[0].nacionalidade_}};                        
                        $scope.sexo = data.dados[0].sexo;
                        $scope.cpf = data.dados[0].cpf;
                        $scope.identidade = data.dados[0].identidade;
                        $scope.orgaoidentidade = data.dados[0].orgaoidentidade;
                        if(data.dados[0].ufidentidade>0){$scope.ufidentidade = {codigo: data.dados[0].ufidentidade, nome: data.dados[0].ufidentidade_}};                        
                        if(data.dados[0].estadocivil>0){$scope.estadocivil = {codigo: data.dados[0].estadocivil, descricao: data.dados[0].estadocivil_}};                        
                        if(data.dados[0].conjuge>0){$scope.conjuge = {codigo: data.dados[0].conjuge, nome: data.dados[0].conjuge_}};                        
                        if(data.dados[0].profissao>0){$scope.profissao = {cbo: data.dados[0].profissao, nome: data.dados[0].profissao_}};                        
                        $scope.ctps = data.dados[0].ctps;
                        $scope.pis = data.dados[0].pis;

                        alert($scope.nascimento);
                    }
                }).error(function (data, status, headers, config) {
                    
                });
                            
                $http.post('/pessoa_juridica/pessoa', {cod: $scope.codigo}).
                success(function (data, status, headers, config) {
                    if (data.dados.length>0){                        
                        $scope.razaosocial = data.dados[0].razaosocial;
                        $scope.cnpj = data.dados[0].cnpj;
                        $scope.incricaoestadual = data.dados[0].incricaoestadual;
                        if(data.dados[0].atividade>0){$scope.atividade = {codigo: data.dados[0].atividade, descricao: data.dados[0].atividade_}};
                        $scope.homepage = data.dados[0].homepage;
                        if(data.dados[0].representante>0){$scope.representante = {codigo: data.dados[0].representante, nome: data.dados[0].representante_}};                        
                    }
                }).error(function (data, status, headers, config) {
                    
                });
                            
            }
        }).error(function (data, status, headers, config) {
            $scope.Limpar();
        });         
    }

    $scope.Localizar = function() {
        $('#myModalLocalizar').modal('show'); 
    }

    $scope.LocalizarExe = function() {
        $http.post('/pessoa/pessoa', { estado: $scope.l_estado.codigo,
        cidade: $scope.l_cidade.codigo, endereco: $scope.l_endereco.codigo}).
        success(function (data, status, headers, config) {
            $scope.l_dados = data.dados;
        }).error(function (data, status, headers, config) {
            //
        }); 
    };
    
    $scope.PessoaNome = function(StrSearch) {
        return $http.get('/pessoa/pessoa_nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data
        });
    };

    $scope.AtividadeEconomicaDescricao = function(StrSearch) {
        return $http.get('/atividade_economica/atividade_economica_descricao', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data
        });
    };

    $scope.CBODescricao = function(StrSearch) {
        return $http.get('/cbo/cbo_descricao', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data
        });
    };
    
    $scope.EstadoCivilDescricao = function(StrSearch) {
        return $http.get('/estado_civil/estado_civil_descricao', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data
        });
    };

    $scope.NacionalidadePais = function(StrSearch) {
        return $http.get('/nacionalidade/nacionalidade_pais', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data
        });
    };

    $scope.EstadoNome = function(StrSearch) {
        return $http.get('/estado/estado_nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data
        });
    };

    $scope.CidadeNome = function(StrSearch) {
        return $http.get('/cidade/cidade_nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data;
        });
    };

    $scope.CidadeEstadoNome = function(StrSearch) {
        return $http.get('/cidade/cidade_estado_nome', {
        params: {
            txt: StrSearch,
            est: $scope.l_estado.codigo
        }
        }).then(function(data) {
            return data.data;
        });
    };
    
    $scope.BairroNome = function(StrSearch) {
        return $http.get('/bairro/bairro_nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data;
        });
    };

    $scope.EnderecoNome = function(StrSearch) {
        return $http.get('/endereco/endereco_nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data;
        });
    };

    $scope.EnderecoCidadeNome = function(StrSearch) {
        return $http.get('/endereco/endereco_cidade_nome', {
        params: {
            txt: StrSearch,
            est: $scope.l_estado.codigo,
            cid: $scope.l_cidade.codigo
        }
        }).then(function(data) {
            return data.data;
        });
    };    
    
    var url = new URL(location.href);
    var cod = url.searchParams.get("codigo");    
    if (cod!=undefined){
        $scope.codigo = cod;
        $scope.BuscarCodigo();
    }
    else{
        $scope.Limpar();         
    }
}).config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD/MM/YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
    }).directive('uiTelefone', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ctrl){
        var _formatTelefone = function(telefone){
            //(99)9999-9999 - 13dig
            //(99)99999-9999 - 14dig
            telefone = telefone.replace(/[^0-9]+/g, "");                
            if(telefone.length > 0){
                telefone = telefone.substring(-1,0) + "(" + telefone.substring(0);
            }
            if(telefone.length > 3){
                telefone = telefone.substring(0,3) + ")" + telefone.substring(3);
            }
            if(telefone.length == 12){
                telefone = telefone.substring(0,8) + "-" + telefone.substring(8);
            }else if(telefone.length >= 13){
                telefone = telefone.substring(0,9) + "-" + telefone.substring(9,13);
            }
            return telefone;
        }
        element.bind('keyup', function(){
            ctrl.$setViewValue(_formatTelefone(ctrl.$viewValue));
            ctrl.$render();
        });
        }
    }
}).directive('uiCep', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ctrl){
        var _formatCep = function(cep){
            cep = cep.replace(/[^0-9]+/g, "");                
            if(cep.length > 5){
                cep = cep.substring(0,5) + "-" + cep.substring(5,8);
            }
            return cep;
        }
        element.bind('keyup', function(){
            ctrl.$setViewValue(_formatCep(ctrl.$viewValue));
            ctrl.$render();
        });
        }
    }
});