(function () {
    'use strict';
    angular.module('admin.rabbit').controller('RabbitFeedsController', function ($scope,
                                                                                 $q,
                                                                                 adminFeedResource,
                                                                                 adminTopicResource/*,
                                                                                  adminFeedStatisticResource*/) {
        $q.all({
            topics: adminTopicResource.getAll(),
            feeds: adminFeedResource.getAll()/*,
             feedStatistic: adminFeedStatisticResource.getAll()*/
        }).then(function (data) {
            _.assign($scope, data);
        });
    });
})();