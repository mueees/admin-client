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
                var plainErrors = [];

                var filteredErrors = [];

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

                        plainErrors = _.map($scope.errors, function (error) {
                            return error.plain();
                        });

                        plainErrors = _prepareUniqueErrors(plainErrors);

                        updateFilteredErrors();
                    }
                });

                $scope.$watch('currentPage', function () {
                    updateErrorsRender();
                });

                $scope.$watch('filter', function (newValue, oldValue) {
                    updateFilteredErrors();
                }, true);

                $scope.filterFields = [
                    {
                        key: 'errorCodes',
                        type: 'multiCheckbox',
                        templateOptions: {
                            label: 'Topics',
                            options: [
                                {
                                    _id: 1,
                                    title: 'Feed error. Cannot load page due to unexpected error'
                                },
                                {
                                    _id: 2,
                                    title: 'Feed error. Cannot load page due to error status code'
                                },
                                {
                                    _id: 3,
                                    title: 'Feed error. Rss xml exist but system cannot parse it'
                                }
                            ],
                            valueProp: '_id',
                            labelProp: 'title'
                        }
                    }
                ];

                $scope.filter = {};

                function updateErrorsRender() {
                    var start = $scope.currentPage * $scope.errorsOnPage,
                        end = start + $scope.errorsOnPage;

                    $scope.errorsForRender = filteredErrors.slice(start, end);

                    $scope.pageCount = filteredErrors.length / $scope.errorsOnPage;
                }

                function updateFilteredErrors() {
                    filteredErrors = _.filter(plainErrors, function (error) {
                        if ($scope.filter.errorCodes && $scope.filter.errorCodes.length) {
                            if ($scope.filter.errorCodes.indexOf(error.errorCode) != -1) {
                                return error;
                            }
                        } else {
                            return error;
                        }
                    });

                    updateErrorsRender();
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