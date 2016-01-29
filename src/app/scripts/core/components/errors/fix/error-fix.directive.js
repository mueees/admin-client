(function () {
    'use strict';
    angular.module('admin.core.components.errors').directive('adminErrorFix', function ($rootScope, $compile) {
        return {
            restrict: 'E',
            scope: {
                error: '='
            },

            link: function ($scope, element) {
                var types = {
                    1: 'admin-error-fix-feed',
                    2: 'admin-error-fix-feed'
                };

                var template = '<' + types[$scope.error.errorCode] + ' error="error"></' + types[$scope.error.errorCode] + '>';

                var scope = $rootScope.$new();

                scope.error = $scope.error;

                element.append($compile(template)(scope));
            }
        };
    });
})();