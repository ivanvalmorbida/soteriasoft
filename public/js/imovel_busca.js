angular.module('Soteriasoft', ['ngMaterial', 'Soteriasoft.Comum'])
.controller('Soteriasoft.Control', function($http, $scope, $mdDialog) {
    
    $scope.tipo = 0;
    $scope.valor = 0;
    $scope.mcmv = false;
    $scope.financia = false;
    $scope.pessoa = null;
    $scope.estado = null;
    $scope.cidade = null;
    $scope.bairro = null;
    $scope.endereco = null;

    $scope.LocalizarTexto = function() {
        $('#container').hide();
        $http.post('/imovel_busca/localizar', {texto: $scope.texto}).
        success(function (data, status, headers, config) {
            $scope.l_dados = data.dados;
        }).error(function (data, status, headers, config) {
            //
        });            
    };
    
    $scope.Localizar = function() {
        $('#container').hide();

        if($scope.mcmv){mcmv=1} else{mcmv=0}
        if($scope.financia){financia=1} else{financia=0}
        if($scope.pessoa==null){pessoa=0} else{pessoa=$scope.pessoa.codigo}
        if($scope.estado==null){estado=0} else{estado=$scope.estado.codigo}
        if($scope.cidade==null){cidade=0} else{cidade=$scope.cidade.codigo}
        if($scope.bairro==null){bairro=0} else{bairro=$scope.bairro.codigo}
        if($scope.endereco==null){endereco=0} else{endereco=$scope.endereco.codigo}

        $http.post('/imovel_busca/localizar', {texto: '', tipo: $scope.tipo, valor: $scope.valor, 
            mcmv: mcmv, financia: financia, pessoa: pessoa, estado: estado, cidade: cidade, 
            bairro: bairro, endereco: endereco}).
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