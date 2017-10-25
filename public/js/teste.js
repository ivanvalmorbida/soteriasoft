angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

.controller('AppCtrl', function($scope, $mdDialog) {
  $scope.project = {
    description: 'Nuclear Missile Defense System',
    rate: 500,
    special: true
  };

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './teste/dlg',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      console.dir('You said the information was "' + answer + '".');
    }, function() {
      console.dir('You cancelled the dialog.');
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
});


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/