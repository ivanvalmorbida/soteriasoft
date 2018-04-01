angular.module('Soteriasoft', ['ngMaterial', 'Soteriasoft.Comum'])
.controller('Soteriasoft.Control', function($http, $scope, $mdDialog) {
  $scope.Apagar = function(ev) {
    $mdDialog.show({
      controller: ApagarController,
      templateUrl: './usuario/dlg/apagar',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: { usuario: $scope.usuario }
    })
    .then(function(answer) {
      $http.post('/usuario/apagar', {cod: $scope.codigo}).
      success(function (data, status, headers, config) {
        $scope.Limpar()
      }).error(function (data, status, headers, config) {
        //
      })        
      console.dir('You said the information was "' + answer + '".')
    }, function() {
      console.dir('You cancelled the dialog.')
    })
  }
  
  function ApagarController($scope, $mdDialog, usuario) {
    $scope.usuario = usuario

    $scope.Cancel = function() {
      $mdDialog.cancel()
    }

    $scope.Efetivar = function(answer) {
      $mdDialog.hide(answer)
    }
  }
    
  $scope.Limpar = function() {
    $scope.codigo   = 0
    $scope.tipo   = 0
    $scope.pessoa   = 0
    $scope.usuario  = ''
    $scope.senha  = ''
  }

  $scope.Gravar = function() {
    $http.post('/usuario/gravar', {codigo: $scope.codigo, tipo: $scope.tipo, 
      pessoa: $scope.pessoa.codigo, senha: $scope.senha, usuario: $scope.usuario}).
    success(function (data, status, headers, config) {
      $scope.codigo = data.codigo
      ShowSnackBar('Informações salvas com sucesso!')
    })  
  }
  
  $scope.BuscarCodigo = function() {
    $http.post('/usuario/codigo', {cod: $scope.codigo}).
    success(function (data, status, headers, config) {
      $scope.Limpar()
      if (data.dados.length>0){
        $scope.codigo = data.dados[0].codigo
        $scope.tipo = data.dados[0].tipo
        if(data.dados[0].pessoa>0){$scope.pessoa = {codigo: data.dados[0].pessoa, nome: data.dados[0].pessoa_}}
        $scope.usuario = data.dados[0].usuario
        $scope.senha = data.dados[0].senha
        $scope.csenha = data.dados[0].senha
      }
    }).error(function (data, status, headers, config) {
      $scope.Limpar()
    })     
  }

  $scope.Localizar = function(ev) {
    console.dir($scope.mcmv)
    $mdDialog.show({
      controller: LocalizarController,
      templateUrl: './usuario/dlg/localizar',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
    .then(function(answer) {
      if (answer>0){
        $scope.codigo=answer
        $scope.BuscarCodigo()
      }      
      //console.dir('You said the information was "' + answer + '".')
    }, function() {
      console.dir('You cancelled the dialog.')
    })
  }
  
  function LocalizarController($scope, $mdDialog) {
    $scope.campopesq = 'usuario'

    $scope.Cancel = function() {
      $mdDialog.cancel()
    }

    $scope.LocalizarExe = function(camp, text) {
      $http.post('/usuario/localizar', {camp: camp, text: text}).
      success(function (data, status, headers, config) {
        $scope.l_dados = data.dados
      }).error(function (data, status, headers, config) {
        //
      })      
    }

    $scope.ExibirUsuario = function(answer) {
      $mdDialog.hide(answer)
    }
  }
  
  $scope.PessoaNome = function(StrSearch) {
    return $http.get('/pessoa/pessoa_nome', {
    params: {
      txt: StrSearch
    }
    }).then(function(data) {
      return data.data
    })
  }

  var url = new URL(location.href)
  var cod = url.searchParams.get("codigo")  
  if (cod!=undefined){
    $scope.codigo = cod
    $scope.BuscarCodigo()
  }
  else{
    $scope.Limpar()     
  }
})