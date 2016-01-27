(function () {
    'use strict';
    angular.module('admin.core.resources').factory('adminTopicResource', function ($q, MueResource) {
        var path = 'rabbit/topics',
            Topic = MueResource.withConfig(function (RestangularConfigurer) {

            });

        return {
            create: function (data) {
                var topic = Topic.one('admin/' + path);

                _.assign(topic, data);

                return topic.put();
            },

            getAll: function () {
                return Topic.all(path).getList();
            },

            edit: function (topicId, data) {
                return Topic.all('admin/' + path + '/' + topicId).post(data);
            },

            deleteTopic: function (topicId) {
                return Topic.all('admin/' + path + '/' + topicId).remove();
            }
        };
    });
})();