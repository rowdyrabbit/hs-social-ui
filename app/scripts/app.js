'use strict';

/**
 * @ngdoc overview
 * @name hsSocialUiApp
 * @description
 * # hsSocialUiApp
 *
 * Main module of the application.
 */
var app = angular
  .module('hsSocialUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/twitter/list', {
        templateUrl: 'views/twitter-list.html',
        controller: 'TwitterListCtrl',
        resolve: {
            accessCode : function($q, $route, HSOAuthService) {

                return HSOAuthService.getAccessCode($route.current.params.token);
            }
        },
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .factory("authHttpResponseInterceptor", ['$q', '$location', function($q, $location) {
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                $location.path('/').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        }
    }

  }])
  .config(['$httpProvider',function($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
  }]);

