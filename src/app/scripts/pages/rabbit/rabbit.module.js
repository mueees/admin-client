(function () {
    'use strict';

    angular.module('admin.rabbit', [
        'ui.router',

        'admin.viewport',
        'admin.core.resources',
        'admin.core.components.topic',
        'admin.core.components.errors',
        'admin.core.components.feed'
    ]);
})();