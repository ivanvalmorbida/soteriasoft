angular.module('Soteriasoft', ['ngMaterial', 'Soteriasoft.Comum'])
.controller('Soteriasoft.Control', function($http,$scope, $mdDialog) {
  function format(mask, number) {
    var s = ''+number, r = '';
    for (var im=0, is = 0; im<mask.length && is<s.length; im++) {
      r += mask.charAt(im)=='#' ? s.charAt(is++) : mask.charAt(im);
    }
    return r;
  }

  $scope.Limpar = function(booCep) {
    if(booCep==true){$scope.cep = ''};
    $scope.complemento  = '';
    $scope.estado     = null;
    $scope.cidade     = null;        
    $scope.bairro     = null;
    $scope.endereco   = null;        
  }
  
  $scope.BuscarCEP = function() {
    if ($scope.cep.length==9){
      $http.post('/cep/cep', {cep: $scope.cep}).
      success(function (data, status, headers, config) {
        if (data.dados.length>0){
          $scope.complemento  = data.dados[0].complemento;
          $scope.estado     = {codigo: data.dados[0].estado, nome: data.dados[0].estado_};
          $scope.cidade     = {codigo: data.dados[0].cidade, nome: data.dados[0].cidade_};        
          $scope.bairro     = {codigo: data.dados[0].bairro, nome: data.dados[0].bairro_};
          $scope.endereco   = {codigo: data.dados[0].endereco, nome: data.dados[0].endereco_};
        }else{
          $scope.Limpar(false);
        }
      }).error(function (data, status, headers, config) {
        //
      }); 
    }        
  }

  $scope.Gravar = function() {
    if($scope.estado==null){estado=0} else{estado=$scope.estado.codigo}
    if($scope.cidade==null){cidade=0} else{cidade=$scope.cidade.codigo}
    if($scope.bairro==null){bairro=0} else{bairro=$scope.bairro.codigo}
    if($scope.endereco==null){endereco=0} else{endereco=$scope.endereco.codigo}
    
    $http.post('/cep/gravar', {cep: $scope.cep, estado: estado, cidade: cidade, 
      bairro: bairro, endereco: endereco, complemento: $scope.complemento}).
    success(function (data, status, headers, config) {
      if (data.dados.length>0){
        alert('Informações salvas com sucesso!');
      }
    }).error(function (data, status, headers, config) {
      //
    });  
  }

  $scope.Localizar = function(ev) {
    $mdDialog.show({
      controller: LocalizarController,
      templateUrl: './cep/dlg/localizar',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {EstadoSigla: $scope.EstadoSigla}      
    })
    .then(function(answer) {
      if (answer>0){
        $scope.cep = format('#####-###', answer);
        $scope.BuscarCEP();
      }      
    }, function() {
      console.dir('You cancelled the dialog.');
    });
  };
  
  function LocalizarController($scope, $mdDialog, EstadoSigla) {
    $scope.EstadoSigla = EstadoSigla;

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
     
    $scope.Cancel = function() {
      $mdDialog.cancel();
    };

    $scope.LocalizarExe = function() {
      $http.post('/cep/endereco', { estado: $scope.l_estado.codigo,
      cidade: $scope.l_cidade.codigo, endereco: $scope.l_endereco.codigo}).
      success(function (data, status, headers, config) {
        $scope.l_dados = data.dados;
      }).error(function (data, status, headers, config) {
        //
      }); 
    };

    $scope.ExibirCEP = function(answer) {
      $mdDialog.hide(answer);
    };
  }

  $scope.Apagar = function(ev) {
    $mdDialog.show({
      controller: ApagarController,
      templateUrl: './cep/dlg/apagar',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {cep: $scope.cep }
    })
    .then(function(answer) {
      $http.post('/cep/apagar', {cep: $scope.cep}).
      success(function (data, status, headers, config) {
        $scope.Limpar();
      }).error(function (data, status, headers, config) {
        //
      });        
    }, function() {
      
    });
  };
  
  function ApagarController($scope, $mdDialog, cep) {
    $scope.cep = cep;

    $scope.Cancel = function() {
      $mdDialog.cancel();
    };

    $scope.Efetivar = function(answer) {
      $mdDialog.hide(answer);
    };
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

  $scope.Limpar(); 
});