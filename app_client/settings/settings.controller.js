(function () {

  angular
  .module('meanApp')
  .controller('settingsCtrl', settingsCtrl);

  settingsCtrl.$inject = ['$location', 'authentication', 'meanData'];
  function settingsCtrl($location, authentication, meanData) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();
  }

})();