(function () {

  angular
  .module('meanApp')
  .controller('usersCtrl', usersCtrl);

  usersCtrl.$inject = ['$location', 'authentication'];
  function usersCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      firstName : "",
      lastName : "",
      email : "",
      password : ""
    };
    
    users = ["hello", "hey"];
    
    

  }

})();