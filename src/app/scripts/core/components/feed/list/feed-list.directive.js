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
                $scope.search = {};

                $scope.currentPage = 0;

                $scope.pageCount = 0;

                $scope.feedsOnPage = 25;

                $scope.prev = function () {
                    $scope.currentPage -= 1;

                    if ($scope.currentPage < 0) {
                        $scope.currentPage = 0;
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
                    var filteredBySearch = $scope.plainFeeds;

                    if ($scope.search.title) {
                        filteredBySearch = _.filter($scope.plainFeeds, function (feed) {
                            return _.contains(feed.title, $scope.search.title) || _.contains(feed.url, $scope.search.title);
                        });
                    }

                    filteredFeeds = _.filter(filteredBySearch, function (feed) {
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

                $scope.$watch('currentPage', function () {
                    updateFeedsRender();
                });

                $scope.$watch('feeds', function (newValue, oldValue) {
                    if (!$scope.plainFeeds.length && newValue && newValue != oldValue) {
                        $scope.plainFeeds = _.map($scope.feeds, function (feed) {
                            return feed.plain();
                        });

                        updateFilteredFeeds();
                    }
                });

                $scope.$watch('customSearch', function () {
                    updateFilteredFeeds();
                }, true);

                $scope.$watch('search', function () {
                    updateFilteredFeeds();
                }, true);

                $scope.$on('adminFeedQuickEdit:delete', function (event, data) {
                    _.remove($scope.feedsForRender, function (feed) {
                        return feed._id == data.feed._id;
                    });
                });
            }
        };
    });
})();