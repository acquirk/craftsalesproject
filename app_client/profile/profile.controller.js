(function() {
  
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData'];
  function profileCtrl($location, meanData) {
    var vm = this;

    vm.users = [];

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
      
    meanData.usersGrab()
      .success(function(data) {
        vm.users = data;
      })
      .error(function (e) {
        console.log(e);
      });
      
  }

})();