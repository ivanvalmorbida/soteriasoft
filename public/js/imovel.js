angular.module('MyApp', ['ngMaterial','ui.mask'])
.controller('AppCtrl', function($http, $scope, $mdDialog) {
    $scope.format = function(mask, number) {
        return format(mask, number);
    }  

    $scope.Apagar = function(ev) {
        $mdDialog.show({
          controller: ApagarController,
          templateUrl: './imovel/dlg/apagar',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: { inscricao_incra: $scope.inscricao_incra }
        })
        .then(function(answer) {
            $http.post('/imovel/apagar', {cod: $scope.codigo}).
            success(function (data, status, headers, config) {
                $scope.Limpar();
            }).error(function (data, status, headers, config) {
                //
            });              
          console.dir('You said the information was "' + answer + '".');
        }, function() {
          console.dir('You cancelled the dialog.');
        });
    };
    
    function ApagarController($scope, $mdDialog, inscricao_incra) {
        $scope.inscricao_incra = inscricao_incra;

        $scope.Cancel = function() {
          $mdDialog.cancel();
        };

        $scope.Efetivar = function(answer) {
            $mdDialog.hide(answer);
        };
    }
      
    $scope.Limpar = function() {
        $scope.codigo           = 0;
        $scope.tipo             = 0;
        $scope.proprietario     = 0;
        $scope.documentacao     = 0;
        $scope.inscricao_incra  = '';
        $scope.lote_unidade     = '';
        $scope.quadra_bloco     = '';
        
        $scope.cep          = '';
        $scope.estado       = 0;
        $scope.cidade       = 0;                
        $scope.bairro       = 0;
        $scope.endereco     = 0;                
        $scope.numero       = '';
        $scope.complemento  = '';
        $scope.area_terreno = 0;                
        $scope.frente       = 0;                
        $scope.fundo        = 0;                
        $scope.lateral1     = 0;                
        $scope.lateral2     = 0;                
        $scope.gabarito     = 0;                
        $scope.esquina      = 0;                
        
        $scope.entrega          = '';
        $scope.ano_construcao   = 0;
        $scope.area_total       = 0;
        $scope.area_privativa   = 0;
        $scope.quartos          = 0;
        $scope.suites           = 0;
        $scope.garagens         = 0;
        $scope.mobiliada        = 0;
        $scope.churasqueira     = 0;
        $scope.infra_ar_cond    = 0;
        $scope.piso             = 0;
        $scope.teto             = 0;
        $scope.reboco           = 0;
        $scope.murro            = 0;
        $scope.portao           = 0;
        $scope.quintal_larg     = 0;
        $scope.quintal_comp     = 0;
        $scope.andar            = 0;

        $scope.valor        = 0;
        $scope.mcmv         = 0;
        $scope.financia     = 0;
        $scope.entrada      = 0;
        $scope.permuta      = 0;
        $scope.carro        = 0;
        $scope.fgts         = 0;
        $scope.condominio   = 0;
        $scope.captador     = 0;
    }

    $scope.Gravar = function() {
        $http.post('/imovel/gravar', {codigo: $scope.codigo, tipo: $scope.tipo, 
            proprietario: $scope.proprietario, documentacao: $scope.documentacao,
            inscricao_incra: $scope.inscricao_incra, lote_unidade: $scope.lote_unidade,
            quadra_bloco: $scope.quadra_bloco}).
        success(function (data, status, headers, config) {
            $scope.codigo = data.codigo;

            $http.post('/imovel_terreno/gravar', {codigo: $scope.codigo, 
                cep: $scope.cep, codigo: $scope.estado.codigo, 
                cidade: $scope.cidade.codigo, bairro: $scope.bairro.codigo, 
                endereco: $scope.endereco.codigo, numero: $scope.numero, 
                complemento: $scope.complemento, area_terreno: $scope.area_terreno,                
                frente: $scope.frente, fundo: $scope.fundo, lateral1: $scope.lateral1,
                lateral2: $scope.lateral2, gabarito: $scope.gabarito, esquina: $scope.esquina}); 
    
            $http.post('/imovel_construcao/gravar', {codigo: $scope.codigo, 
                entrega: $scope.entrega, ano_construcao: $scope.ano_construcao,
                area_total: $scope.area_total, area_privativa: $scope.area_privativa, 
                quartos: $scope.quartos, suites: $scope.suites, garagens:$scope.garagens, 
                mobiliada: $scope.mobiliada, churasqueira: $scope.churasqueira, 
                infra_ar_cond: $scope.infra_ar_cond, piso: $scope.piso, teto: $scope.teto, 
                reboco: $scope.reboco, murro: $scope.murro, portao: $scope.portao, 
                quintal_larg: $scope.quintal_larg, quintal_comp: $scope.quintal_comp,
                andar: $scope.andar}); 

            $http.post('/imovel_terreno/gravar', {codigo: $scope.codigo, 
                valor: $scope.valor,mcmv: $scope.mcmv, financia: $scope.financia, 
                entrada: $scope.entrada, permuta: $scope.permuta, carro: $scope.carro,
                fgts: $scope.fgts, condominio: $scope.condominio, captador: $scope.captador}); 

        });  
    }
  
    function format(mask, number) {
        var s = ''+number, r = '';
        for (var im=0, is = 0; im<mask.length && is<s.length; im++) {
          r += mask.charAt(im)=='#' ? s.charAt(is++) : mask.charAt(im);
        }
        return r;
    }  
    
    $scope.ExibirPessoa = function(codigo) {
        $scope.codigo = codigo;
        $scope.BuscarCodigo();
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
                        if(data.dados[0].profissao>0){$scope.profissao = {cbo: data.dados[0].profissao, descricao: data.dados[0].profissao_}};                        
                        $scope.ctps = data.dados[0].ctps;
                        $scope.pis = data.dados[0].pis;
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
        $http.post('/pessoa/localizar', {nome: $scope.txtpesquisa}).
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