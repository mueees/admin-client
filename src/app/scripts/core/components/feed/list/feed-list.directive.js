(function () {
    'use strict';
    angular.module('admin.core.components.feed').directive('adminFeedList', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/core/components/feed/list/feed-list.directive.html',

            scope: {
                feeds: '=',
                topics: '='
            },

            link: function ($scope) {
                $scope.currentPage = 1;

                $scope.pageCount = 0;

                $scope.feedsOnPage = 25;

                $scope.prev = function () {
                    $scope.currentPage -= 1;

                    if (!$scope.currentPage) {
                        $scope.currentPage = 1;
                    }
                };

                $scope.next = function () {
                    $scope.currentPage += 1;
                };

                $scope.customSearch = {};

                $scope.plainFeeds = [];

                var filteredFeeds = [];

                $scope.feedsForRender = [];

                function updateFilteredFeeds() {
                    filteredFeeds = _.filter($scope.plainFeeds, function (feed) {
                        var showFeed = true;

                        if ($scope.customSearch.withoutTitle && feed.title) {
                            showFeed = false;
                        }

                        if ($scope.customSearch.withoutTopics && feed.topics.length) {
                            showFeed = false;
                        }

                        return showFeed ? feed : null;
                    });

                    updateFeedsRender();
                }

                function updateFeedsRender() {
                    var start = $scope.currentPage * $scope.feedsOnPage,
                        end = start + $scope.feedsOnPage;

                    $scope.feedsForRender = filteredFeeds.slice(start, end);

                    $scope.pageCount = filteredFeeds.length / $scope.feedsOnPage;
                }

                /*$scope.prepareTopics = function () {
                 return [{
                 title: 'test'
                 }]
                 };*/

                $scope.$watch('currentPage', function () {
                    updateFeedsRender();
                });

                $scope.$watch('feeds', function () {
                    $scope.plainFeeds = _.map($scope.feeds, function (feed) {
                        return feed.plain();
                    });

                    updateFilteredFeeds();
                });

                $scope.$watch('customSearch', function () {
                    updateFilteredFeeds();
                }, true);
            }
        };
    });
})();