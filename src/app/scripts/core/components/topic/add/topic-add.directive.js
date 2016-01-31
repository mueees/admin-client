(function () {
    'use strict';
    angular.module('admin.core.components.topic').directive('adminTopicAdd', function (adminTopicResource) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/core/components/topic/add/topic-add.directive.html',
            scope: {
                topics: '='
            },
            link: function ($scope) {
                $scope.topic = {};

                $scope.$watch('topics', function (newValue, oldValue) {
                    if (newValue && (newValue !== oldValue)) {
                        updateTopicsField();
                    }
                }, true);

                $scope.clear = function () {
                    $scope.topic = {
                        related_topics: []
                    };
                };

                function updateTopicsField() {
                    $scope.topicFields[2].templateOptions.options = _.map($scope.topics, function (topic) {
                        return {
                            _id: topic._id,
                            title: topic.title
                        };
                    });
                }

                $scope.onSubmit = function () {
                    adminTopicResource.create($scope.topic).then(function (topic) {
                        _.assign($scope.topic, topic);

                        $scope.topics.push($scope.topic);

                        $scope.clear();

                        $scope.showForm = false;
                    });
                };

                $scope.topicFields = [
                    {
                        key: 'title',
                        type: 'input',
                        templateOptions: {
                            label: 'Title',
                            placeholder: 'Topic title',
                            required: true
                        }
                    },
                    {
                        key: 'title_img',
                        type: 'input',
                        templateOptions: {
                            label: 'Title image',
                            placeholder: 'Topic title image'
                        }
                    },
                    {
                        key: 'main',
                        type: 'checkbox',
                        templateOptions: {
                            label: 'Show as main topic'
                        }
                    },
                    {
                        key: 'related_topics',
                        type: 'multiCheckbox',
                        templateOptions: {
                            label: 'Related topics',
                            options: [],
                            valueProp: '_id',
                            labelProp: 'title'
                        }
                    }
                ];
            }
        };
    });
})();