(function () {

  angular
  .module('meanApp')
  .controller('testCtrl', testCtrl);

  testCtrl.$inject = ['$location', 'authentication', 'meanData'];
  function testCtrl($location, authentication, meanData) {
    var vm = this;
    vm.test = "hello world";
}
                                      
})();