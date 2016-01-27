(function () {
    'use strict';
    angular.module('admin.rabbit').controller('RabbitTopicsController', function ($scope, adminTopicResource) {
        $scope.topics = [];

        adminTopicResource.getAll().then(function (topics) {
            $scope.topics = topics;
        });
    });
})();