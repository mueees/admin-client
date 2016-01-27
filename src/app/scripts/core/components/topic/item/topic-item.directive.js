(function () {
    'use strict';
    angular.module('admin.core.components.topic').directive('adminTopicItem', function (adminTopicResource) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/core/components/topic/item/topic-item.directive.html',
            scope: {
                topic: '=',
                topics: '='
            },
            link: function ($scope) {
                $scope.related_topics = [];

                $scope.$watch('topics', function () {
                    updateRelatedTopics();
                });

                $scope.$watch('topic.related_topics', function () {
                    updateRelatedTopics();
                });

                updateRelatedTopics();

                function updateRelatedTopics() {
                    $scope.related_topics = _.map($scope.topic.related_topics, function (relatedTopicId) {
                        return _.find($scope.topics, {
                            _id: relatedTopicId
                        });
                    });
                }
            }
        };
    });
})();