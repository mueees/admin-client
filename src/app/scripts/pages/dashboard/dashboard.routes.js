(function () {
    'use strict';

    angular.module('admin.dashboard').config(function ($stateProvider) {
        $stateProvider
            .state('admin.dashboard', {
                url: '/dashboard',
                isLoginRequired: true,
                templateUrl: 'scripts/pages/dashboard/dashboard.view.html',
                controller: 'DashboardController'
            });
    });
})();