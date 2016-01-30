(function () {
    'use strict';
    angular.module('admin.core.components.errors').directive('adminErrorFixFeed', function ($q,
                                                                                            adminFeedResource,
                                                                                            adminErrorResource,
                                                                                            adminTopicResource) {
        return {
            restrict: 'E',
            scope: {
                error: '='
            },
            templateUrl: 'scripts/core/components/errors/fix/error-fix-feed.directive.html',

            link: function ($scope) {
                $scope.feed = null;

                $scope.fields = ['url'];

                // change errorCode to 3 - XML Exist but System cannot parse XML
                $scope.cannotParseXml = function () {
                    adminErrorResource.edit($scope.error._id, {
                        errorCode: 3
                    }).then(function () {
                        $scope.error.errorCode = 3;
                    });
                };

                $q.all({
                    feed: adminFeedResource.get($scope.error.data.feedId),
                    topics: adminTopicResource.getAll()
                }).then(function (data) {
                    _.assign($scope, data);
                });

                adminFeedResource.getInfo($scope.error.data.feedId).then(function (feedInfo) {
                    $scope.feedInfo = feedInfo.plain();
                }, function () {
                    $scope.feedInfo = 'Cannot get info';
                });
            }
        };
    });
})();