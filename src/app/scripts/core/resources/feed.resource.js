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

            get: function (feedId) {
                return Feed.one(path + '/' + feedId).get();
            },

            getInfo: function (feedId) {
                return Feed.one('admin/' + path + '/' + feedId + '/info').get();
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