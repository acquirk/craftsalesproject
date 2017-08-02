(function () {

  angular
  .module('meanApp')
  .controller('settingsCtrl', settingsCtrl);

  settingsCtrl.$inject = ['$location', 'authentication', 'meanData'];
  function settingsCtrl($location, authentication, meanData) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();
    
    vm.settingsChange = function () {
            vm.credentials = {
                id: vm.currentUser.id,
                email: vm.currentUser.email,
                firstName: vm.currentUser.firstName,
                lastName: vm.currentUser.lastName
            };
            authentication.settingsChange(vm.credentials)
                .success(function (data) {
                    console.log(data);
                    vm.currentUser = authentication.logout();
                }).then(function(){
                  $location.path('/login');
                })
                .error(function (e) {
                    console.log(e);
                });
        };
  }

})();