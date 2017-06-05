(function () {
  'use strict';
  angular
    .module('myApp', ['ngMaterial','leaflet-directive'])
    .controller('DemoCtrl', DemoCtrl)
    .config(function ($logProvider) {
      $logProvider.debugEnabled(false);
    });
    
  function DemoCtrl($http) {
    var vm = this;
    vm.selectedItemChange = selectedItemChange;
    vm.searchTextChange   = searchTextChange;
    vm.throttle = 300;
    vm.center = {
        lat : 0,
        lng : 0,
        zoom: 2
      };

    function selectedItemChange(item) {
      vm.result = JSON.stringify(item, null, 2);
      vm.center = {
        lat : item.lat,
        lng : item.lng,
        zoom: 15
      };
    }

    function searchTextChange(query) {
      vm.items = $http
        .get('//maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: query
          }
        })
        .then(function (response) {
          return response
            .data
            .results
            .map(function (item) {
              console.log(item);
              return {
                display: item.formatted_address,
                lat: item.geometry.location.lat,
                lng: item.geometry.location.lng,
                value: item.formatted_address
              };
            }) || [];
        }, function () {
          return [
            {
              display: 'error',
              lat: 0,
              lng: 0,
              value: ''
            }
          ];
        });
    }
  }
})();