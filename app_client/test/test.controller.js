(function () {

  angular
  .module('meanApp')
  .controller('testCtrl', testCtrl);

  testCtrl.$inject = ['$location', 'authentication', 'meanData'];
  function testCtrl($location, authentication, meanData) {
    var vm = this;
    vm.test = "hello world";

    vm.spirits = ['Songbird Coffee', 'Flora', 'Lakehouse', 'Tiki Rum', 'Gin', 'Bramble', 'Vodka'];

    vm.projects = [['Cardinal Spirits Website','2016'],['Spirit Finder','2017'],['Quirk Adventures','2015'],['Foundation: Wordpress Theme', '2014'],['bespoke','2013']];

    vm.places = ['Bloomington', 'Space', 'Cincinnati'];

    vm.pic = 'bloomington';

    vm.click = function () {


    }
}

})();
