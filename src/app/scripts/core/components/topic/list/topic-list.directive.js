(function () {
    'use strict';
    angular.module('admin.core.components.topic').directive('adminTopicList', function (adminTopicResource) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/core/components/topic/list/topic-list.directive.html',
            scope: {
                topics: '='
            }
        };
    });
})();