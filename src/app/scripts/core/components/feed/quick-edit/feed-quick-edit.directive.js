(function () {
    'use strict';
    angular.module('admin.core.components.feed').directive('adminFeedQuickEdit', function ($rootScope,
                                                                                           dialogs,
                                                                                           adminFeedResource) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/core/components/feed/quick-edit/feed-quick-edit.directive.html',

            scope: {
                feed: '=',
                topics: '=',
                fields: '='
            },

            link: function ($scope) {
                var defaultFieldsForEdit = [
                    {
                        key: 'title',
                        type: 'input',
                        templateOptions: {
                            label: 'Title',
                            placeholder: 'Title',
                            required: false
                        }
                    },
                    {
                        key: 'description',
                        type: 'input',
                        templateOptions: {
                            label: 'Description',
                            placeholder: 'Description',
                            required: false
                        }
                    },
                    {
                        key: 'title_img',
                        type: 'input',
                        templateOptions: {
                            label: 'Title img',
                            placeholder: 'Title img',
                            required: false
                        }
                    },
                    {
                        key: 'topics',
                        type: 'multiCheckbox',
                        templateOptions: {
                            label: 'Topics',
                            options: _.map($scope.topics, function (topic) {
                                return {
                                    _id: topic._id,
                                    title: topic.title
                                };
                            }),
                            valueProp: '_id',
                            labelProp: 'title'
                        }
                    },
                    {
                        key: 'author',
                        type: 'input',
                        templateOptions: {
                            label: 'Author',
                            placeholder: 'Author',
                            required: false
                        }
                    },
                    {
                        key: 'url',
                        type: 'input',
                        templateOptions: {
                            label: 'Url',
                            placeholder: 'Url',
                            required: true
                        }
                    },
                    {
                        key: 'language',
                        type: 'input',
                        templateOptions: {
                            label: 'Language',
                            placeholder: 'Language',
                            required: false
                        }
                    },
                    {
                        key: 'domain',
                        type: 'input',
                        templateOptions: {
                            label: 'Domain',
                            placeholder: 'Domain',
                            required: false
                        }
                    }
                ];

                $scope.feedClone = _.cloneDeep($scope.feed);

                $scope.delete = function (feedId) {
                    dialogs.confirm().result.then(function (btn) {
                        adminFeedResource.deleteFeed(feedId).then(function () {
                            $rootScope.$broadcast('adminFeedQuickEdit:delete', {
                                feed: $scope.feedClone
                            });
                        });
                    });
                };

                $scope.onSubmit = function () {
                    adminFeedResource.edit($scope.feed._id, $scope.feedClone).then(function (feed) {
                        $scope.AdminFeedQuickEditForm.$dirty = false;

                        _.assign($scope.feed, $scope.feedClone);
                    });
                };

                if (!$scope.fields) {
                    $scope.feedFields = defaultFieldsForEdit;
                } else {
                    $scope.feedFields = _.filter($scope.fields, function (fieldName) {
                        return _.find(defaultFieldsForEdit, {
                            key: fieldName
                        });
                    });
                }
            }
        };
    });
})();