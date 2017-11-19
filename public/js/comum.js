angular.module('Soteriasoft.Comum', [])
.config(function($mdDateLocaleProvider) {
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
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]).directive('uiCep', function(){
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

function format(mask, number) {
    var s = ''+number, r = '';
    for (var im=0, is = 0; im<mask.length && is<s.length; im++) {
      r += mask.charAt(im)=='#' ? s.charAt(is++) : mask.charAt(im);
    }
    return r;
} 