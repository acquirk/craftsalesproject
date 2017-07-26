(function () {

  angular
  .module('meanApp')
  .controller('usersCtrl', usersCtrl);

  usersCtrl.$inject = ['$location', 'authentication', 'meanData'];
  function usersCtrl($location, authentication, meanData) {
    var vm = this;
    
    vm.users = [];
    
    authentication.usersGrab()
      .success(function(data) {
        vm.users = data;
        console.log(data);
      })
      .error(function (e) {
        console.log(e);
      });
      
      vm.permissions = function (id, type) {
      authentication.permissions(id, type)
        .success(function(data) {
          console.log(data);
        })
      .error(function (e) {
        console.log(e);
      });
      };
    
  }

})();