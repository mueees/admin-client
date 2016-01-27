(function () {
    'use strict';

    angular.module('admin.viewport').config(function ($stateProvider) {
        $stateProvider.state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'scripts/pages/viewport/viewport.view.html',
            controller: 'ViewportController',
            resolve: {
                user: function (mueAuthentication) {
                    return mueAuthentication.initSession();
                }
            }
        });
    });
})();