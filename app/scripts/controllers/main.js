'use strict';

/**
 * @ngdoc function
 * @name hsSocialUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hsSocialUiApp
 */
angular.module('hsSocialUiApp')
  .controller('MainCtrl', function ($scope, $http, $route, $location, LoginFactory, $window) {

    var app = this;

    $scope.loginFactory = LoginFactory;

    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.hsLogin = function() {
        $http.get("http://localhost:9000/hackerschool/authorization-url")
            .success(function(data) {
                console.log("SUCCESS: "+data.authUrl);

                $window.location = data.authUrl;

            }).error(function(data, status, headers, config) {
                console.log("ERROR: "+data);
                console.log("ERROR STATUS: "+status);
                console.log("ERROR STATUS: "+status);
                console.log("ERROR HEADERS: "+headers);
            })
    }

    $scope.login = function(credentials) {


        LoginFactory.loginAndRetrieveAllTwitterAccounts(credentials.username, credentials.password)
            .then(function(data) {
//                $scope.twitterAccounts = data;
//                console.log($scope.twitterAccounts);
                $location.path("/twitter/list");
            }, function(data) {
                alert(data);
            });


//        var postData = {"username" : credentials.username, "password" : credentials.password};
//        $http.post("http://localhost:9000/login", postData)
//            .success(function(data) {
//                app.twitterAccounts = data;
//                $scope.twitterAccounts = data;
//            });

    };

});
