angular.module('Soteriasoft', ['ngMaterial', 'ui.mask', 'Soteriasoft.Comum'])
.controller('Soteriasoft.Control', function($http, $scope, $mdDialog) {
  
  $scope.addTipo = function() {
    console.dir($scope.tipo)
    $scope.tipos.push({'codigo': $scope.tipo.codigo, 'descricao': $scope.tipo.descricao})
    $scope.tipo = null
  }

  $http.get('/imovel_tipo/todos').then(function(res) {
    $scope.tipo_imovel = res.data.tipo_todos
  })

  $scope.newLoc = function(chip) {
    return {
      name: chip,
      type: 'unknown'
    }
  }
  
  $scope.format = function(mask, number) {
    return format(mask, number)
  }  

  $scope.Apagar = function(ev) {
    console.dir($scope.pessoa_)
  };
  
  $scope.Limpar = function() {
    $scope.codigo = 0
    $scope.pessoa = null
    $scope.pessoa_ = ''
    $scope.fones = []
    $scope.emails = []
    $scope.interesse = 0
    $scope.renda = 0
    $scope.origem  = 0
    $scope.responsavel = null

    $scope.estado = null
    $scope.cidade = null
    $scope.bairro = null
    $scope.localizacoes = [
      {
        'estado' : 'SC',
        'cidade' : 'Joinville',
        'bairro' : 'Centro'
      },
      {
        'estado' : 'SC',
        'cidade' : 'Joinille',
        'bairro' : 'Anita Garibaldi'
      },
      {
        'estado' : 'SC',
        'cidade' : 'Joinville',
        'bairro' : 'Floresta'
      }
    ]
    $scope.area_terreno = 0
    $scope.frente = 0
    $scope.fundo = 0
    $scope.lateral1 = 0
    $scope.lateral2 = 0
    $scope.gabarito = 0
    $scope.esquina = 0
    
    $scope.tipos = [{codigo: 1, descricao: 'apto'}]
    $scope.ano_construcao = 0
    $scope.area_total = 0
    $scope.area_privativa = 0
    $scope.quartos = 0
    $scope.suites = 0
    $scope.garagens = 0
    $scope.mobiliada = false
    $scope.churasqueira = false
    $scope.infra_ar_cond = false
    $scope.piso = 0
    $scope.teto = 0
    $scope.reboco = 0
    $scope.murro = false
    $scope.portao = false
    $scope.quintal_larg = 0
    $scope.quintal_comp = 0
    $scope.andar = 0

    $scope.valor = 0
    $scope.mcmv = false
    $scope.financia = false
    $scope.entrada = 0
    $scope.permuta = 0
    $scope.carro = 0
    $scope.fgts = 0
    $scope.condominio = 0
  }

  $scope.Gravar = function() {
    if($scope.pessoa==null){pessoa=0} else{pessoa=$scope.pessoa.codigo}
    if($scope.responsavel==null){responsavel=0} else{responsavel=$scope.responsavel.codigo}

    $http.post('/cliente_imovel/gravar', {codigo: $scope.codigo, pessoa: pessoa, 
      pessoa_: $scope.pessoa_, fones: $scope.fones, emails: $scope.emails, 
      interesse: $scope.interesse, renda: $scope.renda, origem: scope.origem, 
      responsavel : responsavel}).
    success(function (data, status, headers, config) {
      $scope.codigo = data.codigo;

      if($scope.estado==null){estado=0} else{estado=$scope.estado.codigo}
      if($scope.cidade==null){cidade=0} else{cidade=$scope.cidade.codigo}
      if($scope.bairro==null){bairro=0} else{bairro=$scope.bairro.codigo}
      
      if ($scope.esquina==false) {esquina=0} else {esquina=1};
        
      if ($scope.mobiliada==false) {mobiliada=0} else {mobiliada=1};  
      if ($scope.churrasqueira==false) {churrasqueira=0} else {churrasqueira=1};  
      if ($scope.infra_ar_cond==false) {infra_ar_cond=0} else {infra_ar_cond=1};  
      if ($scope.reboco==false) {reboco=0} else {reboco=1};   
      if ($scope.murro==false) {murro=0} else {murro=1};  
      if ($scope.portao==false) {portao=0} else {portao=1};   

      if ($scope.mcmv==false) {mcmv=0} else {mcmv=1};   
      if ($scope.financia==false) {financia=0} else {financia=1};   
      if ($scope.permuta==false) {permuta=0} else {permuta=1};   
      if ($scope.carro==false) {carro=0} else {carro=1};   
      if ($scope.fgts==false) {fgts=0} else {fgts=1};   
   
      $http.post('/imovel_terreno/gravar', {imovel: $scope.codigo, 
        cep: $scope.cep, estado: estado, cidade: cidade, bairro: bairro, 
        endereco: endereco, numero: $scope.numero, complemento: $scope.complemento, 
        area_terreno: $scope.area_terreno, frente: $scope.frente, fundo: $scope.fundo, 
        lateral1: $scope.lateral1, lateral2: $scope.lateral2, gabarito: $scope.gabarito, 
        esquina: esquina});      
 
      $http.post('/imovel_construcao/gravar', {imovel: $scope.codigo, 
        entrega: $scope.entrega, ano_construcao: $scope.ano_construcao,
        area_total: $scope.area_total, area_privativa: $scope.area_privativa, 
        quartos: $scope.quartos, suites: $scope.suites, garagens: $scope.garagens, 
        mobiliada: mobiliada, churrasqueira: churrasqueira, infra_ar_cond: infra_ar_cond, 
        piso: $scope.piso, teto: $scope.teto, reboco: reboco, murro: murro, portao: portao, 
        quintal_larg: $scope.quintal_larg, quintal_comp: $scope.quintal_comp,
        andar: $scope.andar}); 

      $http.post('/imovel_financeiro/gravar', {imovel: $scope.codigo, 
        valor: $scope.valor, mcmv: mcmv, financia: financia, 
        entrada: $scope.entrada, permuta: permuta, carro: carro,
        fgts: fgts, condominio: $scope.condominio, captador: $scope.captador}); 
            
      alert('Informações salvas com sucesso!');
    });  
  }
  
  function format(mask, number) {
    var s = ''+number, r = '';
    for (var im=0, is = 0; im<mask.length && is<s.length; im++) {
      r += mask.charAt(im)=='#' ? s.charAt(is++) : mask.charAt(im);
    }
    return r;
  }  

  $scope.BuscarCliente = function() {
    if ($scope.cliente!=null){
      $http.post('/pessoa_email/pessoa', {cod: $scope.cliente.codigo}).
      success(function (data, status, headers, config) {
        for (i = 0; i < data.dados.length; i++) {
          $scope.emails.push(data.dados[i].email)
        }
      })

      $http.post('/pessoa_fone/pessoa', {cod: $scope.cliente.codigo}).
      success(function (data, status, headers, config) {
        for (i = 0; i < data.dados.length; i++) {
          $scope.fones.push(data.dados[i].fone)
        }
      })

      $http.post('/pessoa/codigo', {cod: $scope.cliente.codigo}).
      success(function (data, status, headers, config) {
        if (data.dados.length>0){

        }
      })

      $http.post('/cliente_imovel/pessoa', {cod: $scope.cliente.codigo}).
      success(function (data, status, headers, config) {
        if (data.codigo>0){
          $scope.codigo = data.codigo
          $scope.BuscarCodigo
        }
      }).error(function (data, status, headers, config) {
        //
      })
    }
    else {
      $scope.emails = []
      $scope.fones = []
    }        
  }

  $scope.BuscarCodigo = function() {
    $http.post('/cliente_imovel/codigo', {cod: $scope.codigo}).
    success(function (data, status, headers, config) {
      $scope.Limpar();
      if (data.dados.length>0){
        $scope.interesse = data.dados[0].interesse;
        $scope.renda = data.dados[0].renda;
        $scope.origem = data.dados[0].origem;
        if(data.dados[0].responsavel>0){$scope.responsavel = {codigo: data.dados[0].responsavel, nome: data.dados[0].responsavel_}};
        
        $http.post('/cliente_imovel_terreno/imovel', {cod: $scope.codigo}).
        success(function (data, status, headers, config) {
          if (data.dados.length>0){
            $scope.area_terreno = data.dados[0].area_terreno;
            $scope.frente = data.dados[0].frente;
            $scope.fundo = data.dados[0].fundo;
            $scope.lateral1 = data.dados[0].lateral1;
            $scope.lateral2 = data.dados[0].lateral2;
            $scope.gabarito = data.dados[0].gabarito;
            $scope.esquina = (data.dados[0].esquina==1);    
          }
        });

        $http.post('/cliente_imovel_construcao/imovel', {cod: $scope.codigo}).
        success(function (data, status, headers, config) {
          if (data.dados.length>0){
            $scope.ano_construcao = data.dados[0].ano_construcao;
            $scope.area_total = data.dados[0].area_total;
            $scope.area_privativa = data.dados[0].area_privativa;
            $scope.quartos = data.dados[0].quartos;
            $scope.suites = data.dados[0].suites;
            $scope.garagens = data.dados[0].garagens;
            $scope.mobiliada = (data.dados[0].mobiliada==1);
            $scope.churrasqueira = (data.dados[0].churrasqueira==1);
            $scope.infra_ar_cond = (data.dados[0].infra_ar_cond==1);
            $scope.piso = data.dados[0].piso;
            $scope.teto = data.dados[0].teto;
            $scope.reboco = (data.dados[0].reboco==1);
            $scope.murro = (data.dados[0].murro==1);
            $scope.portao = (data.dados[0].portao==1);
            $scope.quintal_larg = data.dados[0].quintal_larg;
            $scope.quintal_comp = data.dados[0].quintal_comp;
            $scope.andar = data.dados[0].andar;
          }
        });
    
        $http.post('/cliente_imovel_financeiro/imovel', {cod: $scope.codigo}).
        success(function (data, status, headers, config) {
          if (data.dados.length>0){
            $scope.valor = data.dados[0].valor;
            $scope.mcmv = (data.dados[0].mcmv==1);
            $scope.financia = (data.dados[0].financia==1);
            $scope.entrada = data.dados[0].entrada;
            $scope.permuta = (data.dados[0].permuta==1);
            $scope.carro = (data.dados[0].carro==1);
            $scope.fgts = (data.dados[0].fgts==1);
            $scope.condominio = data.dados[0].condominio;        
          }
        });
      }
    }).error(function (data, status, headers, config) {
      $scope.Limpar();
    });     
  }

  $scope.Localizar = function(ev) {
    console.dir($scope.mcmv)
    $mdDialog.show({
      controller: LocalizarController,
      templateUrl: './imovel/dlg/localizar',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
    .then(function(answer) {
      if (answer>0){
        $scope.codigo=answer;
        $scope.BuscarCodigo();
      }      
      //console.dir('You said the information was "' + answer + '".');
    }, function() {
      console.dir('You cancelled the dialog.');
    });
  };
  
  function LocalizarController($scope, $mdDialog) {
    $scope.campopesq = 'prop';

    $scope.Cancel = function() {
      $mdDialog.cancel();
    };

    $scope.LocalizarExe = function(camp, text) {
      $http.post('/imovel/localizar', {camp: camp, text: text}).
      success(function (data, status, headers, config) {
        $scope.l_dados = data.dados;
      }).error(function (data, status, headers, config) {
        //
      });      
    };

    $scope.ExibirImovel = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  
  $scope.PessoaNome = function(StrSearch) {
    $scope.pessoa_ = StrSearch
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

  $scope.CidadeEstadoNome = function(StrSearch) {
    return $http.get('/cidade/cidade_estado_nome', {
    params: {
      txt: StrSearch,
      est: $scope.estado.codigo
    }
    }).then(function(data) {
      return data.data;
    });
  };
  
  $scope.BairroCidadeNome = function(StrSearch) {
    return $http.get('/bairro/bairro_cidade_nome', {
    params: {
      txt: StrSearch,
      est: $scope.estado.codigo,
      cid: $scope.cidade.codigo
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