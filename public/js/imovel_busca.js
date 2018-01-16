angular.module('Soteriasoft', ['ngMaterial', 'Soteriasoft.Comum'])
.controller('Soteriasoft.Control', function($http, $scope, $mdDialog) {
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