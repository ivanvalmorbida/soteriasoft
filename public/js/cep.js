angular.module('BlankApp', ['ngMaterial'])
.controller('AppCtrl', function($http,$scope) {
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
                //$scope.cep          = data.dados
                if (data.dados.length>0){
                    $scope.complemento  = data.dados[0].complemento;
                    $scope.estado       = {codigo: data.dados[0].estado, nome: data.dados.estado_};
                    $scope.cidade       = {codigo: data.dados[0].cidade, nome: data.dados.cidade_};                
                    $scope.bairro       = {codigo: data.dados[0].bairro, nome: data.dados.bairro_};
                    $scope.endereco     = {codigo: data.dados[0].endereco, nome: data.dados.endereco_};
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
            endereco: $scope.endereco.codigo, complemeto: $scope.complemeto}).
        success(function (data, status, headers, config) {
            if (data.dados.length>0){
            }
        }).error(function (data, status, headers, config) {
            //
        });  
    }

    $scope.QueryEst = function(StrSearch) {
        return $http.get('/estado/inicio/nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            return data.data
        });
    };

    $scope.QueryCid = function(StrSearch) {
        return $http.get('/cidade/inicio/nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            console.dir(data.data);
            return data.data;
        });
    };

    $scope.QueryBai = function(StrSearch) {
        return $http.get('/bairro/inicio/nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            console.dir(data.data);
            return data.data;
        });
    };

    $scope.QueryEnd = function(StrSearch) {
        return $http.get('/endereco/inicio/nome', {
        params: {
            txt: StrSearch
        }
        }).then(function(data) {
            console.dir(data.data);
            return data.data;
        });
    };

    $scope.Limpar(); 
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