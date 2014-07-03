'use strict';

angular.module('hsSocialUiApp').factory('LoginFactory', function($http, $q) {

    var service = {};
    var twitterAccounts = {};

    service.loginAndRetrieveAllTwitterAccounts = function(username, password) {

        var deferred = $q.defer();

        var postData = {"username" : username, "password" : password};
        $http.post("http://localhost:9000/login", postData)
            .success(function(data) {
                deferred.resolve(data);
                twitterAccounts = data;
            }).error(function() {
                deferred.reject("There was an error");
            });
        return deferred.promise;
    }

    service.loginToTwitter = function() {

        $http.get("http://localhost:9000/authenticate/twitter")
            .success(function(data) {
               console.log("SUCCESS: "+data);
            }).error(function(data, status, headers, config) {
               console.log("ERROR: "+data);
               console.log("ERROR STATUS: "+status);
               console.log("ERROR STATUS: "+status);
               console.log("ERROR HEADERS: "+headers);
            })
    }

    service.getTwitterAccounts = function() {
        return twitterAccounts;
    }

    return service;

});