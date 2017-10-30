angular.module('MyApp', ['ngMaterial', 'MyApp.Comum'])
.controller('AppCtrl', function($http,$scope) {
    function format(mask, number) {
        var s = ''+number, r = '';
        for (var im=0, is = 0; im<mask.length && is<s.length; im++) {
          r += mask.charAt(im)=='#' ? s.charAt(is++) : mask.charAt(im);
        }
        return r;
    }  

    $scope.ApagarEfetivar = function(cep) {
        $http.post('/cep/cep_apagar', {cep: $scope.cep}).
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

    $scope.Limpar = function(booCep) {
        if(booCep==true){$scope.cep = null};
        $scope.complemento  = null;
        $scope.estado       = null;
        $scope.cidade       = null;                
        $scope.bairro       = null;
        $scope.endereco     = null;                
    }
    
    $scope.BuscarCEP = function() {
        if ($scope.cep.length==9){
            $http.post('/cep/cep_cep', {cep: $scope.cep}).
            success(function (data, status, headers, config) {
                if (data.dados.length>0){
                    $scope.complemento  = data.dados[0].complemento;
                    $scope.estado       = {codigo: data.dados[0].estado, nome: data.dados[0].estado_};
                    $scope.cidade       = {codigo: data.dados[0].cidade, nome: data.dados[0].cidade_};                
                    $scope.bairro       = {codigo: data.dados[0].bairro, nome: data.dados[0].bairro_};
                    $scope.endereco     = {codigo: data.dados[0].endereco, nome: data.dados[0].endereco_};
                }else{
                    $scope.Limpar(false);
                }
            }).error(function (data, status, headers, config) {
                //
            }); 
        }              
    }

    $scope.Gravar = function() {
        $http.post('/cep/cep_gravar', {cep: $scope.cep, estado: $scope.estado.codigo, 
            cidade: $scope.cidade.codigo, bairro: $scope.bairro.codigo, 
            endereco: $scope.endereco.codigo, complemento: $scope.complemento}).
        success(function (data, status, headers, config) {
            if (data.dados.length>0){
            }
        }).error(function (data, status, headers, config) {
            //
        });  
    }

    $scope.Localizar = function() {
        $('#myModalLocalizar').modal('show'); 
    }

    $scope.EstadoNome = function(StrSearch) {
        return $http.get('/estado/estado_nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data
        });
    };

    $scope.EstadoSigla = function(StrSearch) {
        return $http.get('/estado/estado_sigla', {
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

    $scope.LocalizarExe = function() {
        $http.post('/cep/cep_endereco', { estado: $scope.l_estado.codigo,
        cidade: $scope.l_cidade.codigo, endereco: $scope.l_endereco.codigo}).
        success(function (data, status, headers, config) {
            $scope.l_dados = data.dados;
        }).error(function (data, status, headers, config) {
            //
        }); 
    };
    
    $scope.Limpar(); 
});