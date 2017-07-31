(function () {

    angular
        .module('meanApp')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$location', 'meanData'];

    function dashboardCtrl($location, meanData) {
        var vm = this;
        
        vm.customers = [];
        vm.names = [];
    
    meanData.accountsGrab()
      .success(function(data) {
        vm.customers = data;
        for (var i = 0; i < vm.customers.length; i++) {
        vm.names[i] = vm.customers[i].name;
}
        console.log(data);
      })
      .error(function (e) {
        console.log(e);
      });
    

    }

})();
