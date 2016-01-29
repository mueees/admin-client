(function () {
    'use strict';
    angular.module('admin.core.components.errors').directive('adminErrorList', function (adminErrorResource) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/core/components/errors/list/error-list.directive.html',

            scope: {
                errors: '='
            },

            link: function ($scope) {
                var uniqueErrors = [];

                $scope.currentPage = 0;

                $scope.pageCount = 0;

                $scope.errorsOnPage = 25;

                $scope.prev = function () {
                    $scope.currentPage -= 1;

                    if ($scope.currentPage < 0) {
                        $scope.currentPage = 0;
                    }
                };

                $scope.next = function () {
                    $scope.currentPage += 1;
                };

                $scope.deleteError = function (errorId) {
                    adminErrorResource.deleteError(errorId).then(function () {
                        _.remove($scope.errorsForRender, {
                            _id: errorId
                        });
                    });
                };

                $scope.errorsForRender = [];

                $scope.$watch('errors', function (newValue, oldValue) {
                    if (newValue && newValue != oldValue) {
                        $scope.errors = $scope.errors.reverse();

                        var plainErrors = _.map($scope.errors, function (error) {
                            return error.plain();
                        });

                        uniqueErrors = _prepareUniqueErrors(plainErrors);

                        updateErrorsRender();
                    }
                });

                $scope.$watch('currentPage', function () {
                    updateErrorsRender();
                });

                function updateErrorsRender() {
                    var start = $scope.currentPage * $scope.errorsOnPage,
                        end = start + $scope.errorsOnPage;

                    $scope.errorsForRender = uniqueErrors.slice(start, end);

                    $scope.pageCount = uniqueErrors.length / $scope.errorsOnPage;
                }

                function _prepareUniqueErrors(errors) {
                    var uniqueList = [];

                    _.each(errors, function (error) {
                        if (!_.find(uniqueList, function (uniqueError) {
                                return uniqueError.errorCode == error.errorCode && JSON.stringify(uniqueError.data) == JSON.stringify(error.data);
                            })) {

                            uniqueList.push(error);
                        }
                    });

                    return uniqueList;
                }
            }
        };
    });
})();