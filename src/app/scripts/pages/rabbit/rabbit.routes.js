(function () {
    'use strict';

    angular.module('admin.rabbit').config(function ($stateProvider) {
        $stateProvider
            .state('admin.rabbit', {
                url: '/rabbit',
                abstract: true,
                template: '<ui-view></ui-view>'
            })
            .state('admin.rabbit.dashboard', {
                url: '/dashboard',
                isLoginRequired: true,
                templateUrl: 'scripts/pages/rabbit/rabbit-dashboard.view.html'
            })
            .state('admin.rabbit.feeds', {
                url: '/feeds',
                isLoginRequired: true,
                templateUrl: 'scripts/pages/rabbit/rabbit-feeds.view.html',
                controller: 'RabbitFeedsController'
            })
            .state('admin.rabbit.feed', {
                url: '/feed/:id',
                isLoginRequired: true,
                templateUrl: 'scripts/pages/rabbit/rabbit-feed.view.html'
            })
            .state('admin.rabbit.topics', {
                url: '/topics',
                isLoginRequired: true,
                templateUrl: 'scripts/pages/rabbit/rabbit-topics.view.html',
                controller: 'RabbitTopicsController'
            });
    });
})();