(function () {
    'use strict';
    angular.module('admin.core.components.topic').directive('adminTopicEdit', function (adminTopicResource, dialogs) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/core/components/topic/edit/topic-edit.directive.html',
            scope: {
                topic: '=',
                topics: '='
            },
            link: function ($scope) {
                $scope.topicClone = _.cloneDeep($scope.topic);

                $scope.delete = function (topicId) {
                    dialogs.confirm().result.then(function (btn) {
                        adminTopicResource.deleteTopic(topicId).then(function () {
                            _.remove($scope.topics, function (topic) {
                                return topic._id == $scope.topic._id;
                            });
                        });
                    });
                };

                $scope.onSubmit = function () {
                    adminTopicResource.edit($scope.topic._id, $scope.topicClone).then(function (topic) {
                        $scope.AdminTopicEditForm.$dirty = false;

                        _.assign($scope.topic, $scope.topicClone);
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
                        key: 'related_topics',
                        type: 'multiCheckbox',
                        templateOptions: {
                            label: 'Related topics',
                            options: _.map($scope.topics, function (topic) {
                                return {
                                    _id: topic._id,
                                    title: topic.title
                                };
                            }),
                            valueProp: '_id',
                            labelProp: 'title'
                        }
                    }
                ];
            }
        };
    });
})();