(function () {
    'use strict';
    angular.module('admin.core.resources').factory('adminFeedResource', function ($q, MueResource) {
        var path = 'rabbit/feeds',
            Feed = MueResource.withConfig(function (RestangularConfigurer) {

            });

        return {
            getAll: function () {
                return Feed.all(path).getList();
            },

            edit: function (feedId, data) {
                return Feed.all('admin/' + path + '/' + feedId).post(data);
            },

            deleteFeed: function (feedId) {
                return Feed.all('admin/' + path + '/' + feedId).remove();
            }
        };
    });
})();