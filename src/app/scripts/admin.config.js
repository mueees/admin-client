(function () {
    'use strict';
    angular.module('admin').config(function (adminConfigProvider,
                                          MueResourceProvider,
                                          $urlRouterProvider,
                                          mueAuthProxyProvider,
                                          $httpProvider,
                                          mueAuthenticationProvider) {

        $urlRouterProvider.otherwise("admin/dashboard");

        mueAuthProxyProvider.setOauthKey(adminConfigProvider.get('oauthKey'));

        mueAuthProxyProvider.config({
            origin: adminConfigProvider.get('origin')
        });

        $httpProvider.interceptors.push('mueHttpResponseErrorInterceptor');

        MueResourceProvider.setBaseUrl(adminConfigProvider.get('origin') + '/api');

        mueAuthenticationProvider.loginState('login');
        mueAuthenticationProvider.appState('admin.rabbit.topics');
    });
})();