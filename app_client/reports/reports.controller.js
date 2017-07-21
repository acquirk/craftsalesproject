(function () {

  angular
  .module('meanApp')
  .controller('reportsCtrl', reportsCtrl);

  reportsCtrl.$inject = ['$location', 'authentication', 'meanData'];
  function reportsCtrl($location, authentication, meanData) {
    var vm = this;
    
    
    
    vm.uploadfile = function () {
      
    var file = vm.myFile;
    console.log("upload attempt");
    
    meanData.insertData(file)
      .success(function(data) {
        console.log(data);
      })
      .error(function (e) {
        console.log(e);
      });
    }
    
  }

})();