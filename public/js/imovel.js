angular.module('Soteriasoft', ['ngMaterial', 'ui.mask', 'Soteriasoft.Comum'])
.controller('Soteriasoft.Control', function($http, $scope, $mdDialog) {
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
        $scope.lote_unidade     = 0;
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
        
        //$scope.entrega          = '';
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
        $scope.mcmv         = false;
        $scope.financia     = false;
        $scope.entrada      = 0;
        $scope.permuta      = false;
        $scope.carro        = false;
        $scope.fgts         = false;
        $scope.condominio   = 0;
        $scope.captador     = 0;
    }

    $scope.Gravar = function() {
        $http.post('/imovel/gravar', {codigo: $scope.codigo, tipo: $scope.tipo, 
            proprietario: $scope.proprietario.codigo, documentacao: $scope.documentacao,
            inscricao_incra: $scope.inscricao_incra, lote_unidade: $scope.lote_unidade,
            quadra_bloco: $scope.quadra_bloco}).
        success(function (data, status, headers, config) {
            $scope.codigo = data.codigo;

            $http.post('/imovel_terreno/gravar', {imovel: $scope.codigo, 
                cep: $scope.cep, codigo: $scope.estado.codigo, 
                cidade: $scope.cidade.codigo, bairro: $scope.bairro.codigo, 
                endereco: $scope.endereco.codigo, numero: $scope.numero, 
                complemento: $scope.complemento, area_terreno: $scope.area_terreno,                
                frente: $scope.frente, fundo: $scope.fundo, lateral1: $scope.lateral1,
                lateral2: $scope.lateral2, gabarito: $scope.gabarito, esquina: $scope.esquina}); 
    
            $http.post('/imovel_construcao/gravar', {imovel: $scope.codigo, 
                entrega: $scope.entrega, ano_construcao: $scope.ano_construcao,
                area_total: $scope.area_total, area_privativa: $scope.area_privativa, 
                quartos: $scope.quartos, suites: $scope.suites, garagens:$scope.garagens, 
                mobiliada: $scope.mobiliada, churrasqueira: $scope.churrasqueira, 
                infra_ar_cond: $scope.infra_ar_cond, piso: $scope.piso, teto: $scope.teto, 
                reboco: $scope.reboco, murro: $scope.murro, portao: $scope.portao, 
                quintal_larg: $scope.quintal_larg, quintal_comp: $scope.quintal_comp,
                andar: $scope.andar}); 

            $http.post('/imovel_financeiro/gravar', {imovel: $scope.codigo, 
                valor: $scope.valor, mcmv: $scope.mcmv, financia: $scope.financia, 
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
    
    $scope.ExibirImovel = function(codigo) {
        $scope.codigo = codigo;
        $scope.BuscarCodigo();
        $('#myModalLocalizar').modal('hide');
    }

    $scope.BuscarCodigo = function() {
        $http.post('/imovel/codigo', {cod: $scope.codigo}).
        success(function (data, status, headers, config) {
            $scope.Limpar();
            if (data.dados.length>0){
                $scope.codigo = data.dados[0].codigo;
                $scope.tipo = data.dados[0].tipo;
                if(data.dados[0].proprietario>0){$scope.proprietario = {codigo: data.dados[0].proprietario, nome: data.dados[0].proprietario_}};
                $scope.documentacao = data.dados[0].documentacao;
                $scope.inscricao_incra = data.dados[0].inscricao_incra;
                $scope.lote_unidade = data.dados[0].lote_unidade;
                $scope.quadra_bloco = data.dados[0].quadra_bloco;
                
                $http.post('/imovel_terreno/imovel', {cod: $scope.codigo}).
                success(function (data, status, headers, config) {
                    if (data.dados.length>0){
                        $scope.cep = data.dados[0].cep;
                        if(data.dados[0].estado>0){$scope.estado = {codigo: data.dados[0].estado, nome: data.dados[0].estado_}};
                        if(data.dados[0].cidade>0){$scope.cidade = {codigo: data.dados[0].cidade, nome: data.dados[0].cidade_}};
                        if(data.dados[0].bairro>0){$scope.bairro = {codigo: data.dados[0].bairro, nome: data.dados[0].bairro_}};
                        if(data.dados[0].endereco>0){$scope.endereco = {codigo: data.dados[0].endereco, nome: data.dados[0].endereco_}};
                        $scope.numero = data.dados[0].numero;
                        $scope.complemento = data.dados[0].complemento;
                        $scope.area_terreno = data.dados[0].area_terreno;
                        $scope.frente = data.dados[0].frente;
                        $scope.fundo = data.dados[0].fundo;
                        $scope.lateral1 = data.dados[0].lateral1;
                        $scope.lateral2 = data.dados[0].lateral2;
                        $scope.gabarito = data.dados[0].gabarito;
                        $scope.esquina = data.dados[0].esquina;        
                    }
                });

                $http.post('/imovel_construcao/imovel', {cod: $scope.codigo}).
                success(function (data, status, headers, config) {
                    if (data.dados.length>0){
                        $scope.entrega = data.dados[0].entrega;
                        $scope.ano_construcao = data.dados[0].ano_construcao;
                        $scope.area_total = data.dados[0].area_total;
                        $scope.area_privativa = data.dados[0].area_privativa;
                        $scope.quartos = data.dados[0].quartos;
                        $scope.suites = data.dados[0].suites;
                        $scope.garagens = data.dados[0].garagens;
                        $scope.mobiliada = data.dados[0].mobiliada;
                        $scope.churasqueira = data.dados[0].churasqueira;
                        $scope.infra_ar_cond = data.dados[0].infra_ar_cond;
                        $scope.piso = data.dados[0].piso;
                        $scope.teto = data.dados[0].teto;
                        $scope.reboco = data.dados[0].reboco;
                        $scope.murro = data.dados[0].murro;
                        $scope.portao = data.dados[0].portao;
                        $scope.quintal_larg = data.dados[0].quintal_larg;
                        $scope.quintal_comp = data.dados[0].quintal_comp;
                        $scope.andar = data.dados[0].andar;
                    }
                });
        
                $http.post('/imovel_financeiro/imovel', {cod: $scope.codigo}).
                success(function (data, status, headers, config) {
                    if (data.dados.length>0){
                        $scope.valor = data.dados[0].valor;
                        $scope.mcmv = (data.dados[0].mcmv==1);
                        $scope.financia = data.dados[0].financia;
                        $scope.entrada = data.dados[0].entrada;
                        $scope.permuta = data.dados[0].permuta;
                        $scope.carro = data.dados[0].carro;
                        $scope.fgts = data.dados[0].fgts;
                        $scope.condominio = data.dados[0].condominio;
                        $scope.captador = data.dados[0].captador;
                    }
                });
            }
        }).error(function (data, status, headers, config) {
            $scope.Limpar();
        });         
    }

    $scope.Localizar = function(ev) {
        console.dir($scope.mcmv)
        /*$mdDialog.show({
          controller: ApagarController,
          templateUrl: './imovel/dlg/localizar',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: { inscricao_incra: $scope.inscricao_incra }
        })
        .then(function(answer, param) {
            if (answer=='loc'){
                $http.post('/imovel/localizar', {nome: param}).
                success(function (data, status, headers, config) {
                    $scope.l_dados = data.dados;
                }).error(function (data, status, headers, config) {
                    //
                });
            }
            else{

            }            
            console.dir('You said the information was "' + answer + '".');
        }, function() {
          console.dir('You cancelled the dialog.');
        });*/
    };
    
    function LocalizarController($scope, $mdDialog, inscricao_incra) {
        $scope.inscricao_incra = inscricao_incra;

        $scope.Cancel = function() {
          $mdDialog.cancel();
        };

        $scope.Efetivar = function(answer, param) {
            $mdDialog.hide(answer, param);
        };
    }
    
    $scope.PessoaNome = function(StrSearch) {
        return $http.get('/pessoa/pessoa_nome', {
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
});