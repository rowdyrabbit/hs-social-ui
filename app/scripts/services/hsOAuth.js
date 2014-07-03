'use strict';

angular.module('hsSocialUiApp').factory('HSOAuthService', function($http, $q, $routeParams, $route) {

    var service = {};
    var accessToken = "";

    service.getAccessCode = function(token) {
        console.log("yo, in getAccessCode");
        var deferred = $q.defer();
        var params = {clientCode : token};

        $http.get("http://localhost:9000/hackerschool/access-token?clientCode="+token)
            .success(function(data) {
                deferred.resolve(data);
                accessToken = data.access_token.access_token;

                //store in local storage
            }).error(function() {
                deferred.reject("There was an error");
            });
        return deferred.promise;
    };

    service.getHackerSchoolTwitterAccounts = function() {

        console.log("yo, in getHackerSchoolTwitterAccounts and the value of the access token is: " + accessToken);
        var thisObject = this;
        var deferred = $q.defer();
        $http.get("http://localhost:9000/hackerschool/batches/list?accessCode="+ accessToken)
            .success(function(data) {
                deferred.resolve(data);
                console.log("Batch data is: " + data);
            }).error(function() {
                console.log("There was an error");
            })
        return deferred.promise;
    };

//    service.loginToTwitter = function() {
//
//        $http.get("http://localhost:9000/authenticate/twitter")
//            .success(function(data) {
//                console.log("SUCCESS: "+data);
//            }).error(function(data, status, headers, config) {
//                console.log("ERROR: "+data);
//                console.log("ERROR STATUS: "+status);
//                console.log("ERROR STATUS: "+status);
//                console.log("ERROR HEADERS: "+headers);
//            })
//    }

    service.getAccessToken = function() {
        return accessToken;
    }

    return service;

});