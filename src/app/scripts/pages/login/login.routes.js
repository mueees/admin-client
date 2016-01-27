(function () {
    'use strict';

    angular.module('admin.login').config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                isLoginRequired: false,
                templateUrl: 'scripts/pages/login/login.view.html',
                controller: 'LoginController'
            });
    });
})();