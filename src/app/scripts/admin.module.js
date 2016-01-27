(function () {
    'use strict';

    angular.module('admin', [
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',

        'mue.helpers',
        'mue.core.error-handler',

        /*pages*/
        'admin.rabbit',
        'admin.dashboard',
        'admin.login'
    ]);
})();