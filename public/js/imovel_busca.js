angular.module('Soteriasoft', ['ngMaterial', 'Soteriasoft.Comum'])
.controller('Soteriasoft.Control', function($http, $scope, $mdDialog) {
    
    $scope.tipo = 0;
    $scope.valor = 0;
    $scope.mcmv = 0;
    $scope.financia = 0;
    $scope.pessoa = 0;
    $scope.estado = 0;
    $scope.cidade = 0;
    $scope.bairro = 0;
    $scope.endereco = 0;

    $scope.Localizar = function() {
        $('#container').hide();
        $http.post('/imovel_busca/localizar', {tipo: $scope.tipo, valor: $scope.valor, 
            mcmv: $scope.mcmv, financia: $scope.financia, pessoa: $scope.pessoa.codigo,
            estado: $scope.estado.codigo, cidade: $scope.cidade.codigo, 
            bairro: $scope.bairro.codigo, endereco: $scope.endereco.codigo}).
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
});