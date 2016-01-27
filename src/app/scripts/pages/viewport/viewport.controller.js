(function () {
    'use strict';
    angular.module('admin.viewport').controller('ViewportController', function ($scope,
                                                                                mueAuthProxy) {
        $scope.logout = function () {
            mueAuthProxy.logout();
        };
    });
})();