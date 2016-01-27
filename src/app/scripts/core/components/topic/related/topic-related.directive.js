(function () {
    'use strict';
    angular.module('admin.core.components.topic').directive('adminTopicRelated', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/core/components/topic/related/topic-related.directive.html',
            scope: {
                topics: '='
            }
        };
    });
})();