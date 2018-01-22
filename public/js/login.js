angular.module('Soteriasoft', ['ngMaterial', 'Soteriasoft.Comum'])
.controller('Soteriasoft.Control', function($http, $scope, $mdDialog) {
  $scope.login = function() {
    $http.post('/usuario/login', {usu: $scope.usuario, sen: $scope.senha}).
    success(function (data, status, headers, config) {
      if (data.dados.length==0){
        alert('Usuário ou senha inválida!');
      }
      else{
        window.location.href='/';
      }

    }).error(function (data, status, headers, config) {
        //$scope.Limpar();
    });         
}

});