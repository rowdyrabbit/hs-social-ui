'use strict';

/**
 * @ngdoc function
 * @name hsSocialUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hsSocialUiApp
 */
angular.module('hsSocialUiApp')
  .controller('TwitterListCtrl', function ($scope, LoginFactory, HSOAuthService, accessCode, $location) {

        $location.url($location.path());

        $scope.twitterAccounts = LoginFactory.getTwitterAccounts();

        HSOAuthService.getHackerSchoolTwitterAccounts().then(function(result) {
            console.log("Result: " + result);
            $scope.batches = result;

        }, function(error) {
            console.log("Some error occurred");
        });


        $scope.loginToTwitter = function() {
            LoginFactory.loginToTwitter();
        }

  });
