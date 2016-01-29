(function () {
    'use strict';
    angular.module('admin.core.resources').factory('adminErrorResource', function ($q, MueResource) {
        var path = 'rabbit/errors',
            Error = MueResource.withConfig(function (RestangularConfigurer) {

            });

        return {
            /*create: function (data) {
             var topic = Topic.one('admin/' + path);

             _.assign(topic, data);

             return topic.put();
             },*/

            getAll: function () {
                return Error.all('admin/' + path).getList();
            },

            /*edit: function (topicId, data) {
             return Topic.all('admin/' + path + '/' + topicId).post(data);
             },*/

            deleteError: function (errorId) {
                return Error.all('admin/' + path + '/' + errorId).remove();
            }
        };
    });
})();