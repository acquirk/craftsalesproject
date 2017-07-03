angular.module('LoginCtrl', []).controller('LoginController', function($scope, $rootScope, $location, authentication, $http) {

  $inject = ['$location', 'authentication'];

    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.onSubmit = function () {
      authentication
        .login($scope.credentials)
        .then(function(){
          $location.path('geek');
          console.log('logged in');
        });
    };


});