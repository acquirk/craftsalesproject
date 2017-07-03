angular.module('RegisterCtrl', []).controller('RegisterController', function($scope, $rootScope, $location, authentication, $http) {
    
    $inject = ['$location', 'authentication'];

    $scope.credentials = {
      name : "",
      email : "",
      password : ""
    };

    $scope.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register($scope.credentials)
        .then(function(){
          $location.path('geek');
        });
    };


});