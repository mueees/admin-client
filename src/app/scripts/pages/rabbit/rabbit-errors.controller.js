(function () {
    'use strict';
    angular.module('admin.rabbit').controller('RabbitErrorsController', function ($scope,
                                                                                  $q,
                                                                                  adminErrorResource) {
        $q.all({
            errors: adminErrorResource.getAll()
        }).then(function (data) {
            _.assign($scope, data);
        });
    });
})();